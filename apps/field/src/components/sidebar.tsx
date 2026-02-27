import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Clock,
  ClipboardCheck,
  MapPin,
  Calendar,
  Cylinder,
  FileQuestion,
  Package,
  ShieldCheck,
  Building2,
  CreditCard,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  minRole?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Attendance', href: '/attendance', icon: Clock },
  { label: 'Safety Forms', href: '/safety-forms', icon: ClipboardCheck },
  { label: 'Work Areas', href: '/work-areas', icon: MapPin },
  { label: 'Schedule', href: '/schedule', icon: Calendar },
  { label: 'Concrete', href: '/concrete', icon: Cylinder },
  { label: 'RFIs', href: '/rfis', icon: FileQuestion },
  { label: 'Materials', href: '/materials', icon: Package },
  { label: 'Safety', href: '/safety', icon: ShieldCheck, minRole: ['owner', 'admin', 'supervisor'] },
];

const SETTINGS_ITEMS: NavItem[] = [
  { label: 'Organization', href: '/settings', icon: Building2, minRole: ['owner', 'admin'] },
  { label: 'Billing', href: '/settings/billing', icon: CreditCard, minRole: ['owner', 'admin'] },
];

const COLLAPSE_KEY = 'renonext-sidebar-collapsed';

export function Sidebar() {
  const { user, membership, signOut } = useAuth();
  const location = useLocation();
  const userRole = membership?.role ?? 'worker';

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, String(collapsed));
    } catch {
      // ignore
    }
  }, [collapsed]);

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.minRole || item.minRole.includes(userRole),
  );
  const visibleSettings = SETTINGS_ITEMS.filter(
    (item) => !item.minRole || item.minRole.includes(userRole),
  );

  const displayName = membership?.display_name || user?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
      className={cn(
        'flex h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Header */}
      <div className="relative flex items-center border-b border-gray-700 px-3 py-4">
        {!collapsed && (
          <h2 className="text-lg font-bold tracking-tight text-white">
            RenoNext <span className="text-blue-400">Field</span>
          </h2>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-700 hover:text-white',
            collapsed ? 'mx-auto' : 'ml-auto',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              collapsed && 'rotate-180',
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  collapsed && 'justify-center px-0',
                )
              }
            >
              <Icon className={cn('h-5 w-5 shrink-0', !collapsed && 'mr-3')} />
              {!collapsed && item.label}
            </NavLink>
          );
        })}

        {visibleSettings.length > 0 && (
          <>
            <div className="my-2 border-t border-gray-700" />
            {!collapsed && (
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Settings
              </p>
            )}
            {visibleSettings.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/settings'}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      collapsed && 'justify-center px-0',
                    )
                  }
                >
                  <Icon className={cn('h-5 w-5 shrink-0', !collapsed && 'mr-3')} />
                  {!collapsed && item.label}
                </NavLink>
              );
            })}
          </>
        )}
      </nav>

      {/* User section + Sign Out */}
      <div className="border-t border-gray-700 px-2 py-3 space-y-1">
        {/* User avatar + info */}
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2',
            collapsed && 'justify-center px-0',
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {initial}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{displayName}</p>
              {membership?.role && (
                <span className="inline-block rounded bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium capitalize text-gray-300">
                  {membership.role}
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => signOut()}
          title={collapsed ? 'Sign Out' : undefined}
          className={cn(
            'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white',
            collapsed && 'justify-center px-0',
          )}
        >
          <LogOut className={cn('h-5 w-5 shrink-0', !collapsed && 'mr-3')} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}
