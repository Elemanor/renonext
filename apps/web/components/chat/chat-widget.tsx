'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ChatPanel } from './chat-panel';
import { useChatStore } from '@/lib/stores/chat-store';

export function ChatWidget() {
  const pathname = usePathname();
  const { isOpen, setIsOpen, toggle } = useChatStore();

  // Hide on dashboard pages (dashboard has its own AI Assistant panel)
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-reno-green shadow-lg shadow-reno-green/25 text-white transition-transform hover:scale-105 active:scale-95 lg:bottom-8 lg:right-8"
            aria-label="Open AI assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sheet panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col p-0 sm:max-w-md"
        >
          <SheetHeader className="shrink-0 border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <SheetTitle className="text-sm font-semibold">Virtual GC</SheetTitle>
                  <p className="text-[10px] text-gray-500">AI Construction Advisor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-hidden">
            <ChatPanel variant="light" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
