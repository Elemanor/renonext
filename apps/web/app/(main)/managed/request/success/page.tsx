import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ManagedRequestSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Checkmark Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Request Submitted
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Our team will review your project and get back to you within 24 hours.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-reno-green-dark hover:bg-reno-green-dark">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/managed">Back to Managed Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
