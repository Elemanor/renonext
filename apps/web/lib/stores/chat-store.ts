import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatStore {
  // Widget state
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;

  // Conversation
  conversationId: string | null;
  setConversationId: (id: string | null) => void;

  // Anonymous identity (persisted across sessions)
  anonymousId: string | null;
  getAnonymousId: () => string;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      conversationId: null,
      setConversationId: (id) => set({ conversationId: id }),

      anonymousId: null,
      getAnonymousId: () => {
        let id = get().anonymousId;
        if (!id) {
          id = crypto.randomUUID();
          set({ anonymousId: id });
        }
        return id;
      },
    }),
    {
      name: 'renonext-chat',
      partialize: (state) => ({
        anonymousId: state.anonymousId,
        conversationId: state.conversationId,
      }),
    }
  )
);
