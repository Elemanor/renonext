import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import type { Organization, SubscriptionTier } from '@renonext/shared/types/field';

interface PlanDetails {
  tier: SubscriptionTier;
  name: string;
  description: string;
  monthlyPrice: number;
  features: string[];
}

const PLANS: PlanDetails[] = [
  {
    tier: 'free',
    name: 'Free',
    description: 'For small teams getting started',
    monthlyPrice: 0,
    features: [
      'Up to 5 team members',
      'Basic safety forms',
      'Limited work area tracking',
      'Community support',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    description: 'For growing construction teams',
    monthlyPrice: 99,
    features: [
      'Up to 25 team members',
      'Unlimited safety forms',
      'Full work area tracking',
      'RFIs and material requests',
      'Concrete tracking',
      'Priority support',
    ],
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 299,
    features: [
      'Unlimited team members',
      'All Pro features',
      'Advanced scheduling (CPM)',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
    ],
  },
];

export function BillingSettingsPage() {
  const { membership } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberCount, setMemberCount] = useState(0);

  const isOwnerOrAdmin = membership?.role === 'owner' || membership?.role === 'admin';

  const fetchOrganization = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', membership.organization_id)
        .single();

      if (error) throw error;
      setOrganization(data as Organization);
    } catch (err) {
      console.error('Failed to fetch organization:', err);
    } finally {
      setLoading(false);
    }
  }, [membership?.organization_id]);

  const fetchMemberCount = useCallback(async () => {
    if (!membership?.organization_id) return;
    try {
      const { count, error } = await supabase
        .from('organization_members')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', membership.organization_id)
        .eq('is_active', true);

      if (error) throw error;
      setMemberCount(count ?? 0);
    } catch (err) {
      console.error('Failed to fetch member count:', err);
    }
  }, [membership?.organization_id]);

  useEffect(() => {
    fetchOrganization();
    fetchMemberCount();
  }, [fetchOrganization, fetchMemberCount]);

  function handlePlanChange(tier: SubscriptionTier) {
    // Coming soon toast
    alert(`Plan change to ${tier} is coming soon!`);
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(amount);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-slate-400">Loading billing settings...</p>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-400">Organization not found</p>
      </div>
    );
  }

  if (!isOwnerOrAdmin) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Subscription and usage information
        </p>
        <div className="mt-6 rounded-lg border bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Only organization owners and admins can manage billing
          </p>
        </div>
      </div>
    );
  }

  const currentPlan = PLANS.find((p) => p.tier === organization.subscription_tier);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your subscription and view usage
        </p>
      </div>

      {/* Current Plan Display */}
      <div className="mt-6 rounded-lg border bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Current Plan</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your organization is on the {currentPlan?.name} plan
            </p>
          </div>
          {currentPlan && (
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(currentPlan.monthlyPrice)}
              </p>
              <p className="text-sm text-slate-500">/month</p>
            </div>
          )}
        </div>

        {organization.stripe_subscription_id && (
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              <span className="font-medium">Subscription ID:</span>{' '}
              {organization.stripe_subscription_id}
            </p>
          </div>
        )}
      </div>

      {/* Usage Stats */}
      <div className="mt-6 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Usage This Month</h2>
        <p className="mt-1 text-sm text-slate-500">Track your plan limits and usage</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-500">Team Members</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{memberCount}</p>
            <p className="mt-1 text-xs text-slate-400">
              {currentPlan?.tier === 'free'
                ? 'Max 5 on Free plan'
                : currentPlan?.tier === 'pro'
                  ? 'Max 25 on Pro plan'
                  : 'Unlimited on Enterprise'}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-500">Forms This Month</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">--</p>
            <p className="mt-1 text-xs text-slate-400">Coming soon</p>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="mt-6 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Available Plans</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upgrade or downgrade your subscription
        </p>

        <div className="mt-4 space-y-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.tier === organization.subscription_tier;
            const isUpgrade =
              PLANS.findIndex((p) => p.tier === plan.tier) >
              PLANS.findIndex((p) => p.tier === organization.subscription_tier);

            return (
              <div
                key={plan.tier}
                className={`flex items-start justify-between rounded-lg border p-4 ${
                  isCurrent ? 'border-primary-500 bg-primary-50' : 'bg-white'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                    {isCurrent && (
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                        Current Plan
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                  <div className="mt-2 text-lg font-bold text-slate-900">
                    {formatCurrency(plan.monthlyPrice)}
                    <span className="text-sm font-normal text-slate-500">/month</span>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <svg
                          className="mr-2 h-4 w-4 flex-shrink-0 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ml-4">
                  {isCurrent ? (
                    <div className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500">
                      Active
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePlanChange(plan.tier)}
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                    >
                      {isUpgrade ? 'Upgrade' : 'Downgrade'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-6 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Billing History</h2>
        <p className="mt-1 text-sm text-slate-500">View past invoices and payments</p>

        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-400">
            Billing history will appear here once your first payment is processed
          </p>
        </div>
      </div>
    </div>
  );
}
