'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  title: string;
}

export function DashboardSidebar({ links, title }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          {title}
        </h2>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/dashboard' &&
                link.href !== '/pro-dashboard' &&
                link.href !== '/pro-network' &&
                link.href !== '/admin' &&
                pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-reno-green-light text-reno-green-dark shadow-sm shadow-reno-green-light/50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <link.icon
                  className={cn(
                    'h-5 w-5 transition-colors duration-200',
                    isActive ? 'text-reno-green-dark' : 'text-gray-400'
                  )}
                />
                {link.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-reno-green-dark" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
