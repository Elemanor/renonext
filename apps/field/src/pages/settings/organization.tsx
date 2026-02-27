import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import type { Organization, OrganizationMember, OrganizationRole } from '@renonext/shared/types/field';
import type { Profile } from '@renonext/shared/types/user';

interface MemberWithProfile extends OrganizationMember {
  user?: Profile;
}

const ROLE_HIERARCHY: OrganizationRole[] = ['owner', 'admin', 'supervisor', 'foreman', 'worker'];

export function OrganizationSettingsPage() {
  const { user, membership } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<MemberWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrganizationRole>('worker');
  const [orgName, setOrgName] = useState('');

  const isOwnerOrAdmin = membership?.role === 'owner' || membership?.role === 'admin';
  const isOwner = membership?.role === 'owner';

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
      setOrgName(data.name);
    } catch (err) {
      console.error('Failed to fetch organization:', err);
    } finally {
      setLoading(false);
    }
  }, [membership?.organization_id]);

  const fetchMembers = useCallback(async () => {
    if (!membership?.organization_id) return;
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select('*, user:profiles(*)')
        .eq('organization_id', membership.organization_id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMembers((data as MemberWithProfile[]) ?? []);
    } catch (err) {
      console.error('Failed to fetch members:', err);
    }
  }, [membership?.organization_id]);

  useEffect(() => {
    fetchOrganization();
    fetchMembers();
  }, [fetchOrganization, fetchMembers]);

  async function handleSaveOrganization() {
    if (!organization?.id || !orgName.trim()) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('organizations')
        .update({ name: orgName.trim(), updated_at: new Date().toISOString() })
        .eq('id', organization.id);

      if (error) throw error;
      await fetchOrganization();
    } catch (err) {
      console.error('Failed to update organization:', err);
    } finally {
      setSaving(false);
    }
  }

  async function handleRoleChange(memberId: string, newRole: OrganizationRole) {
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ role: newRole })
        .eq('id', memberId);

      if (error) throw error;
      await fetchMembers();
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  }

  async function handleToggleActive(memberId: string, currentActive: boolean) {
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ is_active: !currentActive })
        .eq('id', memberId);

      if (error) throw error;
      await fetchMembers();
    } catch (err) {
      console.error('Failed to toggle active status:', err);
    }
  }

  async function handleInviteMember() {
    if (!organization?.id || !inviteEmail.trim()) return;
    setSaving(true);
    try {
      // For now, store in organization settings.pending_invites
      const currentSettings = organization.settings || {};
      const pendingInvites = Array.isArray(currentSettings.pending_invites)
        ? currentSettings.pending_invites
        : [];

      pendingInvites.push({
        email: inviteEmail.trim(),
        role: inviteRole,
        invited_at: new Date().toISOString(),
      });

      const { error } = await supabase
        .from('organizations')
        .update({
          settings: { ...currentSettings, pending_invites: pendingInvites },
          updated_at: new Date().toISOString(),
        })
        .eq('id', organization.id);

      if (error) throw error;
      setInviteEmail('');
      setInviteRole('worker');
      setShowInviteForm(false);
      await fetchOrganization();
    } catch (err) {
      console.error('Failed to invite member:', err);
    } finally {
      setSaving(false);
    }
  }

  function canChangeRole(memberRole: OrganizationRole): boolean {
    if (!membership?.role) return false;
    if (membership.role === 'owner') return true;
    if (membership.role === 'admin') {
      return ['supervisor', 'foreman', 'worker'].includes(memberRole);
    }
    return false;
  }

  function getAvailableRoles(memberRole: OrganizationRole): OrganizationRole[] {
    if (!membership?.role) return [];
    if (membership.role === 'owner') return ROLE_HIERARCHY;
    if (membership.role === 'admin') {
      return ROLE_HIERARCHY.filter(r => !['owner', 'admin'].includes(r));
    }
    return [];
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-slate-400">Loading organization settings...</p>
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

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Organization Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your organization profile and team members
        </p>
      </div>

      {/* Section A: Organization Profile */}
      {isOwnerOrAdmin && (
        <div className="mt-6 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Organization Profile</h2>
          <p className="mt-1 text-sm text-slate-500">
            Update your organization's basic information
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Organization Slug
              </label>
              <input
                type="text"
                value={organization.slug}
                readOnly
                className="mt-1 block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                Used for PIN-based login and team identification
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Logo
              </label>
              <div className="mt-2 flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
                {organization.logo_url ? (
                  <img
                    src={organization.logo_url}
                    alt="Organization logo"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo</span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400">Logo upload coming soon</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveOrganization}
                disabled={saving || orgName === organization.name}
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section B: Team Members */}
      {isOwnerOrAdmin && (
        <div className="mt-6 rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage roles and access for your team
              </p>
            </div>
            <button
              onClick={() => setShowInviteForm(!showInviteForm)}
              className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              {showInviteForm ? 'Cancel' : 'Invite Member'}
            </button>
          </div>

          {/* Invite Form */}
          {showInviteForm && (
            <div className="mt-4 rounded-md border border-primary-200 bg-primary-50 p-4">
              <p className="text-sm font-medium text-slate-900">Invite New Member</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="member@example.com"
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as OrganizationRole)}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {getAvailableRoles('worker').map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleInviteMember}
                  disabled={saving || !inviteEmail.trim()}
                  className="rounded-md bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  {saving ? 'Sending...' : 'Send Invite'}
                </button>
              </div>
            </div>
          )}

          {/* Members Table */}
          <div className="mt-4 overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {members.map((member) => {
                  const isSelf = member.user_id === user?.id;
                  const displayName = member.display_name || member.user?.email || 'Unknown';

                  return (
                    <tr key={member.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {displayName}
                        {isSelf && (
                          <span className="ml-2 text-xs text-slate-400">(You)</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {canChangeRole(member.role) && !isSelf ? (
                          <select
                            value={member.role}
                            onChange={(e) =>
                              handleRoleChange(member.id, e.target.value as OrganizationRole)
                            }
                            className="rounded border border-slate-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          >
                            {getAvailableRoles(member.role).map((role) => (
                              <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {member.is_active ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {!isSelf && (
                          <button
                            onClick={() => handleToggleActive(member.id, member.is_active)}
                            className="text-xs font-medium text-primary-600 hover:text-primary-700"
                          >
                            {member.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isOwnerOrAdmin && (
        <div className="mt-6 rounded-lg border bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Only organization owners and admins can manage settings
          </p>
        </div>
      )}
    </div>
  );
}
