import {
  Users,
  Briefcase,
  DollarSign,
  AlertTriangle,
  UserPlus,
  Activity,
  Settings,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { StatsCard } from '@/components/stats-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const adminStats = [
  {
    icon: Users,
    label: 'Total Users',
    value: '4,128',
    trend: { value: 15, isPositive: true },
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    icon: Briefcase,
    label: 'Active Jobs',
    value: '342',
    trend: { value: 8, isPositive: true },
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
  {
    icon: DollarSign,
    label: 'Monthly Revenue',
    value: '$18,450',
    trend: { value: 22, isPositive: true },
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    icon: AlertTriangle,
    label: 'Open Disputes',
    value: '7',
    trend: { value: 12, isPositive: false },
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
  },
];

const recentSignups = [
  {
    name: 'Alice Williams',
    role: 'client',
    date: '2 hours ago',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Bob Martinez',
    role: 'pro',
    date: '4 hours ago',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Carol Lee',
    role: 'client',
    date: '6 hours ago',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Dan Brown',
    role: 'pro',
    date: '8 hours ago',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Eve Johnson',
    role: 'client',
    date: '1 day ago',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  },
];

const platformActivity = [
  {
    event: 'New job posted: "Bathroom renovation"',
    time: '10 min ago',
    type: 'new',
  },
  {
    event: 'Bid accepted: Marcus J. for "Kitchen faucet repair"',
    time: '25 min ago',
    type: 'new',
  },
  {
    event: 'Job completed: "Interior painting - Living room"',
    time: '1 hour ago',
    type: 'completed',
  },
  {
    event: 'Dispute opened: Job #4521',
    time: '2 hours ago',
    type: 'dispute',
  },
  {
    event: 'New pro verified: Sarah Chen',
    time: '3 hours ago',
    type: 'verified',
  },
  {
    event: 'Payment processed: $650 for Job #4489',
    time: '4 hours ago',
    type: 'completed',
  },
];

const activityDotColor: Record<string, string> = {
  completed: 'bg-green-500',
  new: 'bg-blue-500',
  dispute: 'bg-amber-500',
  verified: 'bg-purple-500',
};

const quickActions = [
  {
    label: 'Manage Users',
    href: '/admin/users',
    icon: Users,
    description: 'View and manage all users',
  },
  {
    label: 'View Jobs',
    href: '/admin/jobs',
    icon: Briefcase,
    description: 'Browse active and past jobs',
  },
  {
    label: 'Review Reports',
    href: '/admin/reports',
    icon: FileText,
    description: 'Disputes and flagged content',
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Platform configuration',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Signups */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-reno-green-dark" />
              <CardTitle className="text-lg font-bold text-gray-900">
                Recent Signups
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentSignups.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-reno-green to-reno-green-dark text-sm font-bold text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.date}</p>
                    </div>
                  </div>
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize border-transparent ${
                      user.role === 'pro'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Activity */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-reno-green-dark" />
              <CardTitle className="text-lg font-bold text-gray-900">
                Platform Activity
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {platformActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50">
                  <div
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activityDotColor[item.type] ?? 'bg-reno-green'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900">{item.event}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto flex-col items-start gap-2 rounded-xl border-gray-200 p-4 text-left transition-all duration-200 hover:border-reno-green hover:bg-reno-green-light hover:shadow-sm"
                asChild
              >
                <Link href={action.href}>
                  <action.icon className="h-5 w-5 text-reno-green-dark" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {action.label}
                    </p>
                    <p className="text-xs font-normal text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
