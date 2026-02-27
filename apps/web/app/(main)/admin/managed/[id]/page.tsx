"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data (same as dashboard)
const MOCK_MANAGED_PROJECTS = [
  {
    id: "mp-001",
    title: "Downtown Office Renovation",
    client: "Acme Corp",
    clientEmail: "contact@acmecorp.com",
    status: "active",
    assignedTo: "BuildRight Construction",
    assignedPM: "Sarah Chen",
    requestedDate: "2026-02-01",
    description:
      "Complete renovation of our downtown office space including new flooring, painting, lighting upgrades, and furniture installation. The project spans 5,000 sq ft across two floors.",
    address: "123 King St W, Toronto, ON M5H 1A1",
    tradeType: "General Contractor",
    budgetRange: "$50k-100k",
    timeline: "3-6 months",
    estimatedCost: 75000,
    margin: 30,
    internalNotes:
      "Client has strict deadline due to lease renewal. Coordinate with building management for after-hours work.",
  },
  {
    id: "mp-002",
    title: "Residential Kitchen Remodel",
    client: "John Smith",
    clientEmail: "john.smith@email.com",
    status: "pending_review",
    assignedTo: null,
    assignedPM: null,
    requestedDate: "2026-02-10",
    description:
      "Full kitchen remodel including new cabinets, countertops, appliances, and backsplash. Remove existing layout and reconfigure for better flow.",
    address: "456 Oak Ave, Toronto, ON M4E 2K8",
    tradeType: "General Contractor",
    budgetRange: "$25k-50k",
    timeline: "1-2 months",
    estimatedCost: 0,
    margin: 30,
    internalNotes: "",
  },
  {
    id: "mp-003",
    title: "Commercial Plumbing Upgrade",
    client: "Tech Startup Inc",
    clientEmail: "facilities@techstartup.com",
    status: "assigned",
    assignedTo: "Premier Plumbing",
    assignedPM: "Mike Johnson",
    requestedDate: "2026-02-05",
    description:
      "Upgrade all plumbing fixtures in commercial office space. Replace old pipes, install water-efficient fixtures, and add additional restroom facilities.",
    address: "789 Yonge St, Toronto, ON M4W 2H2",
    tradeType: "Plumbing",
    budgetRange: "$10k-25k",
    timeline: "ASAP",
    estimatedCost: 18000,
    margin: 30,
    internalNotes: "Fast-tracked project. Customer is ready to sign immediately.",
  },
];

const STATUS_STYLES: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending_review: { label: "Pending Review", variant: "default" },
  assigned: { label: "Assigned", variant: "secondary" },
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const CONTRACTORS = [
  "BuildRight Construction",
  "Premier Plumbing",
  "Skyline Roofing",
  "Elite Electrical",
  "Pro Paint Solutions",
];

const PROJECT_MANAGERS = [
  "Sarah Chen",
  "Mike Johnson",
  "Emily Rodriguez",
  "David Lee",
  "Jessica Taylor",
];

interface AdminManagedDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminManagedDetailPage({ params }: AdminManagedDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [project, setProject] = useState(
    MOCK_MANAGED_PROJECTS.find((p) => p.id === resolvedParams.id) ||
      MOCK_MANAGED_PROJECTS[0]
  );

  const [formData, setFormData] = useState({
    assignedTo: project.assignedTo || "",
    assignedPM: project.assignedPM || "",
    margin: project.margin,
    estimatedCost: project.estimatedCost,
    internalNotes: project.internalNotes,
  });

  const statusStyle = STATUS_STYLES[project.status];

  const handleStatusChange = (newStatus: string) => {
    console.log(`Changing status to: ${newStatus}`);
    setProject({ ...project, status: newStatus });
  };

  const handleSave = () => {
    console.log("Saving project data:", { ...project, ...formData });
    // In production, this would update Supabase
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/managed"
            className="text-sm text-reno-green hover:text-reno-green-dark mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {project.title}
              </h1>
              <div className="mt-2 flex items-center gap-4">
                <Badge variant={statusStyle.variant}>{statusStyle.label}</Badge>
                <span className="text-sm text-slate-600">
                  Requested on{" "}
                  {new Date(project.requestedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Info Card */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Client Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-600">Client Name</div>
              <div className="font-medium text-slate-900">{project.client}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Email</div>
              <div className="font-medium text-slate-900">
                {project.clientEmail}
              </div>
            </div>
          </div>
        </Card>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Project Details
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">
                    Description
                  </div>
                  <p className="text-slate-900">{project.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Address
                    </div>
                    <p className="text-slate-900">{project.address}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Trade Type
                    </div>
                    <p className="text-slate-900">{project.tradeType}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Budget Range
                    </div>
                    <p className="text-slate-900">{project.budgetRange}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Timeline
                    </div>
                    <p className="text-slate-900">{project.timeline}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Status Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.status === "pending_review" && (
                  <Button
                    onClick={() => handleStatusChange("assigned")}
                    className="bg-reno-green hover:bg-reno-green-dark"
                  >
                    Approve & Assign
                  </Button>
                )}
                {project.status === "assigned" && (
                  <Button
                    onClick={() => handleStatusChange("active")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Start Project
                  </Button>
                )}
                {project.status === "active" && (
                  <Button
                    onClick={() => handleStatusChange("completed")}
                    className="bg-slate-600 hover:bg-slate-700"
                  >
                    Mark Completed
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("cancelled")}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Cancel Project
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Assignment Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Assignment
              </h2>
              <div className="space-y-4">
                {/* Assign Contractor */}
                <div>
                  <Label htmlFor="contractor" className="text-slate-900">
                    Contractor
                  </Label>
                  <select
                    id="contractor"
                    value={formData.assignedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedTo: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-reno-green focus:border-reno-green"
                  >
                    <option value="">Select contractor...</option>
                    {CONTRACTORS.map((contractor) => (
                      <option key={contractor} value={contractor}>
                        {contractor}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assign PM */}
                <div>
                  <Label htmlFor="pm" className="text-slate-900">
                    Project Manager
                  </Label>
                  <select
                    id="pm"
                    value={formData.assignedPM}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedPM: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-reno-green focus:border-reno-green"
                  >
                    <option value="">Select PM...</option>
                    {PROJECT_MANAGERS.map((pm) => (
                      <option key={pm} value={pm}>
                        {pm}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Margin */}
                <div>
                  <Label htmlFor="margin" className="text-slate-900">
                    Margin %
                  </Label>
                  <Input
                    id="margin"
                    type="number"
                    value={formData.margin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        margin: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="30"
                    min="0"
                    max="100"
                  />
                </div>

                {/* Estimated Cost */}
                <div>
                  <Label htmlFor="estimatedCost" className="text-slate-900">
                    Estimated Cost (CAD)
                  </Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedCost: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Internal Notes */}
                <div>
                  <Label htmlFor="notes" className="text-slate-900">
                    Internal Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.internalNotes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        internalNotes: e.target.value,
                      })
                    }
                    placeholder="Add internal notes..."
                    rows={4}
                  />
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSave}
                  className="w-full bg-reno-green hover:bg-reno-green-dark"
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
