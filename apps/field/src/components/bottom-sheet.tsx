import type { ReactNode } from 'react';
import { Drawer } from 'vaul';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[90vh] flex-col rounded-t-2xl bg-white">
          {/* Drag handle */}
          <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-slate-300" />

          {title && (
            <Drawer.Title className="border-b px-4 pb-3 pt-4 text-base font-semibold text-slate-900">
              {title}
            </Drawer.Title>
          )}

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>

          {/* Footer actions */}
          {footer && (
            <div className="border-t bg-white p-4 safe-area-pb">
              {footer}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
