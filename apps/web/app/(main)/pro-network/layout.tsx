'use client';

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Shield,
  FileText,
  Settings,
  Building2,
  Wallet,
  BarChart3,
  DollarSign,
  HardHat,
  BookOpen,
  FileSignature,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

const gcLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/pro-network' },
  { icon: ClipboardList, label: 'My Tenders', href: '/pro-network/tenders' },
  { icon: BookOpen, label: 'Blueprints', href: '/pro-network/blueprints' },
  { icon: FileSignature, label: 'Proposals', href: '/pro-network/proposals' },
  { icon: Wallet, label: 'Project Wallet', href: '/pro-network/wallet' },
  { icon: BarChart3, label: 'Live P&L', href: '/pro-network/financials' },
  { icon: DollarSign, label: 'Payroll', href: '/pro-network/payroll' },
  { icon: HardHat, label: 'Crew Mgmt', href: '/pro-network/crew' },
  { icon: Users, label: 'Sub-Trades', href: '/pro-network/subs' },
  { icon: Shield, label: 'Compliance', href: '/pro-network/compliance' },
  { icon: FileText, label: 'Contracts', href: '/pro-network/contracts' },
  { icon: Settings, label: 'Settings', href: '/pro-network/settings' },
];

export default function ProNetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <DashboardSidebar links={gcLinks} title="GC Dashboard" />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
