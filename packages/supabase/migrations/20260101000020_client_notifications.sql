-- Migration 020: Client Notifications
-- Creates client_notifications table with RLS policies and trigger functions
-- for automatically notifying clients when field reports are published and decisions need action.

-- =============================================================================
-- CLIENT NOTIFICATIONS TABLE
-- =============================================================================

CREATE TABLE client_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info'
    CHECK (severity IN ('info', 'warning', 'alert')),
  disruption_types TEXT[] DEFAULT '{}',
  scheduled_date DATE,
  time_range TEXT,
  action_required BOOLEAN DEFAULT false,
  action_label TEXT,
  action_href TEXT,
  read BOOLEAN DEFAULT false,
  source_type TEXT,  -- 'daily_report', 'decision', 'stage_change', 'system'
  source_id UUID,
  -- Soft delete
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_client_notifications_org ON client_notifications (organization_id);
CREATE INDEX idx_client_notifications_project ON client_notifications (project_id);
CREATE INDEX idx_client_notifications_unread ON client_notifications (project_id, read) WHERE read = false AND deleted_at IS NULL;
CREATE INDEX idx_client_notifications_created_at ON client_notifications (created_at DESC);
CREATE INDEX idx_client_notifications_source ON client_notifications (source_type, source_id) WHERE deleted_at IS NULL;

-- =============================================================================
-- ENABLE RLS ON CLIENT NOTIFICATIONS
-- =============================================================================

ALTER TABLE client_notifications ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES: CLIENT NOTIFICATIONS
-- =============================================================================

-- Clients (project client_id) can SELECT their project's notifications
CREATE POLICY "cn_client_select" ON client_notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = client_notifications.project_id
        AND p.client_id = auth.uid()
        AND client_notifications.deleted_at IS NULL
    )
  );

-- Contractors (project contractor_id) can SELECT project notifications
-- (they may have initiated some notifications)
CREATE POLICY "cn_contractor_select" ON client_notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = client_notifications.project_id
        AND p.contractor_id = auth.uid()
        AND client_notifications.deleted_at IS NULL
    )
  );

-- Clients can UPDATE only the 'read' column to mark as read
CREATE POLICY "cn_client_update_read" ON client_notifications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = client_notifications.project_id
        AND p.client_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = client_notifications.project_id
        AND p.client_id = auth.uid()
    )
  );

-- Service role (and internal triggers) can INSERT and UPDATE
-- Triggered inserts happen via trigger functions (no direct user insert allowed)
-- This is handled at application level with proper authorization

-- =============================================================================
-- HELPER FUNCTION: Create notification with safety checks
-- =============================================================================

