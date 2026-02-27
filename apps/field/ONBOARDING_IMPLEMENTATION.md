# Field App Onboarding Implementation

## Overview
Three-step onboarding flow for new users who don't have an organization yet.

## Files Created

### 1. `src/pages/onboarding/create-org.tsx`
**Step 1: Create Organization**

Features:
- Form fields: organization name (required), slug (auto-generated from name, editable), trade type dropdown
- Logo upload placeholder (UI only, storage coming later)
- Auto-generates slug from name (lowercase, replace spaces with hyphens, strip special chars)
- Validates: name min 2 chars, slug lowercase alphanumeric + hyphens only
- On submit: inserts into `organizations` table with `settings.trade_type`
- Trigger in database auto-creates user as owner in `organization_members`
- On success: navigate to `/onboarding/invite-team?org={org.id}`

Trade types:
- General Contractor, Electrical, Plumbing, HVAC, Roofing, Concrete, Masonry, Painting, Landscaping, Other

### 2. `src/pages/onboarding/invite-team.tsx`
**Step 2: Invite Team Members**

Features:
- Dynamic form with rows of [email input, role select, remove button]
- Role options: admin, supervisor, foreman, worker
- "Add another" button to add more rows (starts with 1 empty row)
- "Skip" button to go directly to next step
- On submit: stores pending invites in `organizations.settings.pending_invites` as JSON array
  - Note: Full invite flow (sending emails, creating users) to be implemented later
- On submit/skip: navigate to `/onboarding/billing?org={org.id}`

### 3. `src/pages/onboarding/billing.tsx`
**Step 3: Choose Plan**

Features:
- Three plan cards displayed side-by-side (responsive: stack on mobile)
- **Free**: $0/mo, up to 3 workers, basic features
- **Pro**: $50/seat/mo, unlimited workers, all features (has "Most Popular" badge)
- **Enterprise**: Custom pricing, SSO, custom integrations
- Free: "Get Started" → updates org `subscription_tier` to 'free' and navigates to `/`
- Pro: "Subscribe" → shows "Coming soon" toast (Stripe integration pending)
- Enterprise: "Contact Sales" → opens mailto link

### 4. `src/pages/onboarding/index.ts`
Barrel export for all three pages.

### 5. `src/App.tsx` (updated)
Added three onboarding routes:
- `/onboarding/create-org`
- `/onboarding/invite-team`
- `/onboarding/invite-billing`

All routes are accessible without authentication (auth check handled within each page).

## Design Patterns

### Styling
- Clean, centered card forms with `max-w-2xl` (forms) and `max-w-4xl` (billing)
- Consistent Tailwind classes matching existing login page
- Primary color: `primary-600` / `primary-700`
- Cards: `border border-slate-200 bg-white rounded-lg shadow-sm`
- Hover: `hover:shadow-md`
- Step indicator at top: "Step X of 3"

### Navigation Flow
1. User signs up → `/onboarding/create-org`
2. After org creation → `/onboarding/invite-team?org={uuid}`
3. After invites (or skip) → `/onboarding/billing?org={uuid}`
4. After plan selection → `/` (dashboard)

### Error Handling
- All pages validate auth state and redirect to `/login` if not authenticated
- Step 2 and 3 redirect to `/onboarding/create-org` if missing `?org=` param
- Form validation with inline error messages
- Supabase errors caught and displayed

### Database Integration
- Uses `supabase` from `@/lib/supabase`
- Uses `useAuth()` from `@/hooks/use-auth`
- Creates organization with trigger auto-seeding owner membership
- Stores pending invites in JSONB `settings` column (invite flow TBD)
- Updates subscription tier on plan selection

## Testing Checklist

- [ ] Navigate to `/onboarding/create-org` after signup
- [ ] Create organization with valid name/slug
- [ ] Verify slug auto-generation from name
- [ ] Test slug validation (must be lowercase alphanumeric + hyphens)
- [ ] Verify org created in database with correct settings
- [ ] Verify user auto-added as owner in organization_members
- [ ] Navigate to invite-team page with org ID in URL
- [ ] Add multiple team member rows
- [ ] Remove rows (cannot remove last row)
- [ ] Skip invite step
- [ ] Submit with valid emails and verify stored in settings
- [ ] Navigate to billing page with org ID in URL
- [ ] Select Free plan and verify redirect to dashboard
- [ ] Verify subscription_tier updated in database
- [ ] Test Pro plan "Coming soon" message
- [ ] Test Enterprise mailto link

## Future Enhancements

1. **Logo Upload**
   - Implement Supabase Storage integration
   - Add image upload component
   - Store logo_url in organizations table

2. **Team Invites**
   - Send invitation emails via SendGrid/Postmark
   - Create invite tokens table
   - Implement invite acceptance flow
   - Create users and link to organization_members

3. **Stripe Integration**
   - Add Stripe checkout for Pro plan
   - Implement webhook handlers
   - Store subscription details
   - Handle plan upgrades/downgrades

4. **Onboarding Guard**
   - Add middleware to check if user has organization
   - Redirect to onboarding if no org membership
   - Skip onboarding if user already has membership

## Database Schema Used

```sql
-- organizations table
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
name text NOT NULL
slug text UNIQUE NOT NULL
logo_url text
settings jsonb DEFAULT '{}'::jsonb
stripe_customer_id text
stripe_subscription_id text
subscription_tier text
created_at timestamptz DEFAULT now()
updated_at timestamptz DEFAULT now()

-- organization_members table (auto-created by trigger)
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
organization_id uuid REFERENCES organizations(id)
user_id uuid REFERENCES auth.users(id)
role text NOT NULL
pin text
display_name text
is_active boolean DEFAULT true
invited_at timestamptz
accepted_at timestamptz
created_at timestamptz DEFAULT now()
```

## Notes

- All pages are full-screen (no Layout wrapper)
- Step indicator shows progress: "Step 1 of 3", "Step 2 of 3", "Step 3 of 3"
- Uses URL search params to pass org ID between steps
- TypeScript type checking passed with no errors
- No external UI library dependencies (raw Tailwind only)
