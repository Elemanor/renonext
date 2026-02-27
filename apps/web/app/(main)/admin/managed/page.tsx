"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const MOCK_MANAGED_PROJECTS = [
  {
    id: "mp-001",
    title: "Downtown Office Renovation",
    client: "Acme Corp",
    status: "active",
    assignedTo: "BuildRight Construction",
    assignedPM: "Sarah Chen",
    requestedDate: "2026-02-01",
  },
  {
    id: "mp-002",
    title: "Residential Kitchen Remodel",
    client: "John Smith",
    status: "pending_review",
    assignedTo: null,
    assignedPM: null,
    requestedDate: "2026-02-10",
  },
  {
    id: "mp-003",
    title: "Commercial Plumbing Upgrade",
    client: "Tech Startup Inc",
    status: "assigned",
    assignedTo: "Premier Plumbing",
    assignedPM: "Mike Johnson",
    requestedDate: "2026-02-05",
  },
  {
    id: "mp-004",
    title: "Roof Replacement Project",
    client: "City Community Center",
    status: "completed",
    assignedTo: "Skyline Roofing",
    assignedPM: "Emily Rodriguez",
    requestedDate: "2026-01-15",
  },
  {
    id: "mp-005",
    title: "Warehouse Electrical Work",
    client: "Logistics Solutions",
    status: "cancelled",
    assignedTo: null,
    assignedPM: null,
    requestedDate: "2026-02-08",
  },
];

const STATUS_STYLES: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending_review: { label: "Pending Review", variant: "default" },
  assigned: { label: "Assigned", variant: "secondary" },
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export default function AdminManagedDashboardPage() {
  const router = useRouter();
  const [projects] = useState(MOCK_MANAGED_PROJECTS);

  // Calculate stats
  const stats = {
    total: projects.length,
    pendingReview: projects.filter((p) => p.status === "pending_review").length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/managed/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Managed Projects Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Review and manage all client-requested projects.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm font-medium text-slate-600">
              Total Requests
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {stats.total}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-slate-600">
              Pending Review
            </div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {stats.pendingReview}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-slate-600">Active</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {stats.active}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-slate-600">Completed</div>
            <div className="mt-2 text-3xl font-bold text-slate-600">
              {stats.completed}
            </div>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Requested
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {projects.map((project) => {
                  const statusStyle = STATUS_STYLES[project.status];
                  return (
                    <tr
                      key={project.id}
                      onClick={() => handleRowClick(project.id)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {project.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {project.client}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={statusStyle.variant}>
                          {statusStyle.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {project.assignedTo || (
                            <span className="text-slate-400 italic">
                              Not assigned
                            </span>
                          )}
                        </div>
                        {project.assignedPM && (
                          <div className="text-xs text-slate-500">
                            PM: {project.assignedPM}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {new Date(project.requestedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
