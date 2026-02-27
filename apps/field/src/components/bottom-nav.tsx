import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Users,
  Package,
  MoreHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MoreDrawer } from './more-drawer';

interface TabItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { label: 'Home', href: '/', icon: LayoutDashboard },
  { label: 'Schedule', href: '/schedule', icon: Calendar },
  { label: 'Safety', href: '/safety-forms', icon: ClipboardCheck },
  { label: 'Crew', href: '/attendance', icon: Users },
  { label: 'Materials', href: '/materials', icon: Package },
];

export function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md safe-area-pb md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="flex items-stretch px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.href}
                to={tab.href}
                end={tab.href === '/'}
                className="relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-x-2 bottom-1.5 top-1.5 rounded-xl bg-blue-50/80"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      className={cn(
                        'relative z-10 flex flex-col items-center transition-colors duration-200',
                        isActive ? 'text-blue-600' : 'text-slate-400'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-[10px] font-semibold">{tab.label}</span>
                    </motion.div>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More tab */}
          <button
            onClick={() => setMoreOpen(true)}
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5"
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              className="flex flex-col items-center text-slate-400"
            >
              <MoreHorizontal className="h-6 w-6" />
              <span className="text-[10px] font-semibold">More</span>
            </motion.div>
          </button>
        </div>
      </nav>

      <MoreDrawer open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}
