'use client';

import {
  LayoutDashboard,
  Users,
  Briefcase,
  AlertTriangle,
  Tag,
  Settings,
  HardHat,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

const adminLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: HardHat, label: 'Contractors', href: '/admin/contractors' },
  { icon: Briefcase, label: 'Jobs', href: '/admin/jobs' },
  { icon: AlertTriangle, label: 'Reports', href: '/admin/reports' },
  { icon: Tag, label: 'Categories', href: '/admin/categories' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <DashboardSidebar links={adminLinks} title="Admin Panel" />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
