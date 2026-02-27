import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

const TRADE_TYPES = [
  'General Contractor',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Roofing',
  'Concrete',
  'Masonry',
  'Painting',
  'Landscaping',
  'Other',
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

export function CreateOrgPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tradeType, setTradeType] = useState(TRADE_TYPES[0]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [authLoading, user, navigate]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugManuallyEdited && name) {
      setSlug(generateSlug(name));
    }
  }, [name, slugManuallyEdited]);

  function validateForm(): string | null {
    if (name.trim().length < 2) {
      return 'Organization name must be at least 2 characters';
    }
    if (!slug || slug.length < 2) {
      return 'Organization slug must be at least 2 characters';
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return 'Slug must contain only lowercase letters, numbers, and hyphens';
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Insert organization
      const { data: org, error: insertError } = await supabase
        .from('organizations')
        .insert({
          name: name.trim(),
          slug: slug.trim(),
          settings: { trade_type: tradeType },
        })
        .select()
        .single();

      if (insertError) throw insertError;
      if (!org) throw new Error('Failed to create organization');

      // Navigate to next step with org ID
      navigate(`/onboarding/invite-team?org=${org.id}`);
    } catch (err) {
      if (err instanceof Error && err.message.includes('duplicate key')) {
        setError('This organization slug is already taken. Please choose another.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to create organization');
      }
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Step indicator */}
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-slate-500">Step 1 of 3</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Create Your Organization
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Set up your company profile to get started with RenoNext Field
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Organization name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Organization Name
                <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="e.g., Acme Construction"
              />
              <p className="mt-1 text-xs text-slate-500">
                The official name of your company
              </p>
            </div>

            {/* Organization slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-slate-700"
              >
                Organization Slug
                <span className="text-red-500">*</span>
              </label>
              <input
                id="slug"
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase());
                  setSlugManuallyEdited(true);
                }}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="e.g., acme-construction"
              />
              <p className="mt-1 text-xs text-slate-500">
                Lowercase letters, numbers, and hyphens only. Used for PIN-based login.
              </p>
            </div>

            {/* Trade type */}
            <div>
              <label
                htmlFor="trade-type"
                className="block text-sm font-medium text-slate-700"
              >
                Primary Trade
              </label>
              <select
                id="trade-type"
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {TRADE_TYPES.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Select the primary type of work your company performs
              </p>
            </div>

            {/* Logo upload placeholder */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Company Logo
                <span className="ml-1 text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <div className="mt-1 flex items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-xs text-slate-500">
                    Logo upload coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
