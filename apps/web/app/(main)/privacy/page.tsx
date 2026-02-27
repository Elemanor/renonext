import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Shield, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | RenoNext',
  description: 'RenoNext Privacy Policy - Learn how we collect, use, and protect your personal information in compliance with PIPEDA.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <p className="text-sm text-gray-500">Last updated: January 15, 2026</p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <p className="text-gray-600 leading-relaxed mb-4">
              RenoNext Inc. (&quot;RenoNext,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform to connect homeowners with construction professionals in Ontario, Canada.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We comply with the Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable Canadian privacy laws. By using RenoNext, you consent to the data practices described in this policy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This policy applies to all users of our platform, including homeowners seeking contractors (&quot;Clients&quot;) and construction professionals offering services (&quot;Contractors&quot;).
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              1.1 Personal Information
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you register for an account, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Full name and email address</li>
              <li>Phone number and mailing address</li>
              <li>Profile photograph (optional)</li>
              <li>For Contractors: business name, BCIN (Building Code Identification Number), trade certifications, insurance documentation, and years of experience</li>
              <li>For Clients: property address and type of residence</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              1.2 Financial Information
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Payment processing is handled by our third-party payment processor, Stripe, Inc. We do not store full credit card numbers. We collect:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Billing address and payment method type</li>
              <li>Transaction history and invoices</li>
              <li>Bank account information for Contractors receiving payments (stored securely by Stripe)</li>
              <li>Tax identification numbers as required by law</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              1.3 Project and Service Information
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you create or bid on projects, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Project descriptions, specifications, and scope of work</li>
              <li>Property location coordinates (to match nearby Contractors)</li>
              <li>Project photographs, blueprints, and technical documents</li>
              <li>Bid amounts, proposals, and estimates</li>
              <li>Messages exchanged between Clients and Contractors</li>
              <li>Project milestones, progress reports, and completion status</li>
              <li>Reviews, ratings, and feedback</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              1.4 Usage and Device Information
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We automatically collect certain information when you use RenoNext:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>IP address, browser type, and device identifiers</li>
              <li>Pages viewed, features used, and time spent on the platform</li>
              <li>Referral sources and search terms</li>
              <li>Error logs and diagnostic data</li>
              <li>Approximate geographic location based on IP address</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li><strong>Platform Operation:</strong> To create and manage your account, facilitate project matching, enable communication between Clients and Contractors, and process transactions</li>
              <li><strong>Service Improvement:</strong> To analyze usage patterns, develop new features, and improve platform performance and user experience</li>
              <li><strong>Safety and Trust:</strong> To verify Contractor credentials, prevent fraud, enforce our Terms of Service, and maintain platform integrity</li>
              <li><strong>Communication:</strong> To send transactional emails (project updates, payment confirmations), service announcements, and promotional materials (with your consent)</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations, respond to legal requests, and protect our rights and property</li>
              <li><strong>Geographic Matching:</strong> To connect Clients with nearby Contractors using location-based search functionality</li>
              <li><strong>Dispute Resolution:</strong> To investigate and resolve disputes, claims, or issues between users</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              3. Information Sharing and Disclosure
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              3.1 Between Platform Users
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you engage with other users on RenoNext:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Clients can view Contractor profiles, including business name, certifications, ratings, and portfolio</li>
              <li>Contractors can view Client project details and location (approximate area, not exact address until project is awarded)</li>
              <li>Contact information is shared only after mutual agreement to proceed with a project</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              3.2 Service Providers
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We share information with trusted third-party service providers who assist in operating our platform:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li><strong>Stripe:</strong> Payment processing and financial services</li>
              <li><strong>Supabase:</strong> Database hosting and authentication services</li>
              <li><strong>Cloud Infrastructure:</strong> Hosting and storage providers</li>
              <li><strong>Email Services:</strong> Transactional and marketing email delivery</li>
              <li><strong>Analytics Providers:</strong> Usage analytics and performance monitoring</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              These providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              3.3 Legal Requirements
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may disclose your information when required by law or to:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Comply with legal processes, court orders, or government requests</li>
              <li>Enforce our Terms of Service and investigate violations</li>
              <li>Detect, prevent, or address fraud, security, or technical issues</li>
              <li>Protect the rights, property, or safety of RenoNext, our users, or the public</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              3.4 Business Transfers
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If RenoNext is involved in a merger, acquisition, or sale of assets, your information may be transferred to the new entity. We will provide notice before your information is transferred and becomes subject to a different privacy policy.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              4. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal obligations (e.g., tax records, transaction history)</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Improve our platform and develop new features</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you close your account, we will delete or anonymize your personal information within 90 days, except where we are legally required to retain it. Project records and transaction history may be retained for up to 7 years for accounting and legal purposes.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Reviews and ratings you have provided may remain visible in an anonymized form to maintain the integrity of our platform.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              5. Your Privacy Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Under PIPEDA and applicable provincial privacy laws, you have the following rights:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              5.1 Access
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can request access to the personal information we hold about you. We will provide a copy of your data in a commonly used electronic format within 30 days of your request.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              5.2 Correction
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can update most of your information through your account settings. If you believe any information we hold is inaccurate or incomplete, you can request corrections.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              5.3 Deletion
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can request deletion of your personal information, subject to certain exceptions (e.g., legal retention requirements, active project obligations). Account deletion can be initiated from your account settings or by contacting us.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              5.4 Withdrawal of Consent
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can withdraw consent for marketing communications at any time by clicking the unsubscribe link in emails or adjusting your notification preferences. Note that withdrawing consent may limit your ability to use certain platform features.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              5.5 Complaints
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have concerns about how we handle your personal information, please contact our Privacy Officer. If you are not satisfied with our response, you have the right to file a complaint with the Office of the Privacy Commissioner of Canada.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              RenoNext uses cookies, web beacons, and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for authentication, security, and core platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform and identify areas for improvement</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can control cookie preferences through your browser settings. Disabling certain cookies may limit platform functionality. We do not respond to Do Not Track signals, but we provide opt-out options for non-essential cookies.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              7. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Encryption of data in transit (TLS/SSL) and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection and privacy practices</li>
              <li>Incident response procedures for data breaches</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we take reasonable precautions to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we will notify you of any data breaches as required by law.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              RenoNext is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children. If you are under 16, please do not use our platform or provide any personal information.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              If we become aware that we have collected personal information from a child under 16 without parental consent, we will take steps to delete that information promptly.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              RenoNext operates primarily in Ontario, Canada. However, some of our service providers may be located in other countries, including the United States. When we transfer your information internationally, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Standard contractual clauses approved by privacy regulators</li>
              <li>Verification that the recipient country provides adequate data protection</li>
              <li>Your explicit consent where required by law</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Data transferred to the United States may be subject to access by U.S. government authorities under applicable laws.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or business operations. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-2">
              <li>Posting the updated policy on this page with a new &quot;Last updated&quot; date</li>
              <li>Sending an email notification to your registered email address</li>
              <li>Displaying a prominent notice on our platform</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your continued use of RenoNext after the effective date of the updated policy constitutes your acceptance of the changes. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Officer:
            </p>

            <Card className="p-6 bg-gray-50 border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Privacy Officer</p>
                    <p className="text-gray-600">RenoNext Inc.</p>
                    <p className="text-gray-600">Ontario, Canada</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Email: <a href="mailto:privacy@renonext.com" className="text-blue-600 hover:text-blue-700 underline">privacy@renonext.com</a>
                  </p>
                  <p className="text-sm text-gray-600">
                    General inquiries: Visit our <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact page</Link>
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              This Privacy Policy is effective as of January 15, 2026. We are committed to protecting your privacy and handling your personal information with care and respect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
