'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';
import { SourceCard } from './source-card';

interface Source {
  type: string;
  name: string;
  section?: string | null;
  page?: number | null;
  metadata?: Record<string, unknown>;
}

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  variant?: 'light' | 'dark';
}

export function ChatMessage({ role, content, sources, variant = 'light' }: ChatMessageProps) {
  const isUser = role === 'user';
  const isDark = variant === 'dark';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-reno-green-500/20 text-reno-green-500'
            : isDark
              ? 'bg-white/10 text-white'
              : 'bg-reno-green/10 text-reno-green'
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Content */}
      <div className={`max-w-[85%] space-y-2 ${isUser ? 'items-end' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-reno-green-600 text-white rounded-tr-md'
              : isDark
                ? 'bg-white/[0.06] text-slate-200 rounded-tl-md'
                : 'bg-slate-100 text-slate-800 rounded-tl-md'
          }`}
        >
          {isUser ? (
            <p>{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:mb-2 prose-headings:mt-3 dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Source citations */}
        {!isUser && sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {sources.map((source, i) => (
              <SourceCard key={i} source={source} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
