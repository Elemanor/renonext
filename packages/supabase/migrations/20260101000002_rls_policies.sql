-- =============================================================================
-- Enable Row Level Security on all tables
-- =============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pro_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pro_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pro_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- profiles: public read, owner update
-- =============================================================================
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- =============================================================================
-- pro_profiles: public read, owner update/insert
-- =============================================================================
CREATE POLICY "pro_profiles_select_public"
  ON pro_profiles FOR SELECT
  USING (true);

CREATE POLICY "pro_profiles_insert_own"
  ON pro_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "pro_profiles_update_own"
  ON pro_profiles FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =============================================================================
-- client_profiles: owner read/update/insert
-- =============================================================================
CREATE POLICY "client_profiles_select_own"
  ON client_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "client_profiles_insert_own"
  ON client_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "client_profiles_update_own"
  ON client_profiles FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =============================================================================
-- categories: public read
-- =============================================================================
CREATE POLICY "categories_select_public"
  ON categories FOR SELECT
  USING (true);

-- =============================================================================
-- pro_categories: public read, pro manages own
-- =============================================================================
CREATE POLICY "pro_categories_select_public"
  ON pro_categories FOR SELECT
  USING (true);

CREATE POLICY "pro_categories_insert_own"
  ON pro_categories FOR INSERT
  WITH CHECK (
    pro_profile_id IN (
      SELECT id FROM pro_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "pro_categories_delete_own"
  ON pro_categories FOR DELETE
  USING (
    pro_profile_id IN (
      SELECT id FROM pro_profiles WHERE user_id = auth.uid()
    )
  );

-- =============================================================================
-- jobs: visible if public status OR client OR assigned pro; client creates/updates own
-- =============================================================================
CREATE POLICY "jobs_select_visible"
  ON jobs FOR SELECT
  USING (
    status IN ('posted', 'bidding', 'assigned', 'in_progress', 'completed')
    OR client_id = auth.uid()
    OR assigned_pro_id = auth.uid()
  );

CREATE POLICY "jobs_insert_client"
  ON jobs FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "jobs_update_own"
  ON jobs FOR UPDATE
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- =============================================================================
-- job_bids: visible to pro_id or job owner; pros create own
-- =============================================================================
CREATE POLICY "job_bids_select_relevant"
  ON job_bids FOR SELECT
  USING (
    pro_id = auth.uid()
    OR job_id IN (
      SELECT id FROM jobs WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "job_bids_insert_pro"
  ON job_bids FOR INSERT
  WITH CHECK (pro_id = auth.uid());

CREATE POLICY "job_bids_update_own"
  ON job_bids FOR UPDATE
  USING (pro_id = auth.uid())
  WITH CHECK (pro_id = auth.uid());

-- =============================================================================
-- job_progress: public if is_public, otherwise job owner or assigned pro
-- =============================================================================
CREATE POLICY "job_progress_select_visible"
  ON job_progress FOR SELECT
  USING (
    is_public = TRUE
    OR pro_id = auth.uid()
    OR job_id IN (
      SELECT id FROM jobs WHERE client_id = auth.uid()
    )
    OR job_id IN (
      SELECT id FROM jobs WHERE assigned_pro_id = auth.uid()
    )
  );

CREATE POLICY "job_progress_insert_pro"
  ON job_progress FOR INSERT
  WITH CHECK (pro_id = auth.uid());

-- =============================================================================
-- reviews: public read, reviewer creates own
-- =============================================================================
CREATE POLICY "reviews_select_public"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "reviews_insert_own"
  ON reviews FOR INSERT
  WITH CHECK (reviewer_id = auth.uid());

CREATE POLICY "reviews_update_response"
  ON reviews FOR UPDATE
  USING (reviewee_id = auth.uid())
  WITH CHECK (reviewee_id = auth.uid());

-- =============================================================================
-- material_templates: public read
-- =============================================================================
CREATE POLICY "material_templates_select_public"
  ON material_templates FOR SELECT
  USING (true);

-- =============================================================================
-- job_materials: job owner or assigned pro
-- =============================================================================
CREATE POLICY "job_materials_select_relevant"
  ON job_materials FOR SELECT
  USING (
    job_id IN (
      SELECT id FROM jobs
      WHERE client_id = auth.uid() OR assigned_pro_id = auth.uid()
    )
  );

CREATE POLICY "job_materials_insert_relevant"
  ON job_materials FOR INSERT
  WITH CHECK (
    job_id IN (
      SELECT id FROM jobs
      WHERE client_id = auth.uid() OR assigned_pro_id = auth.uid()
    )
  );

CREATE POLICY "job_materials_update_relevant"
  ON job_materials FOR UPDATE
  USING (
    job_id IN (
      SELECT id FROM jobs
      WHERE client_id = auth.uid() OR assigned_pro_id = auth.uid()
    )
  );

-- =============================================================================
-- material_orders: client_id = auth.uid()
-- =============================================================================
CREATE POLICY "material_orders_select_own"
  ON material_orders FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "material_orders_insert_own"
  ON material_orders FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "material_orders_update_own"
  ON material_orders FOR UPDATE
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- =============================================================================
-- tools: public read
-- =============================================================================
CREATE POLICY "tools_select_public"
  ON tools FOR SELECT
  USING (true);

-- =============================================================================
-- tool_rentals: renter only
-- =============================================================================
CREATE POLICY "tool_rentals_select_own"
  ON tool_rentals FOR SELECT
  USING (renter_id = auth.uid());

CREATE POLICY "tool_rentals_insert_own"
  ON tool_rentals FOR INSERT
  WITH CHECK (renter_id = auth.uid());

CREATE POLICY "tool_rentals_update_own"
  ON tool_rentals FOR UPDATE
  USING (renter_id = auth.uid())
  WITH CHECK (renter_id = auth.uid());

-- =============================================================================
-- conversations: participants only
-- =============================================================================
CREATE POLICY "conversations_select_participant"
  ON conversations FOR SELECT
  USING (auth.uid() = ANY(participant_ids));

CREATE POLICY "conversations_insert_participant"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = ANY(participant_ids));

CREATE POLICY "conversations_update_participant"
  ON conversations FOR UPDATE
  USING (auth.uid() = ANY(participant_ids));

-- =============================================================================
-- messages: participants only (via conversations.participant_ids)
-- =============================================================================
CREATE POLICY "messages_select_participant"
  ON messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations
      WHERE auth.uid() = ANY(participant_ids)
    )
  );

CREATE POLICY "messages_insert_sender"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND conversation_id IN (
      SELECT id FROM conversations
      WHERE auth.uid() = ANY(participant_ids)
    )
  );

-- =============================================================================
-- notifications: owner only
-- =============================================================================
CREATE POLICY "notifications_select_own"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "notifications_update_own"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "notifications_delete_own"
  ON notifications FOR DELETE
  USING (user_id = auth.uid());

-- =============================================================================
-- payments: payer or payee only
-- =============================================================================
CREATE POLICY "payments_select_own"
  ON payments FOR SELECT
  USING (payer_id = auth.uid() OR payee_id = auth.uid());
