-- =============================================================================
-- Migration 010: v1 Patch — constraint enforcement, auto-seed, indexes, docs
-- =============================================================================
-- Fixes applied to 006_project_management.sql (already deployed):
--   A) pgcrypto extension explicit
--   B) task_gates bypass + satisfied invariants
--   C) project_members auto-seed on project creation
--   D) Missing composite indexes for v1 UI performance
--   E) project_documents table (15th v1 table)
-- =============================================================================

-- A) Ensure pgcrypto is available (gen_random_uuid() depends on it in some PG builds)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================================================
-- B) Enforce bypass invariants on task_gates
-- =========================================================================

-- If status is 'bypassed', ALL bypass fields must be filled + acknowledged
ALTER TABLE task_gates
ADD CONSTRAINT task_gates_bypass_invariants CHECK (
  (status <> 'bypassed' AND bypassed = FALSE)
  OR
  (status = 'bypassed'
    AND bypassed = TRUE
    AND bypass_liability_acknowledgment = TRUE
    AND bypassed_at IS NOT NULL
    AND bypassed_by_id IS NOT NULL
    AND bypass_reason IS NOT NULL AND length(trim(bypass_reason)) > 0
  )
);

-- If status is 'satisfied', satisfied_at must be set
ALTER TABLE task_gates
ADD CONSTRAINT task_gates_satisfied_invariants CHECK (
  status <> 'satisfied'
  OR (satisfied_at IS NOT NULL)
);

-- =========================================================================
-- C) Auto-seed project_members on project creation
-- =========================================================================

-- Replace the old counters-only trigger with one that seeds counters + members
CREATE OR REPLACE FUNCTION projects_after_insert_seed()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-create counters
  INSERT INTO project_counters (project_id) VALUES (NEW.id);

  -- Auto-create membership for client + contractor
  INSERT INTO project_members (project_id, user_id, role, accepted_at)
  VALUES
    (NEW.id, NEW.client_id, 'client', NOW()),
    (NEW.id, NEW.contractor_id, 'contractor', NOW())
  ON CONFLICT (project_id, user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop old trigger, create new one
DROP TRIGGER IF EXISTS projects_create_counters ON projects;

CREATE TRIGGER projects_after_insert_seed_trigger
  AFTER INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION projects_after_insert_seed();

-- =========================================================================
-- D) High-value composite indexes for v1 UI
-- =========================================================================

CREATE INDEX idx_project_tasks_project_status
  ON project_tasks(project_id, status)
  WHERE deleted_at IS NULL;

CREATE INDEX idx_task_gates_task_status
  ON task_gates(task_id, status);

CREATE INDEX idx_decisions_project_status
  ON decisions(project_id, status)
  WHERE deleted_at IS NULL;

-- =========================================================================
-- E) project_documents — unified document bucket (15th v1 table)
-- =========================================================================

CREATE TABLE project_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by_id UUID NOT NULL REFERENCES profiles(id),
  document_type TEXT NOT NULL CHECK (document_type IN (
    'proposal', 'contract', 'permit', 'drawing', 'photo',
    'inspection_report', 'invoice', 'receipt', 'warranty',
    'closeout_package', 'lien_waiver', 'insurance', 'other'
  )),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type TEXT,
  version INT NOT NULL DEFAULT 1,
  replaces_id UUID REFERENCES project_documents(id) ON DELETE SET NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',

  -- Warranty tracking (Jackson Ch 5)
  warranty_metadata JSONB DEFAULT NULL,
  -- {manufacturer, product, coverage_years, start_date, expiry_date,
  --  conditions, subcontractor_company}

  -- Visibility
  visibility TEXT NOT NULL DEFAULT 'project_team' CHECK (
    visibility IN ('project_team', 'client_visible', 'contractor_only', 'admin_only')
  ),

  -- Soft delete
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER project_documents_updated_at
  BEFORE UPDATE ON project_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_project_documents_project
  ON project_documents(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_documents_type
  ON project_documents(project_id, document_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_documents_uploaded_by
  ON project_documents(uploaded_by_id) WHERE deleted_at IS NULL;

-- RLS for project_documents (same pattern as other project tables)
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY project_documents_select ON project_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = project_documents.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = TRUE
    )
  );

CREATE POLICY project_documents_insert ON project_documents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = project_documents.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = TRUE
    )
  );

CREATE POLICY project_documents_update ON project_documents
  FOR UPDATE USING (
    uploaded_by_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = project_documents.project_id
        AND pm.user_id = auth.uid()
        AND pm.role IN ('contractor', 'admin')
        AND pm.is_active = TRUE
    )
  );

CREATE POLICY project_documents_delete ON project_documents
  FOR DELETE USING (
    uploaded_by_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = project_documents.project_id
        AND pm.user_id = auth.uid()
        AND pm.role IN ('contractor', 'admin')
        AND pm.is_active = TRUE
    )
  );
