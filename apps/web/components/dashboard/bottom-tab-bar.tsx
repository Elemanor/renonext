'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, CalendarDays, Wallet, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: CalendarDays, label: 'Schedule', href: '/dashboard/my-project' },
  { icon: Wallet, label: 'Escrow', href: '/dashboard/wallet' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 2 },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] bg-[#0e0e14]/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around pb-[env(safe-area-inset-bottom)] pt-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-tab"
                  className="absolute -top-px left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-b-full bg-emerald-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative">
                <tab.icon className={cn('h-[22px] w-[22px]', isActive ? 'text-emerald-400' : 'text-gray-600')} />
                {tab.badge && (
                  <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={cn('text-[10px]', isActive ? 'text-emerald-400' : 'text-gray-600')}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
