'use client';

import { useState } from 'react';
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Shield,
  Ban,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'pro' | 'admin';
  isVerified: boolean;
  joinedAt: string;
  status: 'active' | 'suspended' | 'pending';
  jobCount: number;
  avatarUrl: string;
}

const mockUsers: AdminUser[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'client', isVerified: true, joinedAt: '2024-03-15', status: 'active', jobCount: 8, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
  { id: '2', name: 'Marcus Johnson', email: 'marcus@example.com', role: 'pro', isVerified: true, joinedAt: '2024-01-10', status: 'active', jobCount: 127, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { id: '3', name: 'Sarah Chen', email: 'sarah@example.com', role: 'pro', isVerified: true, joinedAt: '2024-04-20', status: 'active', jobCount: 89, avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { id: '4', name: 'David Park', email: 'david@example.com', role: 'pro', isVerified: false, joinedAt: '2024-11-01', status: 'pending', jobCount: 0, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { id: '5', name: 'Maria Garcia', email: 'maria@example.com', role: 'client', isVerified: true, joinedAt: '2024-06-15', status: 'active', jobCount: 3, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { id: '6', name: 'Robert Kim', email: 'robert@example.com', role: 'pro', isVerified: false, joinedAt: '2024-10-28', status: 'suspended', jobCount: 2, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
  { id: '7', name: 'Elena Rodriguez', email: 'elena@example.com', role: 'pro', isVerified: true, joinedAt: '2024-05-22', status: 'active', jobCount: 64, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
  { id: '8', name: 'James Wilson', email: 'james@example.com', role: 'client', isVerified: true, joinedAt: '2024-08-05', status: 'active', jobCount: 12, avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face' },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = mockUsers.length;
  const totalPros = mockUsers.filter((u) => u.role === 'pro').length;
  const totalClients = mockUsers.filter((u) => u.role === 'client').length;
  const totalPending = mockUsers.filter((u) => u.status === 'pending').length;

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    suspended: 'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700',
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        User Management
      </h1>

      {/* Summary Stats Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          {totalUsers} Total Users
        </span>
        <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
          {totalPros} Pros
        </span>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {totalClients} Clients
        </span>
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          {totalPending} Pending Verification
        </span>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[160px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="pro">Pros</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">User</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Role</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Verified</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Joined</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Jobs</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-gray-100 transition-all duration-200 last:border-0 hover:bg-gray-50/50"
              >
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-reno-green to-reno-green-dark text-xs font-bold text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize border-transparent ${
                      user.role === 'pro'
                        ? 'bg-purple-100 text-purple-700'
                        : user.role === 'admin'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize border-transparent ${
                      statusColors[user.status]
                    }`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  {user.isVerified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-300" />
                  )}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm text-gray-500">
                  {new Date(user.joinedAt).toLocaleDateString('en-CA', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm font-medium text-gray-900">
                  {user.jobCount}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl p-1.5 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl border border-gray-200 p-1.5 shadow-lg">
                      <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-all duration-200">
                        <Eye className="h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-all duration-200">
                        <Shield className="h-4 w-4" />
                        {user.isVerified ? 'Revoke Verification' : 'Verify'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-all duration-200 focus:text-red-600">
                        <Ban className="h-4 w-4" />
                        {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {filteredUsers.length} of {mockUsers.length} users
      </p>
    </div>
  );
}