CREATE OR REPLACE FUNCTION create_client_notification(
  p_organization_id UUID,
  p_project_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_severity TEXT DEFAULT 'info',
  p_disruption_types TEXT[] DEFAULT '{}',
  p_scheduled_date DATE DEFAULT NULL,
  p_time_range TEXT DEFAULT NULL,
  p_action_required BOOLEAN DEFAULT false,
  p_action_label TEXT DEFAULT NULL,
  p_action_href TEXT DEFAULT NULL,
  p_source_type TEXT DEFAULT NULL,
  p_source_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_notification_id UUID;
BEGIN
  -- Validate organization and project relationship
  IF NOT EXISTS (
    SELECT 1 FROM projects
    WHERE id = p_project_id AND organization_id = p_organization_id
  ) THEN
    RAISE EXCEPTION 'Invalid organization/project relationship';
  END IF;

  -- Validate severity
  IF p_severity NOT IN ('info', 'warning', 'alert') THEN
    RAISE EXCEPTION 'Invalid severity level';
  END IF;

  -- Insert notification
  INSERT INTO client_notifications (
    organization_id,
    project_id,
    title,
    description,
    severity,
    disruption_types,
    scheduled_date,
    time_range,
    action_required,
    action_label,
    action_href,
    source_type,
    source_id
  ) VALUES (
    p_organization_id,
    p_project_id,
    p_title,
    p_description,
    p_severity,
    p_disruption_types,
    p_scheduled_date,
    p_time_range,
    p_action_required,
    p_action_label,
    p_action_href,
    p_source_type,
    p_source_id
  )
  RETURNING id INTO v_notification_id;

  RETURN v_notification_id;
END;
$$;

-- =============================================================================
-- TRIGGER FUNCTION: Notify client on daily report publish
-- =============================================================================

CREATE OR REPLACE FUNCTION notify_client_on_report_publish()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project_org_id UUID;
  v_report_date_formatted TEXT;
BEGIN
  -- Only trigger when is_published changes from false to true
  IF NEW.is_published AND NOT COALESCE(OLD.is_published, false) THEN
    -- Get project's organization_id
    SELECT organization_id INTO v_project_org_id
    FROM projects
    WHERE id = NEW.project_id;

    IF v_project_org_id IS NOT NULL THEN
      -- Format report date for display
      v_report_date_formatted := to_char(NEW.report_date, 'Mon DD, YYYY');

      -- Create notification
      PERFORM create_client_notification(
        p_organization_id := v_project_org_id,
        p_project_id := NEW.project_id,
        p_title := 'Daily Report Published — ' || v_report_date_formatted,
        p_description := COALESCE(
          NEW.client_summary,
          'A new daily report has been published for your project.'
        ),
        p_severity := 'info',
        p_source_type := 'daily_report',
        p_source_id := NEW.id,
        p_scheduled_date := NEW.report_date
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger on daily_reports table
CREATE TRIGGER trigger_notify_on_report_publish
AFTER UPDATE ON daily_reports
FOR EACH ROW
EXECUTE FUNCTION notify_client_on_report_publish();

-- =============================================================================
-- TRIGGER FUNCTION: Notify client on decision action needed
-- =============================================================================

CREATE OR REPLACE FUNCTION notify_client_on_decision_needed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project_org_id UUID;
BEGIN
  -- Only trigger when status is 'pending_client'
  IF NEW.status = 'pending_client' THEN
    -- Get project's organization_id
    SELECT organization_id INTO v_project_org_id
    FROM projects
    WHERE id = NEW.project_id;

    IF v_project_org_id IS NOT NULL THEN
      -- Create notification
      PERFORM create_client_notification(
        p_organization_id := v_project_org_id,
        p_project_id := NEW.project_id,
        p_title := 'Decision Needed: ' || NEW.title,
        p_description := COALESCE(
          NEW.plain_language_summary,
          'A decision is required for your project.'
        ),
        p_severity := 'warning',
        p_action_required := true,
        p_action_label := 'Review Decision',
        p_action_href := '/projects/' || NEW.project_id::TEXT || '/decisions/' || NEW.id::TEXT,
        p_source_type := 'decision',
        p_source_id := NEW.id
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger on decisions table
CREATE TRIGGER trigger_notify_on_decision_needed
AFTER INSERT OR UPDATE ON decisions
FOR EACH ROW
EXECUTE FUNCTION notify_client_on_decision_needed();

-- =============================================================================
-- HELPER FUNCTION: Mark notifications as read
-- =============================================================================

CREATE OR REPLACE FUNCTION mark_notifications_read(
  p_project_id UUID,
  p_notification_ids UUID[] DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Verify user is project client
  IF NOT EXISTS (
    SELECT 1 FROM projects
    WHERE id = p_project_id AND client_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Update read status
  UPDATE client_notifications
  SET read = true, updated_at = now()
  WHERE project_id = p_project_id
    AND read = false
    AND deleted_at IS NULL
    AND (p_notification_ids IS NULL OR id = ANY(p_notification_ids));

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- =============================================================================
-- HELPER FUNCTION: Get unread notification count for project
-- =============================================================================

CREATE OR REPLACE FUNCTION get_unread_count(p_project_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::INTEGER
  FROM client_notifications
  WHERE project_id = p_project_id
    AND read = false
    AND deleted_at IS NULL
    AND EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = p_project_id
        AND p.client_id = auth.uid()
    );
$$;

-- =============================================================================
-- HELPER FUNCTION: Soft delete notification
-- =============================================================================

CREATE OR REPLACE FUNCTION soft_delete_notification(p_notification_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project_id UUID;
BEGIN
  -- Get project and verify user is client
  SELECT project_id INTO v_project_id
  FROM client_notifications
  WHERE id = p_notification_id;

  IF v_project_id IS NULL THEN
    RAISE EXCEPTION 'Notification not found';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM projects
    WHERE id = v_project_id AND client_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Soft delete
  UPDATE client_notifications
  SET deleted_at = now(), deleted_by_id = auth.uid()
  WHERE id = p_notification_id;

  RETURN true;
END;
$$;

-- =============================================================================
-- GRANT PERMISSIONS (for authenticated users and service role)
-- =============================================================================

GRANT SELECT, UPDATE (read) ON client_notifications TO authenticated;
GRANT ALL ON TABLE client_notifications TO service_role;
GRANT ALL ON FUNCTION create_client_notification TO service_role;
GRANT ALL ON FUNCTION notify_client_on_report_publish TO service_role;
GRANT ALL ON FUNCTION notify_client_on_decision_needed TO service_role;
GRANT EXECUTE ON FUNCTION mark_notifications_read TO authenticated;
GRANT EXECUTE ON FUNCTION get_unread_count TO authenticated;
GRANT EXECUTE ON FUNCTION soft_delete_notification TO authenticated;
