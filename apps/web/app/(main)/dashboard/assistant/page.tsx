'use client';

import { ChatPanel } from '@/components/chat/chat-panel';

export default function AssistantPage() {
  return (
    <div className="h-full">
      <ChatPanel variant="dark" fullPage />
    </div>
  );
}
