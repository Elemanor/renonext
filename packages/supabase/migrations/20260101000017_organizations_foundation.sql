-- Migration 017: Organizations + Multi-Tenancy Foundation
-- Adds organization/tenant model and links to existing projects table.

-- =============================================================================
-- ORGANIZATIONS
-- =============================================================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free'
    CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_organizations_slug ON organizations (slug);
CREATE INDEX idx_organizations_stripe_customer ON organizations (stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;

-- =============================================================================
-- ORGANIZATION MEMBERS
-- =============================================================================

CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'worker'
    CHECK (role IN ('owner', 'admin', 'supervisor', 'foreman', 'worker')),
  pin TEXT,
  display_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_org ON organization_members (organization_id);
CREATE INDEX idx_org_members_user ON organization_members (user_id);
CREATE INDEX idx_org_members_active ON organization_members (organization_id, is_active) WHERE is_active = true;

-- =============================================================================
-- LINK PROJECTS TO ORGANIZATIONS
-- =============================================================================

ALTER TABLE projects ADD COLUMN organization_id UUID REFERENCES organizations(id);
CREATE INDEX idx_projects_org ON projects (organization_id) WHERE organization_id IS NOT NULL;

-- =============================================================================
-- HELPER FUNCTION: Get user's organization id
-- =============================================================================

CREATE OR REPLACE FUNCTION get_user_org_id(p_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id
  FROM organization_members
  WHERE user_id = p_user_id
    AND is_active = true
  LIMIT 1;
$$;

-- =============================================================================
-- HELPER FUNCTION: Get user's role within their organization
-- =============================================================================

CREATE OR REPLACE FUNCTION get_user_org_role(p_user_id UUID, p_org_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM organization_members
  WHERE user_id = p_user_id
    AND organization_id = p_org_id
    AND is_active = true
  LIMIT 1;
$$;

-- =============================================================================
-- HELPER FUNCTION: Check if user is supervisor or above
-- =============================================================================

CREATE OR REPLACE FUNCTION is_org_supervisor_or_above(p_user_id UUID, p_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM organization_members
    WHERE user_id = p_user_id
      AND organization_id = p_org_id
      AND is_active = true
      AND role IN ('owner', 'admin', 'supervisor')
  );
$$;

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION update_organizations_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_organizations_updated_at();

-- =============================================================================
-- RLS ON ORGANIZATIONS
-- =============================================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Organizations: members can see their org
CREATE POLICY "org_members_can_view_org"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Organizations: only owner/admin can update
CREATE POLICY "org_admin_can_update_org"
  ON organizations FOR UPDATE
  USING (
    is_org_supervisor_or_above(auth.uid(), id)
  )
  WITH CHECK (
    is_org_supervisor_or_above(auth.uid(), id)
  );

-- Organization members: members can see other members in same org
CREATE POLICY "org_members_can_view_members"
  ON organization_members FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Organization members: only owner/admin can insert (invite)
CREATE POLICY "org_admin_can_invite_members"
  ON organization_members FOR INSERT
  WITH CHECK (
    is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- Organization members: only owner/admin can update roles
CREATE POLICY "org_admin_can_update_members"
  ON organization_members FOR UPDATE
  USING (
    is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- Organization members: only owner can remove members
CREATE POLICY "org_owner_can_delete_members"
  ON organization_members FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.user_id = auth.uid()
        AND om.organization_id = organization_members.organization_id
        AND om.is_active = true
        AND om.role = 'owner'
    )
  );

-- Allow authenticated users to create organizations (they become owner)
CREATE POLICY "authenticated_can_create_org"
  ON organizations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- AUTO-CREATE OWNER MEMBER ON ORG CREATION
-- =============================================================================

CREATE OR REPLACE FUNCTION handle_new_organization()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO organization_members (organization_id, user_id, role, accepted_at)
  VALUES (NEW.id, auth.uid(), 'owner', now());
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_auto_create_org_owner
  AFTER INSERT ON organizations
  FOR EACH ROW EXECUTE FUNCTION handle_new_organization();
