'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Wallet,
  Users,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: CalendarDays, label: 'Schedule', href: '/dashboard/my-project' },
  { icon: FileText, label: 'Documents', href: '/dashboard/jobs' },
  { icon: Wallet, label: 'Escrow', href: '/dashboard/wallet' },
  { icon: Users, label: 'Team', href: '/dashboard/site' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0e0e14] lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
          <span className="text-sm font-bold text-emerald-400">R</span>
        </div>
        <span className="text-sm font-semibold text-white/90">RenoNext</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/[0.08] text-white'
                  : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
              )}
            >
              <link.icon className={cn('h-[18px] w-[18px]', isActive ? 'text-emerald-400' : 'text-gray-600')} />
              {link.label}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="border-t border-white/[0.06] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 text-xs font-semibold text-emerald-300">
            SC
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white/90">Sarah Chen</p>
            <p className="truncate text-xs text-gray-500">Homeowner</p>
          </div>
          <button className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-gray-400">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
