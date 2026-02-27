import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as profilesApi from '../api/profiles';
import { supabase } from '../api/supabase';
import type { ProWithProfile } from '../types/user';

const proKeys = {
  all: ['proProfiles'] as const,
  details: () => [...proKeys.all, 'detail'] as const,
  detail: (userId: string) => [...proKeys.details(), userId] as const,
  search: (filters: Record<string, unknown>) => [...proKeys.all, 'search', filters] as const,
};

export function useProProfile(userId: string | undefined) {
  return useQuery({
    queryKey: proKeys.detail(userId ?? ''),
    queryFn: () => profilesApi.getProProfile(userId!),
    enabled: Boolean(userId),
  });
}

export function useUpdateProProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: Parameters<typeof profilesApi.updateProProfile>[1];
    }) => profilesApi.updateProProfile(userId, data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(
        proKeys.detail(updatedProfile.user_id),
        updatedProfile
      );
    },
  });
}

export interface ProSearchFilters {
  categoryId?: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
  minRating?: number;
  maxRate?: number;
  sortBy?: 'rating' | 'distance' | 'price' | 'reviews';
}

export function useProSearch(filters: ProSearchFilters) {
  return useQuery({
    queryKey: proKeys.search(filters as Record<string, unknown>),
    queryFn: async (): Promise<ProWithProfile[]> => {
      let query = supabase
        .from('pro_profiles')
        .select(
          `
          *,
          profile:profiles!pro_profiles_user_id_fkey(*),
          categories:pro_categories(
            category_id,
            years_experience,
            custom_rate_min,
            custom_rate_max,
            category:categories(*)
          )
        `
        )
        .eq('is_available', true);

      if (filters.categoryId) {
        query = query.contains('categories', [
          { category_id: filters.categoryId },
        ]);
      }

      if (filters.minRating) {
        query = query.gte('avg_rating', filters.minRating);
      }

      if (filters.maxRate) {
        query = query.lte('hourly_rate_min', filters.maxRate);
      }

      const { data, error } = await query.order('avg_rating', {
        ascending: false,
      });

      if (error) throw error;

      let results = (data ?? []) as ProWithProfile[];

      // Client-side distance filtering if location provided
      if (filters.lat != null && filters.lng != null) {
        const { calculateDistance } = await import('../utils/geo');
        const radius = filters.radiusKm ?? 25;

        results = results
          .filter((pro) => {
            if (pro.latitude == null || pro.longitude == null) return false;
            const dist = calculateDistance(
              filters.lat!,
              filters.lng!,
              pro.latitude,
              pro.longitude
            );
            return dist <= radius;
          })
          .map((pro) => ({
            ...pro,
            distance_km: calculateDistance(
              filters.lat!,
              filters.lng!,
              pro.latitude!,
              pro.longitude!
            ),
          }));
      }

      // Sort results
      switch (filters.sortBy) {
        case 'distance':
          results.sort((a, b) => (a.distance_km ?? 999) - (b.distance_km ?? 999));
          break;
        case 'price':
          results.sort(
            (a, b) => (a.hourly_rate_min ?? 999) - (b.hourly_rate_min ?? 999)
          );
          break;
        case 'reviews':
          results.sort((a, b) => b.total_reviews - a.total_reviews);
          break;
        case 'rating':
        default:
          results.sort((a, b) => b.avg_rating - a.avg_rating);
          break;
      }

      return results;
    },
    enabled: true,
  });
}
