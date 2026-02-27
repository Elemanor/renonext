-- Migration 022: Crew Sign-Off Enhancements
-- Adds signature_type and signer_role columns to safety_form_signatures
-- to support batch crew sign-off feature

-- Add signature_type column to distinguish between supervisor and crew signatures
ALTER TABLE safety_form_signatures
  ADD COLUMN IF NOT EXISTS signature_type TEXT DEFAULT 'supervisor'
    CHECK (signature_type IN ('supervisor', 'crew', 'safety_rep', 'other'));

-- Add signer_role column to store crew member's trade/role
ALTER TABLE safety_form_signatures
  ADD COLUMN IF NOT EXISTS signer_role TEXT;

-- Create index for filtering by signature type
CREATE INDEX IF NOT EXISTS idx_safety_form_sigs_type
  ON safety_form_signatures (form_id, signature_type);

-- Add comment for documentation
COMMENT ON COLUMN safety_form_signatures.signature_type IS
  'Type of signature: supervisor (form supervisor), crew (crew member), safety_rep (safety representative), or other';

COMMENT ON COLUMN safety_form_signatures.signer_role IS
  'Role or trade of the signer (e.g., Electrician, Carpenter, Foreman)';
