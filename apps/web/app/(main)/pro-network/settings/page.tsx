'use client';

import {
  Settings,
  Building2,
  User,
  Bell,
  Shield,
  CreditCard,
  FileText,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const settingSections = [
  {
    icon: Building2,
    title: 'Company Profile',
    description: 'Business name, logo, license numbers, and insurance details',
    status: 'Complete',
    statusColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: User,
    title: 'Account Details',
    description: 'Email, phone, password, and two-factor authentication',
    status: 'Complete',
    statusColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Shield,
    title: 'WSIB & Insurance',
    description: 'Upload clearance certificates and liability insurance',
    status: 'Action Required',
    statusColor: 'bg-amber-50 text-amber-700',
  },
  {
    icon: CreditCard,
    title: 'Payment Settings',
    description: 'Bank accounts for payouts, payment terms, and billing',
    status: 'Complete',
    statusColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Email and push notification preferences for bids, compliance, and payments',
    status: 'Complete',
    statusColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: FileText,
    title: 'Default Tender Settings',
    description: 'Default bid duration, required certifications, and insurance minimums',
    status: 'Complete',
    statusColor: 'bg-emerald-50 text-emerald-700',
  },
];

export default function GCSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your GC account, compliance documents, and preferences
        </p>
      </div>

      <div className="space-y-3">
        {settingSections.map((section) => (
          <Card
            key={section.title}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                <section.icon className="h-6 w-6 text-violet-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              <Badge
                className={`shrink-0 rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold ${section.statusColor}`}
              >
                {section.status}
              </Badge>
              <Button
                variant="outline"
                className="h-auto shrink-0 rounded-xl border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
