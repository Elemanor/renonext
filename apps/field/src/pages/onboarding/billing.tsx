import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 3 workers',
      'Basic JSA forms',
      'Attendance tracking',
      'Mobile app access',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$50',
    period: '/seat/mo',
    description: 'Everything you need for growing teams',
    features: [
      'Unlimited workers',
      'Advanced JSA templates',
      'Daily reports & RFIs',
      'Work area management',
      'Concrete tracking',
      'Priority support',
      'Export & analytics',
    ],
    cta: 'Subscribe',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Advanced features for large organizations',
    features: [
      'Everything in Pro',
      'Single Sign-On (SSO)',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Custom training',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function BillingPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('org');

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated or missing org ID
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true });
    } else if (!authLoading && !orgId) {
      navigate('/onboarding/create-org', { replace: true });
    }
  }, [authLoading, user, orgId, navigate]);

  async function handlePlanSelect(planId: string) {
    if (!orgId) return;
    setError(null);
    setSelectedPlan(planId);
    setLoading(true);

    try {
      if (planId === 'free') {
        // Update organization with free tier
        const { error: updateError } = await supabase
          .from('organizations')
          .update({
            subscription_tier: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('id', orgId);

        if (updateError) throw updateError;

        // Navigate to dashboard
        navigate('/', { replace: true });
      } else if (planId === 'pro') {
        // TODO: Implement Stripe checkout flow
        setError('Pro plan coming soon! For now, you can continue with the Free plan.');
        setSelectedPlan(null);
      } else if (planId === 'enterprise') {
        // Open email client
        window.location.href = 'mailto:sales@renonext.com?subject=Enterprise Plan Inquiry';
        setSelectedPlan(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select plan');
      setSelectedPlan(null);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || !orgId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Step indicator */}
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-slate-500">Step 3 of 3</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Choose Your Plan
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Select the plan that best fits your team's needs
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                plan.popular
                  ? 'border-primary-500 ring-2 ring-primary-500'
                  : 'border-slate-200'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-slate-500">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features list */}
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
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
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <button
                onClick={() => handlePlanSelect(plan.id)}
                disabled={loading && selectedPlan === plan.id}
                className={`w-full rounded-md px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-primary-500'
                }`}
              >
                {loading && selectedPlan === plan.id ? 'Processing...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-500">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
