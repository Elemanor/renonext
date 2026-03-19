'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Bot, Sparkles, DollarSign, FileText, HardHat, ScrollText } from 'lucide-react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { DocumentUpload } from './document-upload';
import { useAuth } from '@/lib/auth/auth-context';
import { useChatStore } from '@/lib/stores/chat-store';

interface ChatPanelProps {
  variant?: 'light' | 'dark';
  fullPage?: boolean;
}

interface UploadedDoc {
  id: string;
  filename: string;
  status: 'processing' | 'ready' | 'failed';
  error_message?: string;
  chunk_count?: number;
}

interface Source {
  type: string;
  name: string;
  section?: string | null;
  page?: number | null;
  metadata?: Record<string, unknown>;
}

/** Extract plain text from UIMessage parts */
function getMessageText(msg: UIMessage): string {
  if (!msg.parts) return '';
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

const QUICK_ACTIONS = [
  { icon: DollarSign, label: 'Cost estimate', prompt: 'How much does a basement underpinning project typically cost in Toronto?' },
  { icon: HardHat, label: 'Permits', prompt: 'What permits do I need for a basement renovation in Ontario?' },
  { icon: FileText, label: 'Contracts', prompt: 'What should be included in a renovation contract?' },
  { icon: ScrollText, label: 'Rebates', prompt: 'What government rebates are available for home renovations in Ontario?' },
];

export function ChatPanel({ variant = 'light', fullPage = false }: ChatPanelProps) {
  const { user } = useAuth();
  const { conversationId, setConversationId, getAnonymousId } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sourcesMap] = useState<Record<string, Source[]>>({});
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [input, setInput] = useState('');
  const isDark = variant === 'dark';

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: () => ({
        conversationId,
        anonymousId: user ? undefined : getAnonymousId(),
      }),
    }),
    onFinish() {
      // Sources are handled server-side (saved to DB with the assistant message)
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Fetch user documents
  useEffect(() => {
    if (!user) return;
    fetch('/api/documents')
      .then((r) => r.ok ? r.json() : [])
      .then((docs) => setDocuments(docs))
      .catch(() => {});
  }, [user]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    await sendMessage({ text });
  }, [input, isLoading, sendMessage]);

  const handleUploadFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/documents/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const doc = await res.json();
      setDocuments((prev) => [doc, ...prev]);
    }
  }, []);

  const handleDeleteDoc = useCallback(async (id: string) => {
    await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleQuickAction = useCallback(
    async (prompt: string) => {
      await sendMessage({ text: prompt });
    },
    [sendMessage]
  );

  const isEmpty = messages.length === 0;

  return (
    <div className={`flex h-full flex-col ${fullPage ? '' : 'max-h-[500px]'}`}>
      {/* Messages area */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto ${fullPage ? 'px-4 py-6 lg:px-8' : 'px-4 py-4'}`}
      >
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 py-8">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
              isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
            }`}>
              <Bot className={`h-7 w-7 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Virtual GC
              </h3>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Your AI construction advisor. Ask about costs, permits, contracts, or anything renovation.
              </p>
            </div>

            {/* Quick actions */}
            <div className="grid w-full max-w-sm grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.prompt)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                    isDark
                      ? 'border-white/10 text-gray-300 hover:bg-white/[0.06]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <action.icon className={`h-4 w-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  {action.label}
                </button>
              ))}
            </div>

            {user && (
              <button
                onClick={() => setShowUpload(!showUpload)}
                className={`flex items-center gap-1.5 text-xs ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Upload project drawings for personalized advice
              </button>
            )}

            {showUpload && user && (
              <div className="w-full max-w-sm">
                <DocumentUpload
                  documents={documents}
                  onUpload={handleUploadFile}
                  onDelete={handleDeleteDoc}
                  variant={variant}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role as 'user' | 'assistant'}
                content={getMessageText(message)}
                sources={message.role === 'assistant' ? sourcesMap[message.id] : undefined}
                variant={variant}
              />
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isDark ? 'bg-white/10' : 'bg-reno-green/10'
                }`}>
                  <Bot className={`h-4 w-4 ${isDark ? 'text-white' : 'text-reno-green'}`} />
                </div>
                <div className={`rounded-2xl rounded-tl-md px-4 py-3 ${
                  isDark ? 'bg-white/[0.06]' : 'bg-gray-100'
                }`}>
                  <div className="flex gap-1">
                    <span className={`h-2 w-2 animate-bounce rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                    <span className={`h-2 w-2 animate-bounce rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                    <span className={`h-2 w-2 animate-bounce rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className={`shrink-0 border-t px-4 py-3 ${
        isDark ? 'border-white/[0.06]' : 'border-gray-100'
      }`}>
        <div className="mx-auto max-w-2xl">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
            onFileUpload={user ? () => setShowUpload(true) : undefined}
            isLoading={isLoading}
            showUpload={!!user}
            variant={variant}
          />
        </div>
        <p className={`mt-2 text-center text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          Virtual GC can make mistakes. Verify important information with a licensed professional.
        </p>
      </div>
    </div>
  );
}
