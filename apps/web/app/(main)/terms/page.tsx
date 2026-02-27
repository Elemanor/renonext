import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | RenoNext",
  description:
    "Terms of Service for RenoNext. Read about account registration, payments, escrow, contractor obligations, and our legal commitments in Ontario, Canada.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Terms of Service</span>
          </nav>

          {/* Last Updated */}
          <div className="text-sm text-gray-500 mb-6">
            Last updated: January 15, 2026
          </div>

          {/* Page Title & Introduction */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 leading-relaxed mb-10">
            Welcome to RenoNext. These Terms of Service govern your access to
            and use of RenoNext's platform, services, and website. By creating
            an account or using our services, you agree to be bound by these
            terms. Please read them carefully. If you do not agree to these
            terms, you may not use RenoNext.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            By accessing or using RenoNext, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service and our
            Privacy Policy. These terms constitute a legally binding agreement
            between you and RenoNext Inc., a corporation incorporated under the
            laws of Ontario, Canada.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you are using RenoNext on behalf of a business or other entity,
            you represent that you have the authority to bind that entity to
            these terms, and "you" refers to that entity.
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            2. Account Registration
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To use certain features of RenoNext, you must register for an
            account. You agree to provide accurate, current, and complete
            information during registration and to update such information to
            keep it accurate, current, and complete.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You are responsible for safeguarding your password and for all
            activities that occur under your account. You agree to notify us
            immediately of any unauthorized use of your account. RenoNext will
            not be liable for any loss or damage arising from your failure to
            comply with these security obligations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            We reserve the right to suspend or terminate accounts that violate
            these terms, provide false information, or engage in fraudulent or
            illegal activity.
          </p>

          {/* Section 3 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            3. Services Description
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            RenoNext is a platform that connects property owners ("Clients")
            with licensed construction professionals ("Contractors") for
            residential and commercial construction projects. Our services
            include:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 space-y-2 ml-4">
            <li>Project listing and bidding functionality</li>
            <li>Contractor discovery and vetting tools</li>
            <li>
              Secure payment escrow and milestone-based payment processing
            </li>
            <li>Project management tools and compliance tracking</li>
            <li>Communication and documentation features</li>
            <li>Review and rating systems</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            RenoNext is a technology platform and marketplace. We do not provide
            construction services, and we are not a party to any contract
            between Clients and Contractors. All construction work is performed
            by independent Contractors who are solely responsible for the
            quality, safety, and legality of their work.
          </p>

          {/* Section 4 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            4. Payments & Escrow
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            RenoNext uses Stripe to process payments and maintain escrow
            accounts. When a Client accepts a proposal, they agree to deposit
            funds according to the agreed-upon payment schedule, typically
            structured around project milestones.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Escrow Protection:</strong> Client funds are held in escrow
            and released to Contractors only upon milestone completion and
            Client approval. This protects both parties and ensures work is
            completed as agreed before payment is transferred.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Platform Fees:</strong> RenoNext charges a service fee on
            all transactions processed through the platform. The fee structure
            is disclosed during the proposal acceptance process. Contractors are
            responsible for platform fees, which are deducted from milestone
            payments.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Refunds and Disputes:</strong> If a dispute arises regarding
            milestone completion or payment release, RenoNext may mediate the
            dispute based on documentation provided by both parties. However,
            RenoNext is not obligated to resolve disputes and may require
            parties to seek external resolution through arbitration or legal
            means.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            All payments are subject to applicable taxes. Contractors are
            responsible for remitting HST/GST and other taxes as required by
            Canadian law.
          </p>

          {/* Section 5 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            5. Contractor Terms
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Contractors using RenoNext must comply with all applicable laws,
            regulations, and professional standards in Ontario, Canada,
            including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 space-y-2 ml-4">
            <li>
              Maintaining valid licenses, permits, and insurance as required for
              their trade
            </li>
            <li>
              Complying with the Ontario Building Code and all applicable
              building codes
            </li>
            <li>
              For qualifying projects, involving a BCIN (Building Code
              Identification Number) holder as required by law
            </li>
            <li>Obtaining necessary permits and inspections for all work</li>
            <li>
              Carrying adequate liability insurance and WSIB coverage where
              applicable
            </li>
            <li>
              Providing accurate and complete proposals, including scope of
              work, timelines, and costs
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            Contractors represent and warrant that they have the skills,
            experience, and qualifications necessary to perform the work they
            bid on. Contractors are solely responsible for the quality, safety,
            and legality of their work.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            RenoNext may verify Contractor credentials, licenses, and insurance
            but does not guarantee the quality of any Contractor's work.
            Contractors agree to provide verification documents upon request.
          </p>

          {/* Section 6 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            6. Intellectual Property
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The RenoNext platform, including its software, design, content,
            trademarks, and all intellectual property rights therein, are owned
            by RenoNext Inc. or its licensors. You are granted a limited,
            non-exclusive, non-transferable license to access and use the
            platform for its intended purpose.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You retain ownership of any content you submit to RenoNext,
            including project descriptions, photos, and documents. By submitting
            content, you grant RenoNext a worldwide, royalty-free license to
            use, reproduce, and display such content solely for the purpose of
            operating and improving the platform.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You may not copy, modify, distribute, sell, or lease any part of the
            RenoNext platform without our express written permission.
          </p>

          {/* Section 7 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            7. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, RENONEXT SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
            DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
            INTANGIBLE LOSSES.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            RenoNext is not responsible for the conduct of any user, the quality
            of construction work performed, delays, cost overruns, safety
            incidents, or any disputes between Clients and Contractors. Our
            platform facilitates connections and transactions but does not
            guarantee outcomes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            In no event shall RenoNext's total liability to you exceed the
            amount of fees you paid to RenoNext in the twelve (12) months
            preceding the event giving rise to liability.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Some jurisdictions do not allow the exclusion of certain warranties
            or the limitation of liability for incidental or consequential
            damages. Accordingly, some of the above limitations may not apply to
            you.
          </p>

          {/* Section 8 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            8. Dispute Resolution
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If a dispute arises between you and RenoNext, we encourage you to
            contact us first to seek an informal resolution. You can reach us
            through our Contact page.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            If we cannot resolve the dispute informally, you agree that any
            dispute, claim, or controversy arising out of or relating to these
            Terms or the use of RenoNext shall be resolved through binding
            arbitration in accordance with the Arbitration Act, 1991 (Ontario).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The arbitration shall be conducted by a single arbitrator in
            Toronto, Ontario, Canada, and shall be conducted in English. The
            arbitrator's decision shall be final and binding. Each party shall
            bear its own costs and expenses, including legal fees.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Notwithstanding the above, either party may seek injunctive or other
            equitable relief in a court of competent jurisdiction to prevent the
            actual or threatened infringement of intellectual property rights.
          </p>

          {/* Section 9 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            9. Governing Law
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the Province of Ontario and the federal
            laws of Canada applicable therein, without regard to conflict of law
            principles.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You agree to submit to the exclusive jurisdiction of the courts
            located in Toronto, Ontario, Canada, for the resolution of any
            disputes not subject to arbitration.
          </p>

          {/* Section 10 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            10. Changes to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            RenoNext reserves the right to modify these Terms of Service at any
            time. We will notify you of material changes by posting the updated
            terms on our website and updating the "Last updated" date at the top
            of this page.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Your continued use of RenoNext after changes are posted constitutes
            your acceptance of the modified terms. If you do not agree to the
            modified terms, you must stop using RenoNext and may close your
            account.
          </p>

          {/* Section 11 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            11. Contact Information
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>

          <Card className="p-6 bg-gray-50 border-gray-200">
            <div className="space-y-2">
              <p className="text-gray-900 font-semibold">RenoNext Inc.</p>
              <p className="text-gray-600">Toronto, Ontario, Canada</p>
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:legal@renonext.com"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  legal@renonext.com
                </a>
              </p>
              <p className="text-gray-600">
                Contact Form:{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  renonext.com/contact
                </Link>
              </p>
            </div>
          </Card>

          {/* Bottom Spacing */}
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
}
