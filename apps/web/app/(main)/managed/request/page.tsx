"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TRADE_TYPES = [
  "General Contractor",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Roofing",
  "Concrete",
  "Masonry",
  "Painting",
  "Landscaping",
  "Other",
];

const BUDGET_RANGES = [
  "Under $10k",
  "$10k-25k",
  "$25k-50k",
  "$50k-100k",
  "Over $100k",
];

const TIMELINES = ["ASAP", "1-2 months", "3-6 months", "6+ months"];

export default function ManagedRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    tradeType: "",
    budgetRange: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Mock submission - in production this would POST to Supabase
    console.log("Submitting managed project request:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to success page
    router.push("/managed/request/success");
  };

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Request a Managed Project
          </h1>
          <p className="mt-2 text-slate-600">
            Fill out the form below and our team will review your request within
            24 hours.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-slate-900">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Kitchen Renovation"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-slate-900">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your project in detail..."
                rows={6}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-slate-900">
                Project Address
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Main St, Toronto, ON"
              />
            </div>

            {/* Trade Type */}
            <div>
              <Label htmlFor="tradeType" className="text-slate-900">
                Trade Type
              </Label>
              <select
                id="tradeType"
                value={formData.tradeType}
                onChange={(e) => handleChange("tradeType", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-reno-green focus:border-reno-green"
              >
                <option value="">Select a trade...</option>
                {TRADE_TYPES.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <Label htmlFor="budgetRange" className="text-slate-900">
                Budget Range
              </Label>
              <select
                id="budgetRange"
                value={formData.budgetRange}
                onChange={(e) => handleChange("budgetRange", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-reno-green focus:border-reno-green"
              >
                <option value="">Select a budget range...</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeline */}
            <div>
              <Label htmlFor="timeline" className="text-slate-900">
                Desired Timeline
              </Label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleChange("timeline", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-reno-green focus:border-reno-green"
              >
                <option value="">Select a timeline...</option>
                {TIMELINES.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-reno-green-dark hover:bg-reno-green-dark"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
