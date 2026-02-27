import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'foreman', label: 'Foreman' },
  { value: 'worker', label: 'Worker' },
];

interface InviteRow {
  id: string;
  email: string;
  role: string;
}

export function InviteTeamPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('org');

  const [rows, setRows] = useState<InviteRow[]>([
    { id: crypto.randomUUID(), email: '', role: 'worker' },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated or missing org ID
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true });
    } else if (!authLoading && !orgId) {
      navigate('/onboarding/create-org', { replace: true });
    }
  }, [authLoading, user, orgId, navigate]);

  function addRow() {
    setRows([...rows, { id: crypto.randomUUID(), email: '', role: 'worker' }]);
  }

  function removeRow(id: string) {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  }

  function updateRow(id: string, field: 'email' | 'role', value: string) {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId) return;
    setError(null);
    setLoading(true);

    try {
      // Filter out empty email rows
      const validInvites = rows.filter((row) => row.email.trim() !== '');

      if (validInvites.length > 0) {
        // Validate emails
        for (const invite of validInvites) {
          if (!invite.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error(`Invalid email: ${invite.email}`);
          }
        }

        // Store pending invites in organization settings
        // (We'll implement actual invite flow later)
        const pendingInvites = validInvites.map((row) => ({
          email: row.email.trim(),
          role: row.role,
          invited_at: new Date().toISOString(),
        }));

        const { error: updateError } = await supabase
          .from('organizations')
          .update({
            settings: { pending_invites: pendingInvites },
            updated_at: new Date().toISOString(),
          })
          .eq('id', orgId);

        if (updateError) throw updateError;
      }

      // Navigate to billing step
      navigate(`/onboarding/billing?org=${orgId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save invites');
    } finally {
      setLoading(false);
    }
  }

  function handleSkip() {
    if (orgId) {
      navigate(`/onboarding/billing?org=${orgId}`);
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
      <div className="w-full max-w-2xl">
        {/* Step indicator */}
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-slate-500">Step 2 of 3</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Invite Your Team
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Add team members to collaborate on field operations
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

            {/* Info message */}
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    You can skip this step and invite team members later from your dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Invite rows */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Team Members
              </label>
              {rows.map((row, index) => (
                <div key={row.id} className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={row.email}
                      onChange={(e) => updateRow(row.id, 'email', e.target.value)}
                      className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={row.role}
                      onChange={(e) => updateRow(row.id, 'role', e.target.value)}
                      className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      {ROLE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Add another button */}
              <button
                type="button"
                onClick={addRow}
                className="flex items-center gap-2 rounded-md border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add another
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleSkip}
                className="rounded-md border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
