'use client';

import {
  LayoutDashboard,
  Briefcase,
  Image,
  DollarSign,
  Settings,
  FileText,
  MapPin,
  Wallet,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

const proLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/pro-dashboard' },
  { icon: Briefcase, label: 'My Jobs', href: '/pro-dashboard/jobs' },
  { icon: MapPin, label: 'Find Jobs', href: '/pro-dashboard/find-jobs' },
  { icon: Image, label: 'Gallery', href: '/pro-dashboard/gallery' },
  { icon: Wallet, label: 'My Wallet', href: '/pro-dashboard/wallet' },
  { icon: DollarSign, label: 'Earnings', href: '/pro-dashboard/earnings' },
  { icon: FileText, label: 'Blog Posts', href: '/pro-dashboard/blog' },
  { icon: Settings, label: 'Settings', href: '/pro-dashboard/settings' },
];

export default function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <DashboardSidebar links={proLinks} title="Pro Dashboard" />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
