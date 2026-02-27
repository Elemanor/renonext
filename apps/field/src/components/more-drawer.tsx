import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Drawer } from 'vaul';
import {
  MapPin,
  Cylinder,
  FileQuestion,
  ShieldCheck,
  Settings,
  LogOut,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DrawerItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  action?: 'signout';
}

const ITEMS: DrawerItem[] = [
  { label: 'Work Areas', href: '/work-areas', icon: MapPin },
  { label: 'Concrete', href: '/concrete', icon: Cylinder },
  { label: 'RFIs', href: '/rfis', icon: FileQuestion },
  { label: 'Safety Compliance', href: '/safety', icon: ShieldCheck },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Sign Out', icon: LogOut, action: 'signout' },
];

interface MoreDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MoreDrawer({ open, onOpenChange }: MoreDrawerProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleTap = (item: DrawerItem) => {
    if (item.action === 'signout') {
      signOut();
    } else if (item.href) {
      navigate(item.href);
    }
    onOpenChange(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex flex-col rounded-t-2xl bg-white">
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-slate-300" />

          <div className="p-4 pb-8">
            <Drawer.Title className="mb-3 text-sm font-semibold text-slate-500">
              More Options
            </Drawer.Title>

            <div className="space-y-1">
              {ITEMS.map((item) => {
                const Icon = item.icon;
                const isSignOut = item.action === 'signout';
                return (
                  <button
                    key={item.label}
                    onClick={() => handleTap(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                      isSignOut
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
