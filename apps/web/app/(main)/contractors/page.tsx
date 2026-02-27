import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  XCircle,
  MapPin,
  Star,
  Shield,
  Zap,
  Target,
  Award,
  ArrowRight,
  Smartphone,
  BarChart3,
  FileCheck,
  Truck,
} from 'lucide-react';
import {
  ForemanDashboardShowcase,
  AttendanceShowcase,
  ConcreteShowcase,
  JSAFormShowcase,
  CertExpiryShowcase,
} from '@/components/landing/jsa-showcases';

export const metadata: Metadata = {
  title: 'For Contractors',
  description: 'Stop chasing cheques. Get paid in 24 hours. Every time.',
};

export default function ContractorsPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero - Stop chasing cheques */}
      <section className="bg-reno-dark text-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Stop chasing cheques.
              <br />
              <span className="text-reno-green">Get paid in 24 hours.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
              The money is already in the vault before you mobilize.
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Complete the milestone. Proof is auto-generated. Homeowner approves. You get paid tomorrow.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-8 h-8 text-reno-green" />
                </div>
                <div className="text-3xl font-bold mb-1">24hr</div>
                <div className="text-sm text-gray-400">Payouts</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-8 h-8 text-reno-green" />
                </div>
                <div className="text-3xl font-bold mb-1">$0</div>
                <div className="text-sm text-gray-400">Lead Cost</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-reno-green" />
                </div>
                <div className="text-3xl font-bold mb-1">60%</div>
                <div className="text-sm text-gray-400">Close Rate</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-reno-green" />
                </div>
                <div className="text-3xl font-bold mb-1">3 Max</div>
                <div className="text-sm text-gray-400">Bidders</div>
              </div>
            </div>

            <Link
              href="/how-it-works#vault"
              className="inline-flex items-center text-reno-green hover:text-reno-green font-semibold text-lg transition-colors"
            >
              Learn how the vault works
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Run your site in one app */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-reno-dark mb-6">
              Run your site in one app.
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              GPS attendance, JSA forms, concrete tracking, progress photos, deficiency logs, drawing review.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              All in one system. Replaces <span className="font-semibold text-reno-dark">$400/mo</span> of tools.
            </p>
            <p className="text-lg text-gray-600 italic border-l-4 border-reno-green pl-6 py-2 max-w-2xl mx-auto">
              "You use it for your own operations. The proof for the homeowner is a byproduct."
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Before */}
            <div className="bg-reno-red-light rounded-2xl p-8 border-2 border-reno-red/20">
              <div className="flex items-center mb-6">
                <XCircle className="w-8 h-8 text-reno-red mr-3" />
                <h3 className="font-display text-2xl font-bold text-reno-dark">Before</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">6 different tools</span> that don't talk to each other
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">$400/month</span> in subscriptions
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">12 hours/week</span> on admin work
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Manual photo uploads and reports</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Chasing clients for payment approval</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-reno-green-light rounded-2xl p-8 border-2 border-reno-green shadow-lg">
              <div className="flex items-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-reno-green mr-3" />
                <h3 className="font-display text-2xl font-bold text-reno-dark">After</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">1 unified app</span> for all field operations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">$0/month</span> for the field app
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">2 hours/week</span> on admin work
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Automatic proof generation with GPS tagging</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-reno-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Instant approval triggers 24hr payout</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Showcases from the real system */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-reno-green uppercase tracking-wider">
                What you'll actually use
              </p>
              <h3 className="font-display text-3xl font-bold text-reno-dark mt-2">
                Built for the field. Not the office.
              </h3>
            </div>

            {/* Row 1: Foreman Dashboard + Text */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                {/* TODO: Re-enable when showcase is built */}
                {/* <ForemanDashboardShowcase /> */}
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-12 text-center">
                  <p className="text-gray-500">Foreman Dashboard Showcase (Coming Soon)</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-reno-green-50 p-3 rounded-lg shrink-0">
                    <Smartphone className="w-6 h-6 text-reno-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      One dashboard for everything
                    </h4>
                    <p className="text-gray-700">
                      GPS attendance, JSA forms, progress photos, concrete tracking, deficiency logs.
                      All the data you need, none of the friction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-reno-teal-50 p-3 rounded-lg shrink-0">
                    <BarChart3 className="w-6 h-6 text-reno-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      Real-time visibility
                    </h4>
                    <p className="text-gray-700">
                      See which crews are on site, track progress by area, monitor material deliveries,
                      and catch cert expirations before they become problems.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-reno-purple-50 p-3 rounded-lg shrink-0">
                    <FileCheck className="w-6 h-6 text-reno-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      Proof is automatic
                    </h4>
                    <p className="text-gray-700">
                      Every action generates timestamped, GPS-tagged proof. When the milestone completes,
                      the homeowner sees exactly what you did.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Text + Attendance */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 lg:order-1 order-2">
                <div className="flex items-start gap-4">
                  <div className="bg-reno-green-50 p-3 rounded-lg shrink-0">
                    <MapPin className="w-6 h-6 text-reno-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      GPS-verified attendance
                    </h4>
                    <p className="text-gray-700">
                      Workers clock in from their phones. GPS confirms they're on site.
                      No more paper timesheets or manual roll calls.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-reno-amber-50 p-3 rounded-lg shrink-0">
                    <Clock className="w-6 h-6 text-reno-amber" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      Save hours every week
                    </h4>
                    <p className="text-gray-700">
                      Stop chasing workers for timesheets. Stop manually tracking who's on site.
                      The system does it automatically.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:order-2 order-1">
                {/* TODO: Re-enable when showcase is built */}
                {/* <AttendanceShowcase /> */}
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-12 text-center">
                  <p className="text-gray-500">Attendance Showcase (Coming Soon)</p>
                </div>
              </div>
            </div>

            {/* Row 3: Concrete + Text */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* TODO: Re-enable when showcase is built */}
                {/* <ConcreteShowcase /> */}
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-12 text-center">
                  <p className="text-gray-500">Concrete Showcase (Coming Soon)</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                    <Truck className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      Track material deliveries
                    </h4>
                    <p className="text-gray-700">
                      Concrete, rebar, lumber — see what's coming, when it arrives, and where it's going.
                      All crews see the same schedule.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-reno-green-50 p-3 rounded-lg shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-reno-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-reno-dark mb-2">
                      Document quality control
                    </h4>
                    <p className="text-gray-700">
                      Slump tests, air content, pour temps — capture the data that protects you
                      when the inspector shows up or the client complains.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Build verified reputation */}
      <section className="bg-reno-cream py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-reno-dark mb-6">
              Build verified reputation.
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              Portfolio builds itself from every completed project.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              GPS-tagged photos, ratings linked to milestones, inspection pass rates.
            </p>
            <div className="bg-reno-green/10 border-l-4 border-reno-green p-6 max-w-3xl mx-auto rounded-r-lg">
              <p className="text-lg text-gray-700 italic">
                "When a client blames you 3 years later, you have GPS-tagged proof of exactly what you did."
              </p>
            </div>
          </div>

          {/* Verified Portfolio Stats Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div>
                <h3 className="font-display text-2xl font-bold text-reno-dark mb-1">
                  Verified Portfolio
                </h3>
                <p className="text-gray-600">All data is cryptographically verified</p>
              </div>
              <Shield className="w-12 h-12 text-reno-green" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-reno-green-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-reno-green" />
                </div>
                <div className="text-3xl font-bold text-reno-dark mb-1">30</div>
                <div className="text-sm text-gray-600">Completed Projects</div>
              </div>

              <div className="text-center">
                <div className="bg-reno-amber-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-reno-amber" />
                </div>
                <div className="text-3xl font-bold text-reno-dark mb-1">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>

              <div className="text-center">
                <div className="bg-reno-teal-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-reno-teal" />
                </div>
                <div className="text-3xl font-bold text-reno-dark mb-1">100%</div>
                <div className="text-sm text-gray-600">On Time</div>
              </div>

              <div className="text-center">
                <div className="bg-reno-purple-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-reno-purple" />
                </div>
                <div className="text-3xl font-bold text-reno-dark mb-1">0</div>
                <div className="text-sm text-gray-600">Disputes</div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/how-it-works#pros"
                className="inline-flex items-center text-reno-green hover:text-reno-green-dark font-semibold transition-colors"
              >
                See how verification works
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Safety & Compliance Showcases */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-reno-green uppercase tracking-wider">
                Safety & Compliance
              </p>
              <h3 className="font-display text-3xl font-bold text-reno-dark mt-2">
                Stay compliant. Protect your crew. Build proof.
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* TODO: Re-enable when showcases are built */}
              {/* <JSAFormShowcase /> */}
              <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-12 text-center">
                <p className="text-gray-500">JSA Form Showcase (Coming Soon)</p>
              </div>
              {/* <CertExpiryShowcase /> */}
              <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-12 text-center">
                <p className="text-gray-500">Cert Expiry Showcase (Coming Soon)</p>
              </div>
            </div>

            <div className="mt-12 bg-reno-green/10 border-l-4 border-reno-green p-6 rounded-r-lg">
              <p className="text-lg text-gray-700 italic text-center">
                "When a client blames you 3 years later, you have GPS-tagged proof of exactly what you did,
                which crew was on site, and what hazards you controlled for."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Get invited to work - Dark CTA Section */}
      <section className="bg-reno-dark text-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Get invited to work.
              <br />
              <span className="text-reno-green">Not cold leads.</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-300 mb-8">
              <p>Homeowner posts project → BOQ is pre-calculated → 3 matched contractors get pinged</p>
              <p>Bid in 20 minutes, not 15 hours → Vault-secured funds → 60% close rate</p>
            </div>
            <div className="bg-reno-green/10 border-l-4 border-reno-green p-6 max-w-3xl mx-auto rounded-r-lg mb-12">
              <p className="text-xl font-semibold">
                No lead fees. No subscription. 3% only when you get paid.
              </p>
            </div>
            <p className="text-lg text-gray-400">
              Application-based, merit-based network
            </p>
          </div>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Shield className="w-10 h-10 text-reno-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Vault-Protected</h3>
              <p className="text-gray-400">Money is secured before you start work</p>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Zap className="w-10 h-10 text-reno-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">24hr Payouts</h3>
              <p className="text-gray-400">Get paid tomorrow, every time</p>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Target className="w-10 h-10 text-reno-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Top 20% Network</h3>
              <p className="text-gray-400">Only proven contractors are accepted</p>
            </div>
          </div>

          {/* Big CTA */}
          <div className="text-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center px-12 py-5 bg-reno-green hover:bg-reno-green-dark text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply for Network Access
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <p className="mt-6 text-gray-400">
              Applications reviewed within 48 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
