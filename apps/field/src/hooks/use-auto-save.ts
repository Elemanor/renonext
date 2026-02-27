import { useEffect, useRef, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface AutoSaveOptions {
  /** Supabase table to upsert into */
  table: string;
  /** Column used as the primary key for upserts */
  primaryKey?: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** React Query key to invalidate on success */
  queryKey?: string[];
}

/**
 * Generic auto-save hook using Supabase upsert.
 * Ported from JSA useAutoSave — replaces REST API calls with direct Supabase queries.
 */
export function useAutoSave<T extends Record<string, unknown>>(
  recordId: string | null,
  options: AutoSaveOptions
) {
  const {
    table,
    primaryKey = 'id',
    debounceMs = 1000,
    queryKey,
  } = options;

  const queryClient = useQueryClient();
  const lastSavedData = useRef<string>('');
  const [currentId, setCurrentId] = useState<string | null>(recordId);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external id changes
  useEffect(() => {
    setCurrentId(recordId);
  }, [recordId]);

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<T>) => {
      if (currentId) {
        // Update existing record
        const { error } = await supabase
          .from(table)
          .update(data)
          .eq(primaryKey, currentId);
        if (error) throw error;
        return currentId;
      } else {
        // Insert new record
        const { data: inserted, error } = await supabase
          .from(table)
          .insert(data)
          .select(primaryKey)
          .single();
        if (error) throw error;
        const newId = (inserted as unknown as Record<string, string>)[primaryKey];
        setCurrentId(newId);
        return newId;
      }
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });

  const autoSave = useCallback(
    (data: Partial<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        const dataString = JSON.stringify(data);
        if (dataString !== lastSavedData.current) {
          lastSavedData.current = dataString;
          saveMutation.mutate(data);
        }
      }, debounceMs);
    },
    [debounceMs, saveMutation]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    autoSave,
    isSaving: saveMutation.isPending,
    lastSaved: saveMutation.isSuccess ? new Date() : null,
    recordId: currentId,
    error: saveMutation.error,
  };
}
