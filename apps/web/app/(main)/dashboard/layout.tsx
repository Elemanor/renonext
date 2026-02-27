'use client';

import { DesktopSidebar } from '@/components/dashboard/desktop-sidebar';
import { DesktopHeader } from '@/components/dashboard/desktop-header';
import { BottomTabBar } from '@/components/dashboard/bottom-tab-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] lg:h-screen lg:overflow-hidden">
      <DesktopSidebar />
      <div className="flex flex-1 flex-col">
        <DesktopHeader />
        <main className="flex-1 lg:overflow-hidden">{children}</main>
        <BottomTabBar />
      </div>
    </div>
  );
}
