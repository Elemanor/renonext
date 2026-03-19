'use client';

import { useRef, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';
import { Send, Paperclip, Loader2 } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFileUpload?: () => void;
  isLoading?: boolean;
  showUpload?: boolean;
  variant?: 'light' | 'dark';
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onFileUpload,
  isLoading,
  showUpload,
  variant = 'light',
  placeholder = 'Ask about your renovation...',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDark = variant === 'dark';

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !isLoading) onSubmit();
      }
    },
    [value, isLoading, onSubmit]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
      // Auto-resize
      const ta = e.target;
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    },
    [onChange]
  );

  return (
    <div
      className={`flex items-end gap-2 rounded-xl border p-2 ${
        isDark
          ? 'border-white/10 bg-white/[0.04]'
          : 'border-gray-200 bg-white'
      }`}
    >
      {showUpload && onFileUpload && (
        <button
          onClick={onFileUpload}
          className={`shrink-0 rounded-lg p-2 transition-colors ${
            isDark
              ? 'text-gray-500 hover:bg-white/10 hover:text-gray-300'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
          title="Upload PDF"
        >
          <Paperclip className="h-4 w-4" />
        </button>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isLoading}
        className={`flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-gray-500 disabled:opacity-50 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
        style={{ maxHeight: '120px' }}
      />

      <button
        onClick={onSubmit}
        disabled={!value.trim() || isLoading}
        className="shrink-0 rounded-lg bg-emerald-600 p-2 text-white transition-colors hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
