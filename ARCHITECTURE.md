# RenoNext — Complete Architecture & Build Plan

> Single source of truth for the entire platform.
> Last updated: 2026-02-10

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [System Architecture](#2-system-architecture)
3. [Database Schema — Existing (19 tables)](#3-database-schema--existing-19-tables)
4. [Database Schema — New (32 tables)](#4-database-schema--new-32-tables)
5. [TypeScript Type System](#5-typescript-type-system)
6. [Page Routes & Ownership](#6-page-routes--ownership)
7. [Client Dashboard — Project Command Center](#7-client-dashboard--project-command-center)
8. [Contractor Dashboard — Supervisor Command Center](#8-contractor-dashboard--supervisor-command-center)
9. [Data Flow Map](#9-data-flow-map)
10. [Build Plan — Phased](#10-build-plan--phased)

---

## 1. Product Vision

RenoNext is **infrastructure for trust in residential construction**.

Three user roles, three value propositions:

| Role | Wants | We Deliver |
|------|-------|------------|
| **Homeowner** | Safety, transparency, proof | Project Command Center — sees everything, controls approvals |
| **Contractor/GC** | Operational leverage, confidence, win rate | Supervisor Command Center — manages everything, wins better jobs |
| **Platform** | Lock-in, monetization | Home Vault — permanent property-bound data that creates switching cost |

### The Persuasion Loop

```
FEAR (Landing)   → "What if your contractor disappears with your money?"
PLAN (Pre-hire)  → "Here is exactly how your foundation will be waterproofed, step by step"
PROOF (During)   → Every person, dollar, photo, material — documented
LOCK-IN (After)  → Permanent Build Record — transferable to next owner
```

The **PLAN** phase is new and critical: homeowners don't trust prices — they trust plans. When a contractor shows a numbered execution sequence with inspections and gates, the comparison shifts from "who's cheaper?" to "who feels safer?" That's how contractors win higher-margin work.

### Messaging Discipline: Sell Confidence, Not Compliance

The architecture uses words like "compliance", "enforced causality", "gates" — these are **internal** design terms. In every **contractor-facing** surface (UI copy, onboarding, marketing), reframe:

| Internal (Architecture) | Contractor-Facing (UI) |
|------------------------|----------------------|
| Compliance rulesets | **Confidence templates** — "Built to code, ready to show" |
| Enforced causality | **Built-in quality proof** — "Your work speaks for itself" |
| Task gates | **Readiness checkpoints** — "Never start a step without everything lined up" |
| Inspection gates | **Verification milestones** — "Prove it once, reference it forever" |
| Execution sequences | **Your blueprint** — "Your process, documented and shareable" |
| Golden Library | **Blueprint Library** — "Reusable plans that win jobs" |

**Why this matters:** Contractors are skilled tradespeople, not office workers. "Compliance" sounds like paperwork imposed by someone else. "Confidence" sounds like a tool that makes them look professional and win better-paying clients. Same system, opposite emotional response.

### Four Golden Questions (Every feature must answer at least one)

1. **Am I safe?**
2. **Is this normal?**
3. **Do I need to act?**
4. **Will this matter later?**

### Scope Confidence Index (SCI)

A single, first-class signal that answers: **"How complete and defensible is this plan?"**

The data already exists. SCI just names it and surfaces it as the primary comparison heuristic — so homeowners don't have to read everything to know who planned better.

**Formula (computed, not stored):**

```
SCI = weighted average of:
  40%  Step coverage    — % of standard steps included vs. Golden Library template
  20%  Inspection coverage — inspections in plan ÷ inspections required by jurisdiction ruleset
  15%  Gate coverage    — % of recommended gates actually present
  10%  Code references  — has_code_references (boolean → 0 or 1)
  10%  Payment structure — has holdback + milestone payments defined
   5%  Warranty terms   — warranty_terms present (boolean → 0 or 1)
```

**Display:** `Scope Confidence: High / Medium / Low` (not a %)
- **High** = SCI ≥ 0.80 — "This plan covers the important bases"
- **Medium** = SCI 0.50–0.79 — "Some gaps — worth asking about"
- **Low** = SCI < 0.50 — "Missing significant coverage"

**Where it surfaces (v1):**
- **Proposal page** (`/proposal/[token]`) — badge next to comparison signals
- **Compare Proposals** (`/dashboard/jobs/[id]/compare`) — column header per contractor
- **Contractor profile** — aggregate SCI across all public proposals (subtle)

**Where it surfaces (v2):**
- **Client dashboard** — project SCI (derived from active sequence instance)
- **Golden Library** — template SCI (how complete is this template vs. jurisdiction)

**Messaging:** Never say "compliance score." Always "Scope Confidence." It tells the homeowner "this contractor thought it through" without requiring them to understand construction. It gives contractors a game to win — fill in more steps, add more gates, reference more codes, watch the badge go green.

> **Implementation note:** `proposals.compliance_score` is the stored seed value. SCI computation wraps it with the additional signals above. In v1, compute client-side from proposal data. In v2, move to edge function for consistency.

---

## 2. System Architecture

### Core Design Principle: Enforced Causality

The product is not dashboards. The product is **enforced causality**.

Every output panel works because:
- Something **had to happen**
- In the **correct order**
- With **evidence**
- Or the system would **not advance**

This is what separates a "tool" from a "construction control system."

> **Note:** "Enforced causality" is an internal design principle, not contractor-facing language. In UI/marketing, this manifests as "built-in quality proof" and "readiness checkpoints." See [Messaging Discipline](#messaging-discipline-sell-confidence-not-compliance) in Section 1.

### System-Wide Patterns

These patterns apply to **every** critical entity (rfis, issues, change_events, change_orders, inspections, submittals, decisions):

#### A. Responsibility Snapshots

People leave companies. Roles change. Lawsuits happen years later. We preserve who was responsible **at the time**, not who exists now.

```sql
-- Added to: rfis, issues, change_events, change_orders, inspections, payment_applications
responsibility_snapshot JSONB NOT NULL DEFAULT '{}'
-- Structure: {
--   user_id: UUID,
--   full_name: TEXT,
--   company: TEXT,
--   role: TEXT,
--   trade_license: TEXT,
--   captured_at: TIMESTAMPTZ
-- }
```

#### B. Visibility Model

Three-layer visibility: **Actor can do** / **Client can see** / **System can log**.

```sql
-- Added to entities where client visibility varies:
visibility TEXT NOT NULL DEFAULT 'project_team'
  CHECK (visibility IN ('project_team', 'client_visible', 'contractor_only', 'admin_only'))
```

This extends the `timeline_events.is_client_visible` pattern to all entities. Field-level redaction comes in v2.

#### C. Soft Deletion + Legal Hold

Mistakes happen. Regulations differ. Lawyers will ask. Every major entity supports:

```sql
-- Added to all critical tables (not lookup/junction tables):
deleted_at        TIMESTAMPTZ,
deleted_by_id     UUID REFERENCES profiles(id),
deletion_reason   TEXT,
legal_hold        BOOLEAN NOT NULL DEFAULT FALSE
-- legal_hold = TRUE → cannot be deleted even by admin
```

Tables with soft delete: projects, project_stages, project_tasks, rfis, submittals, drawings, change_events, change_orders, inspections, issues, daily_reports, decisions, project_documents, financial_documents, payment_applications, lien_waivers, proposals.

All queries must filter `WHERE deleted_at IS NULL` by default. RLS policies enforce this.

#### D. "Proceed at Risk" (Gate Bypass)

Enforced causality is the product — but rigid enforcement kills adoption. If an inspector is 4 hours late and the crew must pour concrete before rain, the app must **not** be a blocker. Instead, it becomes a **documented risk decision**.

```sql
-- On task_gates: bypass columns allow proceeding without gate satisfaction
bypassed                      BOOLEAN NOT NULL DEFAULT FALSE,
bypassed_at                   TIMESTAMPTZ,
bypassed_by_id                UUID REFERENCES profiles(id),
bypass_reason                 TEXT,
bypass_liability_acknowledgment BOOLEAN DEFAULT FALSE
-- Must be TRUE. Generates: timeline_event + responsibility_snapshot.
-- Status becomes 'bypassed' (distinct from 'satisfied' or 'waived').
```

This turns "blocker" into "documented risk" — which aligns perfectly with the Responsibility Snapshot pattern. If the subsequent inspection fails, the paper trail is airtight.

#### E. Progress Billing & Lien Protection

Construction payments follow a **Schedule of Values** structure, not simple invoicing. The `payment_applications` table implements CCDC/AIA-style progress billing with statutory **holdback** (10% in Ontario) — the homeowner's only legal defense against construction liens.

`lien_waivers` collect proof that subs/suppliers have been paid and waive their right to lien the property. Four types: conditional/unconditional × progress/final.

> **Construction Act 2026 update:** Holdback must now be released annually on each contract anniversary (no exceptions). Invoices auto-deemed "proper" after 7 days without owner objection. Owner must pay within 28 days or issue notice of non-payment within 14 days. See Pattern H for full timeline and architecture implications.

#### F. Offline-First Mobile (Basement-Grade Connectivity)

Waterproofing and underpinning happen in **basements with no cell signal**. If a foreman clicks "Sign In Worker" and the spinner spins forever, they stop using the app. The mobile architecture must assume connectivity is intermittent.

**Pattern: Optimistic UI + Sync Queue**

```
1. User action (e.g., "Sign In Worker")
2. UI updates INSTANTLY (optimistic — green checkmark)
3. Client generates UUID locally (not from server)
4. Action enters Zustand offline_queue[]
5. Background retry every 5s with exponential backoff
6. On success: queue item removed, server state reconciled
7. On conflict: flag for manual resolution
```

**Key constraints:**
- All UUIDs generated **client-side** (`crypto.randomUUID()`). The DB uses `uuid_generate_v4()` as a fallback default, but the client sends the ID so it can reference it locally before the server responds.
- **No complex local-first DB** (RxDB, etc.) in v1. Just a `Zustand offline_queue` persisted to `AsyncStorage` (Expo) or `localStorage` (web).
- **Conflict resolution**: Last-write-wins for most fields. For attendance (sign-in/out), timestamp from client is authoritative. For gate status changes, server state wins.
- **Visual indicator**: Show a subtle "syncing..." badge when items are queued. Show "offline — changes saved locally" when no connection. Never show a blocking spinner.

**Tables that must support offline writes:** `site_attendance`, `project_tasks` (% complete), `daily_reports`, `task_gates` (bypass), `issues` (creation), photos (queued upload).

#### G. Closeout Protocol (Jackson Ch 5: Formal Project Closeout)

Construction closeout is **not** just "project complete." It's a multi-step legal and contractual process that protects both parties. Skipping formal closeout is the #1 cause of warranty disputes, retainage arguments, and lien claims.

**The Closeout Sequence:**
1. **Punch list** — contractor + client walk-through. Issues created as `issues` with type `punch_list_item`.
2. **Substantial completion** — all punch items resolved. Architect/engineer issues Certificate of Substantial Completion. `projects.substantial_completion_at` set. Warranty period begins.
3. **Final inspection** — municipal inspector signs off. `projects.certificate_of_occupancy` recorded.
4. **Final documents** — closeout package assembled: as-builts, warranties, O&M manuals, lien waivers. `project_documents` with `document_type = 'closeout_package'`.
5. **Final completion** — all docs delivered, retainage released. `projects.final_completion_at` set. `projects.retainage_released = TRUE`.
6. **Warranty period** — `projects.warranty_start_date` to `warranty_end_date`. Expiry alerts feed Home Vault.
7. **Debrief** — lessons learned captured in `projects.lessons_learned` JSONB.

**Automation triggers:**
- Auto-generate closeout stage when last active stage hits 90% complete
- Warranty expiry alerts → Home Vault notifications (edge function, v2)
- Retainage release reminder 30 days before warranty end

#### H. Ontario Regulatory Compliance (OBC + Construction Act 2026)

RenoNext operates in Ontario. Two bodies of law define the rules we must encode:

**1. Ontario Building Code (O. Reg. 332/12) — How Things Are Built**

Part 9 (Housing & Small Buildings) governs our residential market. Source: *Illustrated User's Guide — NBC 2020: Part 9 of Division B* (Third Edition, NRC, Jan 2025). Key sections referenced in seed data:
- **§9.12** — Excavation (topsoil removal, frost depth, backfill rules, trench compaction)
- **§9.13** — Dampproofing, waterproofing & soil gas control (radon rough-in mandatory)
- **§9.14** — Foundation drainage (100mm pipe, 150mm gravel, sump pits, surface grading)
- **§9.15** — Footings & foundations (75 kPa bearing, width tables, ICF walls — NEW in 2020)
- **§9.25** — Heat transfer, air leakage & condensation control (air barrier systems)
- **§9.36** — Energy efficiency (5-tier system, climate zones, airtightness testing — NEW in 2020)
- **Division C, §1.3.5** — Mandatory inspection stages

**Critical NBC 2020 requirements for seed data:**

| NBC Section | Requirement | Seed Impact |
|-------------|-------------|-------------|
| §9.12.2.2 | Foundation depth must be below frost line for unheated spaces; varies by frost index | EX sequence quality_criteria |
| §9.12.3.2 | Backfill graded 1.5–2m slope away from foundation; no boulders >250mm within 600mm | EX step 19 quality_criteria |
| §9.13.2.1 | Dampproofing required on ALL below-grade walls/floors (except garages, floors on 100mm+ granular) | WP compliance_rulesets |
| §9.13.3.1 | Waterproofing required WHERE hydrostatic pressure exists (distinct from dampproofing) | WP sequence: branch logic |
| §9.13.4.2 | **Radon rough-in MANDATORY for all dwellings** — air barrier + subfloor depressurization | CN slab: new step |
| §9.13.4.3 | Radon pipe: ≥100mm diameter, centered in slab, 150mm granular radius, sealed cap | CN slab: quality_criteria |
| §9.14.3.2 | Drain pipe minimum 100mm (4 in.); covered with 150mm crushed stone/granular | WP step 8 quality_criteria |
| §9.15.3.4 | Footing widths per storey count; min 75 kPa soil bearing for prescriptive sizes | CN footings compliance |
| §9.36.7 | 5-tier energy performance (Tier 1 baseline → Tier 5 near net-zero) — NEW framework | Proposals: energy tier target |
| §9.36.6 | Airtightness testing: 3.2 ACH at 50 Pa default; actual test improves tier rating | v2 gate type |

> **Radon is non-negotiable.** Health Canada guideline: 200 Bq/m³ annual average. Test after occupancy (min 3 months). All dwellings need the rough-in — pipe + granular + sealed sump. Cost during construction: ~$200. Retrofit cost: $3,000+. This is a trust signal for homeowners: *"Your home includes radon protection as standard."*

Division C §1.3.5 defines **21 mandatory inspections** for Part 9 residential construction. Work **cannot proceed** past any stage until the inspection passes — this is jurisdictional enforced causality:

| Category | Inspections (in sequence) |
|----------|--------------------------|
| **Building** (10) | Footings → Foundations → Structural framing (incl. rough-in) → Fire separations → Insulation & vapour barrier → Fireplaces/gas/chimneys → Life safety systems → Occupancy → Final interior → Final exterior |
| **Plumbing** (6) | Outside storm/sanitary sewers → Water service → Inside storm/sanitary sewers → Rough-in systems → Occupancy → Final |
| **HVAC** (4) | Rough-in → Kitchen exhaust → Occupancy → Final |

> **Architecture implication:** `compliance_rulesets` for Ontario should encode these as jurisdiction-specific gate templates. When a contractor builds a sequence in Ontario, the system auto-suggests the applicable inspections from this table. The seed data (009) already has 10 rulesets — expand with OBC §1.3.5 inspection stages per trade.

**2. Construction Act (R.S.O. 1990, c. C.30) — How Money Moves**

The Construction Act governs liens, holdback, prompt payment, and adjudication. **Major amendments took effect January 1, 2026** (Bill 60) that directly impact our payment architecture:

**Prompt Payment (already in Act, now teeth via deeming):**
```
Day 0:  Contractor submits proper invoice
Day 7:  Invoice AUTO-DEEMED "proper" if owner doesn't object in writing
Day 14: Owner must issue notice of non-payment (or pay)
Day 28: PAYMENT DUE (from proper invoice receipt)
Day 35: Contractor pays sub within 7 days of receiving payment
```

**Mandatory Annual Holdback Release (NEW — Jan 1, 2026):**
```
Contract anniversary → Owner publishes release notice within 14 days
                     → Holdback released 60–74 days after notice
                     → Contractor pays subs within 14 days of receiving holdback
                     → Cannot withhold, set off, or deduct — period
```

**Key numbers encoded in architecture:**
- **10%** statutory holdback (Ontario standard) — `payment_applications.holdback_percent`
- **28 days** payment deadline from proper invoice
- **7 days** invoice auto-deeming window (owner must object or it's approved)
- **7 days** cascade payment (GC → sub after receiving payment)
- **14 days** annual holdback release notice deadline
- **60 days** lien preservation period (from completion/termination)
- **90 days** lien perfection period (from preservation)
- **90 days** adjudication availability window (from completion/termination)
- **7 days** termination notice publication requirement (NEW)

**Other 2026 changes:**
- Notices of non-payment for holdback **eliminated entirely**
- Private adjudicators now permitted (≥$1,000/hr, signed agreement)
- Adjudication determinations published on ODACC website (2027+)
- Lien claims + breach of trust claims joinable in single action (O. Reg. 265/25)

> **Product opportunity:** The prompt payment countdown is a **trust signal**. On the client dashboard: *"Invoice received March 1. Payment due March 29."* The 7-day deeming rule creates urgency: *"Review by March 8 or this invoice is automatically approved."* This answers "Do I need to act?" with a legal deadline, not a nagging notification.

#### I. Permit Advisor (BCIN + Municipal Permit Guidance)

Building permits are the #1 source of confusion for homeowners — and the #1 opportunity for contractors to demonstrate competence. Most homeowners think "permit" is a single piece of paper. In reality it's a multi-step process involving zoning compliance, multiple forms, professional drawings, parallel municipal approvals, and a strict inspection sequence.

**BCIN (Building Code Identification Number)** — Ontario-specific credential. Contractors or designers with BCIN can prepare Part 9 residential drawings in-house. This eliminates the need for homeowners to hire a separate designer — a major cost and time savings. Stored on `pro_profiles.bcin` with verification via the Ontario [QuARTS Public Search Registry](https://www.iaccess.gov.on.ca/BCINSearchWeb/search.html).

**Three layers, phased:**

**Layer 1 — BCIN Trust Signal (v1)**
- BCIN badge on proposals + contractor profile: *"Licensed Designer — prepares permit drawings in-house"*
- On Compare Proposals view: contractors with BCIN get a signal: *"No separate designer needed"*
- SCI bonus: BCIN holder gets +5% on Scope Confidence Index (reduces homeowner friction)
- Schedule 1 (Designer Information) auto-references contractor's BCIN on proposal

**Layer 2 — Permit Checklist (v1.5)**
- `permit_guides` table: region-specific structured content (Toronto first, then GTA municipalities)
- Based on project type + municipality, auto-generate: required forms (with download links), required drawings, parallel approvals (TRCA, Heritage, Tree permits), required inspections mapped to project stages, estimated fees, FASTRACK eligibility
- `permit_applications` table: per-project permit tracking (status, forms checklist, inspections, fees)
- Inspection booking reminders (48-hour notice per Toronto Building requirements)
- "Don't cover work before inspection" warnings on relevant tasks

**Layer 3 — Form Pre-Fill + Multi-Municipality (v2)**
- Use project data (address, contractor BCIN, designer info, scope) to pre-fill standard City forms
- PDF overlay generation for Schedule 1, Application to Construct/Demolish, Energy Efficiency Design Summary
- Multi-municipality support: Toronto, Mississauga, Brampton, Markham, Vaughan, etc.
- Zoning compliance pre-check (link to municipal zoning bylaws by property address)

**Toronto Building Permit Process (source: City of Toronto Homeowner's Guide):**
```
Step 1: Zoning compliance → Preliminary review (optional but speeds up process)
Step 2: Draft plans → Hire BCIN designer OR self-design (if qualified)
Step 3: Apply → Submit forms + drawings (email or in-person)
Step 4: Plan review → Zoning Examiner + Building Code Examiner
Step 5: Permit issued → Begin construction + book inspections
Step 6: Inspections → 48-hour notice, multiple visits per trade
Step 7: Close permit → Final inspection + confirm closed via TelePermit
```

**Required inspections per permit type (Toronto):**

| Category | Inspections (in sequence) |
|----------|--------------------------|
| **Building** (8) | Footings → Foundations (before backfill) → Structural framing (before insulating) → Insulation + vapour barrier (before drywall) → Fire separation (before drywall) → Occupancy (new houses only) → Final interior → Final exterior |
| **Plumbing** (4) | Drains (ball test) → Rough-in drainage/venting (leak test) → Rough-in water distribution (leak test) → Final fixtures |
| **HVAC** (2) | Rough-in HVAC/air extraction → Final |

**Parallel municipal approvals (often missed):**
- **Zoning review** — preliminary review not mandatory but speeds process by weeks
- **TRCA approval** — required if near streams, rivers, valleys, wetlands, or waterfront
- **Heritage Preservation** — required for properties on Toronto Heritage Register
- **Tree permit** — required if removing or potentially damaging any trees
- **Street Occupation Permit** — required for materials/containers stored on public street
- **Municipal Road Damage Deposit** — required for all residential construction

> **Product opportunity:** A contractor who says *"I'll handle all the permits — I'm a licensed designer with BCIN, I know exactly what forms Toronto needs, and I've already mapped out the 14 inspections for your project"* wins over the homeowner who's Googling "do I need a building permit for a deck." This is the same confidence-over-compliance pattern: we don't sell permits, we sell *"I've got this handled."*

#### J. Parametric Trade Assemblies (3D Proof Artifacts)

Construction happens in **layers** — soil, then footing, then wall, then membrane, then drain tile, then gravel, then dimple board, then backfill. Every trade follows this pattern: a vertical stack of materials applied in a specific order. This is exactly what our execution sequences encode as steps. The 3D assembly makes it **visible**.

**This is NOT BIM software.** It's a proof artifact — a simple parametric 3D model tied to the blueprint steps. When a homeowner views a proposal, they don't see a PDF with a price. They see their foundation being built, layer by layer, in 3D. Each layer lights up as they step through the blueprint.

**Three views from the same model:**

1. **3D Rotate + Explode** — layers separate vertically so the homeowner can see every component. Rotate to examine. Click any layer to see its description, code reference, and quality criteria.
2. **2D Section Cut** — classic construction detail drawing. This is what BCIN designers produce for permit applications. Auto-generated from the same parametric model.
3. **Step Overlay** — linked to `sequence_steps`. Scrub through steps 1→N. As each step activates, its corresponding 3D primitives appear. By the end, the full assembly is built.

**Primitives for waterproofing/underpinning (the launch trade):**

| Primitive | Three.js Geometry | Parameters | Linked Steps |
|-----------|------------------|------------|--------------|
| Soil volume | `BoxGeometry` (transparent) | excavation_depth, excavation_width | Excavation |
| Foundation wall | `BoxGeometry` | wall_height, wall_thickness, wall_length | Excavation, Form prep |
| Footing | `BoxGeometry` | footing_width, footing_depth, footing_projection | Footing pour |
| Slab | `BoxGeometry` (thin) | slab_area, slab_thickness | Slab pour |
| Membrane | `PlaneGeometry` (offset) | coverage_area, membrane_type | Membrane application |
| Dimple board | `PlaneGeometry` (bump map) | coverage_area | Dimple board install |
| Drain tile | `TubeGeometry` along path | pipe_diameter (100mm NBC §9.14), slope | Drain tile install |
| Gravel bed | `BoxGeometry` (textured) | gravel_depth (150mm NBC §9.14), area | Gravel + filter fabric |
| Insulation board | `BoxGeometry` (colored) | rsi_value → thickness, coverage | Insulation install |
| Sump pit | `CylinderGeometry` | pit_diameter, pit_depth | Sump pit install |
| Radon pipe | `CylinderGeometry` | pipe_diameter (100mm NBC §9.13.4) | Radon rough-in |
| Underpin pins | `CylinderGeometry[]` | pin_spacing, pin_depth | Underpinning (if applicable) |
| Bench footing | `BoxGeometry` | bench_width, bench_height | Interior bench (if applicable) |
| Backfill volume | `BoxGeometry` (transparent) | backfill_depth, slope_grade | Backfill + grading |

**Renderer:** Raw Three.js with `useEffect` + `useRef` (NOT `@react-three/fiber` — incompatible with Next.js 15 SSR). JSA Dashboard already uses this approach for AR positioning (`ForemanARPositioning` + `ARDrawingViewer`).

**Data architecture:**

```
trade_assemblies (template)
  ├── primitives[] — geometry, materials, positions, layer_order
  ├── parameters[] — configurable dimensions (wall_height, etc.)
  ├── section_cuts[] — named 2D cut views
  └── camera_presets[] — named 3D viewpoints

execution_sequences
  └── assembly_id FK → trade_assemblies

sequence_steps
  └── primitives already linked via step_number ↔ primitive.linked_step_numbers

project_sequence_instances
  └── assembly_params JSONB — project-specific dimension overrides
      (e.g., actual wall height = 2600mm instead of default 2400mm)
```

**Phase 2 (v1 — hardcoded):** Ship ONE assembly — waterproofing. The primitives, parameters, and step linkages are hardcoded as a TypeScript constant in the 3D viewer component. Zero database changes. This is enough for the proposal page to show the 3D step-through for your launch trade.

**v1.5 (table + editor):** `trade_assemblies` table. Assembly editor for contractors. Additional trades: underpinning, concrete footings, insulation. Parametric configuration per project.

**v2 (advanced):** Custom assemblies. AR overlay connection (Three.js model placed on real-world GPS coordinates via JSA pattern). As-built vs planned comparison. PDF section-cut export for permit drawings.

> **Why this wins:** Two proposals arrive. One is a PDF: "Waterproofing — $18,000." The other loads a 3D model of the homeowner's foundation. They rotate it. They step through 12 stages — each layer appears with a plain-language description and code reference. They see the radon pipe, the drain tile at the footing, the membrane wrapping the wall. They see the NBC section numbers. They see the inspection checkpoints. Then they see the price. They don't even look at the other proposal.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Web Frontend | Next.js 15.1, React 18, Tailwind 3.4, shadcn/ui |
| Mobile | Expo, React Native 0.76, NativeWind |
| Backend | Supabase (PostgreSQL, Auth, Edge Functions, Realtime, Storage) |
| Payments | Stripe (Connected Accounts, Payment Intents, Transfers) |
| State | Zustand (global), React Query (server) |
| Forms | React Hook Form + Zod |
| Maps | Google Maps API |
| Build | Turborepo, npm workspaces, TypeScript 5.9 |

### Monorepo Structure

```
capex/
├── apps/
│   ├── web/                    # Next.js 15.1 — App Router
│   │   ├── app/                # File-based routes
│   │   ├── components/         # React components
│   │   │   ├── ui/             # shadcn/ui primitives
│   │   │   ├── landing/        # Landing page sections
│   │   │   └── project/        # NEW: Project dashboard components
│   │   └── lib/                # Supabase client, utils
│   └── mobile/                 # Expo / React Native
├── packages/
│   ├── shared/                 # Types, hooks, API clients, stores, utils
│   │   └── src/
│   │       ├── types/          # TypeScript interfaces
│   │       ├── api/            # Supabase API wrappers
│   │       ├── hooks/          # React hooks
│   │       ├── stores/         # Zustand stores
│   │       ├── utils/          # Helpers
│   │       └── constants/      # App constants
│   ├── ui/                     # Shared UI components
│   └── supabase/               # DB migrations, Edge Functions
│       ├── migrations/         # SQL migration files
│       └── functions/          # Deno edge functions
```

---

## 3. Database Schema — Existing (19 tables)

These tables are already built in `packages/supabase/migrations/001_initial_schema.sql`.

### 3.1 profiles
Extends Supabase `auth.users`. Every authenticated user has one.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | References `auth.users(id)` |
| email | TEXT | NOT NULL |
| full_name | TEXT | |
| phone | TEXT | |
| avatar_url | TEXT | |
| role | TEXT | `client` / `pro` / `admin` |
| is_verified | BOOLEAN | Default false |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | Auto-trigger |

### 3.2 pro_profiles
Professional-specific details. 1:1 with profiles where role = 'pro'.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK UNIQUE | → profiles |
| bio | TEXT | |
| headline | TEXT | |
| hourly_rate_min / max | DECIMAL(10,2) | |
| service_radius_km | INT | Default 25 |
| lat / lng | DOUBLE | |
| address, city, province | TEXT | |
| years_experience | INT | |
| is_available | BOOLEAN | |
| avg_rating | DECIMAL(3,2) | |
| total_reviews | INT | |
| total_jobs_completed | INT | |
| response_time_minutes | INT | |
| current_job_id | UUID | |
| current_status | TEXT | `available` / `working` / `offline` |
| stripe_account_id | TEXT | |
| id_verified | BOOLEAN | |
| background_check_passed | BOOLEAN | |
| bcin | TEXT | Building Code Identification Number (Ontario) |
| bcin_verified | BOOLEAN | Default false — verified via QuARTS registry |
| bcin_categories | JSONB | `[]` — design categories held (e.g., `["House", "Small Building", "HVAC"]`) |

### 3.3 client_profiles
Homeowner-specific. 1:1 with profiles where role = 'client'.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK UNIQUE | → profiles |
| default_address | TEXT | |
| default_lat / lng | DOUBLE | |
| default_city | TEXT | |
| total_jobs_posted | INT | |

### 3.4 categories
Job/service categories (Plumbing, Electrical, etc.)

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| name | TEXT UNIQUE | |
| slug | TEXT UNIQUE | |
| icon | TEXT | Lucide icon name |
| description | TEXT | |
| is_active | BOOLEAN | |
| sort_order | INT | |

### 3.5 pro_categories
M:M between pros and their service categories.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| pro_profile_id | UUID FK | → pro_profiles |
| category_id | UUID FK | → categories |
| years_experience | INT | |
| custom_rate_min / max | DECIMAL | |
| UNIQUE | | (pro_profile_id, category_id) |

### 3.6 pro_gallery
Portfolio images for pros.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| pro_profile_id | UUID FK | → pro_profiles |
| image_url | TEXT | |
| thumbnail_url | TEXT | |
| caption | TEXT | |
| category_id | UUID FK | → categories |
| job_id | UUID | Reference (not FK) |
| is_before | BOOLEAN | Before/after pairs |
| is_featured | BOOLEAN | |
| lat / lng | DOUBLE | |

### 3.7 jobs
Core entity. Represents a posted job from a client.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| client_id | UUID FK | → profiles |
| category_id | UUID FK | → categories |
| title | TEXT | |
| description | TEXT | |
| status | TEXT | `draft` / `posted` / `bidding` / `assigned` / `in_progress` / `completed` / `cancelled` / `disputed` |
| address, city | TEXT | |
| lat / lng | DOUBLE | |
| preferred_date | DATE | |
| time_start / end | TIME | |
| is_flexible_date | BOOLEAN | |
| is_urgent | BOOLEAN | |
| suggested_price_min / max | DECIMAL | AI-generated |
| final_price | DECIMAL | |
| details | JSONB | Freeform job-specific data |
| photos | JSONB | Array of URLs |
| assigned_pro_id | UUID FK | → profiles |
| assigned_at | TIMESTAMPTZ | |
| started_at | TIMESTAMPTZ | |
| completed_at | TIMESTAMPTZ | |
| estimated_hours | DECIMAL(4,1) | |
| estimated_people_needed | INT | |

### 3.8 job_bids
Pro bids on posted jobs.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK | → jobs |
| pro_id | UUID FK | → profiles |
| amount | DECIMAL | |
| message | TEXT | |
| estimated_hours | DECIMAL | |
| estimated_start_date | DATE | |
| status | TEXT | `pending` / `accepted` / `rejected` / `withdrawn` |
| UNIQUE | | (job_id, pro_id) |

### 3.9 job_progress
Progress updates during a job.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK | → jobs |
| pro_id | UUID FK | → profiles |
| update_type | TEXT | `started` / `photo_update` / `milestone` / `material_update` / `break` / `resumed` / `completed` / `issue` |
| message | TEXT | |
| photos | JSONB | Array of URLs |
| lat / lng | DOUBLE | |
| metadata | JSONB | |
| is_public | BOOLEAN | Client-visible? |

### 3.10 reviews
Post-job reviews with sub-ratings.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK UNIQUE | One review per job |
| reviewer_id | UUID FK | → profiles |
| reviewee_id | UUID FK | → profiles |
| rating | INT | 1-5 |
| title, comment | TEXT | |
| photos | JSONB | |
| quality_rating | INT | 1-5 |
| punctuality_rating | INT | 1-5 |
| communication_rating | INT | 1-5 |
| value_rating | INT | 1-5 |
| pro_response | TEXT | |

### 3.11 material_templates
Pre-built material lists per category.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| category_id | UUID FK | → categories |
| material_name | TEXT | |
| unit | TEXT | |
| formula | TEXT | Calculation formula |
| default_quantity | DECIMAL | |
| is_required | BOOLEAN | |
| estimated_unit_price | DECIMAL | |
| notes | TEXT | |
| sort_order | INT | |

### 3.12 job_materials
Materials for a specific job.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK | → jobs |
| material_name | TEXT | |
| quantity | DECIMAL | |
| unit | TEXT | |
| estimated_price | DECIMAL | |
| actual_price | DECIMAL | |
| status | TEXT | `suggested` / `approved` / `ordered` / `delivered` |
| supplier | TEXT | |
| notes | TEXT | |

### 3.13 material_orders
Supplier orders for job materials.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK | → jobs |
| client_id | UUID FK | → profiles |
| items | JSONB | Array of order items |
| total_amount | DECIMAL | |
| delivery_address | TEXT | |
| delivery_date | DATE | |
| status | TEXT | `pending` / `confirmed` / `shipped` / `delivered` / `cancelled` |
| stripe_payment_intent_id | TEXT | |

### 3.14 tools
Tool rental inventory.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| name | TEXT | |
| description | TEXT | |
| category_id | UUID FK | → categories |
| daily_rate | DECIMAL | |
| deposit_amount | DECIMAL | |
| image_url | TEXT | |
| is_available | BOOLEAN | |
| condition | TEXT | `new` / `good` / `fair` |
| owner_type | TEXT | `platform` / `pro` / `supplier` |
| owner_id | UUID | |

### 3.15 tool_rentals
Tool rental transactions.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| tool_id | UUID FK | → tools |
| renter_id | UUID FK | → profiles |
| job_id | UUID FK | → jobs |
| start_date / end_date | DATE | |
| total_amount | DECIMAL | |
| deposit_amount | DECIMAL | |
| status | TEXT | `reserved` / `active` / `returned` / `overdue` / `cancelled` |
| stripe_payment_intent_id | TEXT | |

### 3.16 conversations
Chat threads.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK | → jobs |
| participant_ids | UUID[] | Array of user IDs |
| last_message_text | TEXT | |
| last_message_at | TIMESTAMPTZ | |

### 3.17 messages
Individual chat messages.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| conversation_id | UUID FK | → conversations |
| sender_id | UUID FK | → profiles |
| content | TEXT | |
| message_type | TEXT | `text` / `image` / `system` |
| image_url | TEXT | |
| is_read | BOOLEAN | |
| promoted_to_entity_id | UUID | → rfi / issue / change_event |
| promoted_to_entity_type | TEXT | `rfi` / `issue` / `change_event` |

> **"Promote to Entity" flow:** 90% of RFIs start as a text: "Hey, this beam looks wrong." A chat message can be promoted to a formal entity (RFI, Issue, Change Event) with one click. The original message becomes evidence, the chat thread shows "This message became Issue #45," and the new entity links back to the conversation. Migration: `ALTER TABLE messages ADD COLUMN promoted_to_entity_id UUID, ADD COLUMN promoted_to_entity_type TEXT;`

### 3.18 notifications
Push/in-app notifications. Split into **two streams** to prevent notification fatigue:
- **Critical** (push immediately): Decisions, Change Orders, Critical Path Delays, Failed Inspections
- **Digest** (batched at 5:00 PM): Photos uploaded, attendance logs, task completions, material deliveries

If a homeowner gets 15 notifications a day, they disable notifications. Then the critical change order goes unseen. The digest solves this.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK | → profiles |
| type | TEXT | |
| title | TEXT | |
| body | TEXT | |
| data | JSONB | |
| is_read | BOOLEAN | |
| priority | TEXT | `critical` (push now) / `digest` (batch at 5PM) |
| digest_batch_id | UUID | Groups multiple events into one summary notification |

> **Migration note:** `ALTER TABLE notifications ADD COLUMN priority TEXT CHECK (priority IN ('critical', 'digest')) DEFAULT 'digest', ADD COLUMN digest_batch_id UUID;` — Edge function `generate-daily-digest` runs at 5PM per timezone, creates one summary notification per user from all unread `digest` items. Critical items always push immediately.

### 3.19 payments
Financial transactions.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| job_id | UUID FK | → jobs (kept for backward compat) |
| project_id | UUID FK | → projects (nullable — used for all new flows) |
| payer_id | UUID FK | → profiles |
| payee_id | UUID FK | → profiles |
| amount | DECIMAL | |
| platform_fee | DECIMAL | |
| net_amount | DECIMAL | |
| type | TEXT | `job_payment` / `material_payment` / `tool_rental` / `tip` / `milestone_payment` / `change_order_payment` |
| status | TEXT | `pending` / `held` / `released` / `refunded` / `failed` |
| stripe_payment_intent_id | TEXT | |
| stripe_transfer_id | TEXT | |

> **Migration note:** `ALTER TABLE payments ADD COLUMN project_id UUID REFERENCES projects(id) ON DELETE SET NULL; CREATE INDEX idx_payments_project ON payments(project_id);` — All new payment flows (milestone releases, change order payments) use `project_id`. Legacy marketplace payments continue to use `job_id` only.

### Existing Indexes

```sql
idx_jobs_status              ON jobs(status)
idx_jobs_category_id         ON jobs(category_id)
idx_jobs_client_id           ON jobs(client_id)
idx_jobs_location            ON jobs USING gist (ll_to_earth(lat, lng))
idx_pro_profiles_location    ON pro_profiles USING gist (ll_to_earth(lat, lng))
idx_pro_profiles_available   ON pro_profiles(is_available) WHERE TRUE
idx_job_bids_job_id          ON job_bids(job_id)
idx_job_progress_job_id      ON job_progress(job_id)
idx_messages_conversation_id ON messages(conversation_id)
idx_notifications_user_read  ON notifications(user_id, is_read)
idx_pro_gallery_pro_profile  ON pro_gallery(pro_profile_id)
idx_reviews_reviewee_id      ON reviews(reviewee_id)
```

---

## 4. Database Schema — New (35 tables)

All new tables to be added in `packages/supabase/migrations/003_project_management.sql`.

These tables transform RenoNext from a marketplace into a **construction project management platform**.

All critical tables include the system-wide patterns from Section 2:
- **Responsibility snapshots** on accountability entities
- **Soft deletion + legal hold** on all major entities
- **Visibility model** on entities with variable client access

### Overview: New Table Groups (35 tables)

```
EXECUTION BLUEPRINTS — "Golden Library" (3 tables)
  execution_sequences, sequence_steps, project_sequence_instances

COMPLIANCE RULES (1 table)
  compliance_rulesets

PROJECT STRUCTURE (2 tables)
  projects, project_stages

ACCESS CONTROL (1 table)
  project_members

SCHEDULE & TASKS (2 tables)
  project_tasks, task_gates

PEOPLE & ATTENDANCE (2 tables)
  project_workers, site_attendance

DOCUMENT CONTROL (6 tables)
  rfis, rfi_responses, submittals, submittal_revisions,
  drawings, drawing_versions

CHANGE MANAGEMENT (2 tables)
  change_events, change_orders

QUALITY & COMPLIANCE (2 tables)
  inspections, issues

RECORDS & AUDIT (2 tables)
  daily_reports, timeline_events

DECISIONS & DOCUMENTS (3 tables)
  decisions, project_documents, financial_documents

FINANCIAL CONTROL (2 tables)
  payment_applications, lien_waivers

PRE-HIRE (1 table)
  proposals

SITE OPERATIONS (1 table)
  delivery_log

MEETING RECORDS (1 table)
  meeting_minutes

PERMIT ADVISOR (2 tables)
  permit_guides, permit_applications

3D TRADE ASSEMBLIES (1 table)
  trade_assemblies

INFRASTRUCTURE (1 table)
  project_counters
```

---

### 4.1 compliance_rulesets
**Jurisdiction-specific construction rules.** Defines what inspections, permits, and hold points are required per trade and region. Without this, rules get hardcoded into every template and diverge fast. Templates reference a ruleset; when regulations change, update the ruleset — all templates inherit automatically.

> **v1 vs v2 scope:** In v1, compliance_rulesets serves as **credibility metadata** — it annotates blueprint steps with code references, populates proposal comparison signals ("4 inspections included"), and drives SCI (Scope Confidence Index). It does **not** block work or enforce anything. In v2, it becomes an **enforcement engine** — auto-generating required gates, blocking non-compliant sequences, driving earned value calculations. Don't over-invest in enforcement logic before contractors ask for it.

> **Ontario source of truth:** OBC O. Reg. 332/12, Division C §1.3.5 defines 21 mandatory inspection stages for Part 9 residential. These should be encoded as `rules.required_inspections[]` per trade. The seed data (009) already has 10 rulesets with inspection references — v1.5 expands these with the full OBC inspection matrix from Pattern H.

```sql
CREATE TABLE compliance_rulesets (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Scope
  region            TEXT NOT NULL,              -- 'ON', 'Toronto_ON', 'Mississauga_ON', 'BC', etc.
  trade_type        TEXT NOT NULL,              -- 'waterproofing', 'underpinning', 'electrical', etc.
  name              TEXT NOT NULL,              -- "Ontario Residential Waterproofing — 2024 OBC"

  -- Rules (flexible JSONB — v1 simple, expand over time)
  rules             JSONB NOT NULL DEFAULT '{}',
  -- Structure:
  -- {
  --   required_inspections: [{type, stage, description, authority}],
  --   required_permits: [{type, description, issuing_body}],
  --   engineer_signoff_required: boolean,
  --   hold_points: [{after_step, reason, min_cure_hours}],
  --   required_certifications: [{name, authority}],
  --   code_references: [{code, section, description}]
  -- }

  -- Versioning
  version           INT NOT NULL DEFAULT 1,
  effective_date    DATE,
  supersedes_id     UUID REFERENCES compliance_rulesets(id),  -- Previous version

  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  notes             TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER compliance_rulesets_updated_at
  BEFORE UPDATE ON compliance_rulesets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE UNIQUE INDEX idx_compliance_rulesets_active ON compliance_rulesets(region, trade_type)
  WHERE is_active = TRUE;
CREATE INDEX idx_compliance_rulesets_trade ON compliance_rulesets(trade_type);
```

### 4.2 execution_sequences (Golden Library)
**Reusable execution blueprints.** A contractor creates or selects a step-by-step method for how a job will be done. This is **not** estimation — this is **how the work will be performed**, in what order, with what checkpoints. Templates are trade-specific (waterproofing, underpinning, landscaping) and encode institutional construction knowledge. The best sequences become platform defaults over time.

```sql
CREATE TABLE execution_sequences (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by_id     UUID REFERENCES profiles(id),

  -- Classification
  trade_type        TEXT NOT NULL,              -- 'waterproofing', 'underpinning', 'landscaping', etc.
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,
  name              TEXT NOT NULL,              -- "Foundation Waterproofing — Standard"
  description       TEXT,
  plain_language_summary TEXT,                  -- Client-facing: "Here's how we waterproof a foundation"

  -- Source
  source            TEXT NOT NULL DEFAULT 'custom'
                    CHECK (source IN ('platform_template', 'contractor_template', 'custom')),
  is_public         BOOLEAN NOT NULL DEFAULT FALSE,  -- Visible to other contractors as template
  is_verified       BOOLEAN NOT NULL DEFAULT FALSE,  -- Platform-reviewed best practice

  -- Regional compliance (links to normalized ruleset)
  ruleset_id        UUID REFERENCES compliance_rulesets(id) ON DELETE SET NULL,
  region            TEXT,                       -- 'ON', 'BC', etc. (denormalized from ruleset for filtering)

  -- 3D visual assembly (Pattern J — links to parametric 3D model)
  assembly_id       UUID REFERENCES trade_assemblies(id) ON DELETE SET NULL,

  -- Versioning (bumped when steps change meaningfully)
  version           INT NOT NULL DEFAULT 1,

  -- Stats (for template ranking)
  times_used        INT NOT NULL DEFAULT 0,
  avg_rating        DECIMAL(3,2),

  -- Soft delete
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER execution_sequences_updated_at
  BEFORE UPDATE ON execution_sequences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_exec_sequences_trade ON execution_sequences(trade_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_exec_sequences_creator ON execution_sequences(created_by_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_exec_sequences_public ON execution_sequences(is_public, trade_type)
  WHERE is_public = TRUE AND deleted_at IS NULL;
```

### 4.3 sequence_steps
**Individual steps within an execution sequence.** Each step defines what happens, in what order, with what prerequisites. When a sequence is applied to a project, steps auto-generate: tasks, task_gates, required inspections, and required submittals.

```sql
CREATE TABLE sequence_steps (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_id       UUID NOT NULL REFERENCES execution_sequences(id) ON DELETE CASCADE,

  step_number       INT NOT NULL,              -- Editable ordering
  title             TEXT NOT NULL,             -- "Membrane application"
  description       TEXT,                      -- Technical detail
  plain_language_summary TEXT,                 -- Client: "Waterproof coating applied to walls"
  what_to_expect    TEXT,                      -- "Expect chemical smell, area will be cordoned off"

  -- Duration & crew
  expected_duration_days INT,
  min_crew_size     INT,
  required_crew_types TEXT[],                  -- ['plumber', 'laborer']

  -- Prerequisites (become task_gates when instantiated)
  requires_inspection BOOLEAN NOT NULL DEFAULT FALSE,
  inspection_type   TEXT,                      -- 'plumbing_rough_in', 'pre_backfill', etc.
  requires_submittal BOOLEAN NOT NULL DEFAULT FALSE,
  submittal_types   TEXT[],                    -- ['product_data', 'warranty']
  requires_permit   BOOLEAN NOT NULL DEFAULT FALSE,
  requires_jsa      BOOLEAN NOT NULL DEFAULT TRUE,
  requires_client_approval BOOLEAN NOT NULL DEFAULT FALSE,

  -- Dependencies (step numbers that must complete first)
  depends_on_steps  INT[] NOT NULL DEFAULT '{}',  -- [1, 2] = steps 1 and 2 must be done

  -- Flags
  is_milestone      BOOLEAN NOT NULL DEFAULT FALSE,
  triggers_payment  BOOLEAN NOT NULL DEFAULT FALSE,  -- Milestone payment on completion
  is_critical_path  BOOLEAN NOT NULL DEFAULT FALSE,

  -- Metadata
  typical_cost_percent DECIMAL(5,2),           -- % of total job cost (for estimation)
  safety_notes      TEXT,
  quality_criteria  TEXT,                       -- What "done right" looks like

  -- Comparison language (confidence nudges for homeowners)
  industry_standard BOOLEAN NOT NULL DEFAULT TRUE,  -- Is this step standard practice?
  skip_risk_description TEXT,              -- "Skipping this step may void warranty coverage"
  resale_impact_note TEXT,                 -- "Missing this record reduces resale value by..."

  -- External authority anchoring (borrowed credibility)
  code_reference    TEXT,                  -- "Ontario Building Code §9.13.2"
  authority_body    TEXT,                  -- "City of Toronto Building Division"

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (sequence_id, step_number)
);

CREATE TRIGGER sequence_steps_updated_at
  BEFORE UPDATE ON sequence_steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_sequence_steps_sequence ON sequence_steps(sequence_id);
```

### 4.4 project_sequence_instances
**Links a sequence to a specific project.** Once the client approves the sequence, it's locked and the steps auto-generate the full project structure (tasks, gates, inspections, submittals). Changes after locking are tracked as change events.

```sql
CREATE TABLE project_sequence_instances (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sequence_id       UUID NOT NULL REFERENCES execution_sequences(id),

  -- Snapshot (frozen at approval time — template edits don't affect live projects)
  sequence_version  INT NOT NULL,               -- Which version of the template was used
  steps_snapshot    JSONB NOT NULL DEFAULT '[]',
  -- Full copy of sequence_steps at approval time
  ruleset_snapshot  JSONB NOT NULL DEFAULT '{}',
  -- Copy of compliance_rulesets.rules at approval time
  assembly_params   JSONB NOT NULL DEFAULT '{}',
  -- Project-specific 3D assembly parameter overrides
  -- {wall_height: 2600, excavation_depth: 2100, ...}

  -- Approval
  presented_at      TIMESTAMPTZ,               -- When shown to client
  approved_by_client BOOLEAN NOT NULL DEFAULT FALSE,
  approved_at       TIMESTAMPTZ,
  locked            BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE after approval = no structural edits

  -- Customization tracking
  customized        BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE if contractor edited from template
  customization_notes TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- v1: one primary blueprint per project. Multi-scope (waterproofing + landscaping)
  -- supported by attaching multiple sequences, but only if they are different sequences.
  UNIQUE (project_id, sequence_id)
);

CREATE TRIGGER project_sequence_instances_updated_at
  BEFORE UPDATE ON project_sequence_instances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_proj_seq_instances_project ON project_sequence_instances(project_id);
CREATE INDEX idx_proj_seq_instances_sequence ON project_sequence_instances(sequence_id);
```

---

### How Execution Blueprints Generate Project Structure

When a `project_sequence_instance` is approved and locked:

```
sequence_steps[n]  ──►  project_tasks[n]
                        ├── task_gates (from requires_inspection, requires_submittal, etc.)
                        ├── inspections (from inspection_type)
                        └── submittals (from submittal_types)

step.depends_on_steps  ──►  task.depends_on (mapped to task UUIDs)
step.is_milestone      ──►  task.is_milestone
step.triggers_payment  ──►  stage.triggers_payment
step groups            ──►  project_stages (auto-grouped or manually assigned)
```

Changes after locking:
- Reordering → change_event (trigger_type: 'scope_change')
- Adding steps → change_event + change_order
- Removing steps → change_event + change_order
- All tracked in timeline_events

---

### "Estimate-to-Plan" AI Ingestion (Cold Start Killer)

The Golden Library is the biggest value prop but also the biggest barrier to entry. A contractor signing up has 0 sequences. They are busy. Typing "Step 1: Excavation, Step 2: Shoring..." into a form = churn before first proposal.

**Solution:** Don't ask them to build sequences. Ask them to **upload their last PDF estimate or quote.**

```
CONTRACTOR UPLOADS PDF              LLM PARSES                   DRAFT SEQUENCE
─────────────────────              ──────────                   ──────────────

"Foundation Waterproofing    ──►   Extracts line items:         execution_sequence (draft)
 Quote - $42,000"                  - Excavation 8ft depth        ├── step 1: Excavation
                                   - Shoring installation         ├── step 2: Shoring
                                   - Membrane application         ├── step 3: Membrane
                                   - Drainage tile install        ├── step 4: Drainage
                                   - Backfill + grading           ├── step 5: Backfill
                                                                  │
                                   Maps to compliance_rulesets ►  Auto-adds:
                                   (ON + waterproofing)            ├── inspection gates
                                                                   ├── code references
                                                                   └── required submittals
```

**Edge Function: `parse-estimate-to-sequence`**
1. **Input**: PDF file (uploaded to Supabase Storage)
2. **OCR**: Extract text (Tesseract.js or native PDF text extraction)
3. **LLM**: Claude API parses line items → maps to `sequence_steps` structure
4. **Compliance**: Auto-matches `compliance_rulesets` by trade + region → adds inspection gates, code references
5. **Output**: Draft `execution_sequence` + `sequence_steps` — contractor reviews, edits, saves

This turns 2 hours of manual setup into **2 minutes of review**. It's the "Growth Hack."

**Critical UX Framing: "Starting Point, Not Dictator"**

The LLM output is a **draft** — not a finished sequence. The contractor must feel in control:

1. **Landing state**: "We took a first pass at organizing your quote into a blueprint. Fix anything we got wrong." — never "Here is your sequence."
2. **Every step editable**: Drag to reorder, delete, rename, add. The AI is an intern who did the first draft; the contractor is the expert.
3. **Confidence nudge, not mandate**: "We matched this to Ontario waterproofing code — does this look right?" — never "This step is required by code."
4. **Graceful failure**: If the LLM can't parse the PDF, show "We couldn't make sense of this one — want to build from a template instead?" — not an error screen.
5. **No AI branding**: Don't say "AI-generated" or "powered by Claude." Say "auto-organized" or "pre-filled." Contractors trust tools, not robots.
6. **Never auto-save**: An AI-generated sequence must **never** be saved to the library without at least one human edit. The draft lands in an "Unsaved Draft" state — the Save button stays disabled until the contractor makes a change.
7. **Force ownership**: Require at least one manual reorder, rename, or edit before the "Save to Library" action unlocks. This ensures the contractor has reviewed and claimed the sequence as theirs, not the machine's.

---

### 4.5 projects
**Top-level project entity.** Created 1:1 with a job when it enters `in_progress`. A job becomes a project when it enters `in_progress`. One job → one project. This is the anchor for all project management data.

```sql
CREATE TABLE projects (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id            UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE UNIQUE,
  client_id         UUID NOT NULL REFERENCES profiles(id),
  contractor_id     UUID NOT NULL REFERENCES profiles(id),
  title             TEXT NOT NULL,
  address           TEXT,
  lat               DOUBLE PRECISION,
  lng               DOUBLE PRECISION,

  -- Schedule
  planned_start     DATE,
  planned_end       DATE,
  actual_start      DATE,
  actual_end        DATE,

  -- Budget
  contract_value    DECIMAL(12,2),
  approved_changes  DECIMAL(12,2) NOT NULL DEFAULT 0,
  spent_to_date     DECIMAL(12,2) NOT NULL DEFAULT 0,

  -- Earned Value
  schedule_confidence DECIMAL(5,2),  -- 0-100%
  cost_performance    DECIMAL(5,4),  -- CPI ratio
  schedule_performance DECIMAL(5,4), -- SPI ratio
  percent_complete    DECIMAL(5,2) NOT NULL DEFAULT 0,

  -- Status
  status            TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'on_hold', 'completed', 'cancelled')),
  health            TEXT NOT NULL DEFAULT 'on_track'
                    CHECK (health IN ('on_track', 'at_risk', 'behind', 'critical')),

  -- Counters (denormalized for dashboard speed)
  open_decisions    INT NOT NULL DEFAULT 0,
  open_rfis         INT NOT NULL DEFAULT 0,
  open_issues       INT NOT NULL DEFAULT 0,
  workers_on_site   INT NOT NULL DEFAULT 0,

  -- Closeout (Jackson Ch 5: formal closeout is a stage, not an afterthought)
  closeout_started_at       TIMESTAMPTZ,
  substantial_completion_at TIMESTAMPTZ,    -- Certificate issued by architect
  final_completion_at       TIMESTAMPTZ,    -- All docs delivered, retainage released
  certificate_of_occupancy  TEXT,           -- CO number/reference
  warranty_start_date       DATE,           -- = substantial_completion_at
  warranty_end_date         DATE,           -- Typically +1 year

  -- Retainage (Jackson Ch 9: % held until final completion)
  retainage_percent         DECIMAL(5,2) DEFAULT 10.00,
  retainage_released        BOOLEAN NOT NULL DEFAULT FALSE,
  retainage_released_at     TIMESTAMPTZ,

  -- Site Logistics (Jackson Ch 10: superintendent's first job)
  site_plan_url             TEXT,           -- Uploaded diagram of site layout
  site_access_notes         TEXT,           -- Access restrictions, routing
  work_hours                JSONB DEFAULT '{}',
  -- {start: "07:00", end: "16:00", restrictions: "No work before 8am",
  --  saturday: true, sunday: false}

  -- Post-Project (Jackson Ch 5: lessons learned)
  debrief_completed_at      TIMESTAMPTZ,
  lessons_learned           JSONB DEFAULT '[]',
  -- [{category, description, recommendation, added_by_id}]

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_projects_client ON projects(client_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_contractor ON projects(contractor_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
```

### 4.6 project_members
**Unified access control for all project participants.** Replaces implicit "client_id + contractor_id" checks with an explicit membership table. Even if v1 only inserts client + contractor rows, this future-proofs RLS for workers, subs, engineers, and inspectors without rewriting policies later.

```sql
CREATE TABLE project_members (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  role              TEXT NOT NULL
                    CHECK (role IN (
                      'client', 'contractor', 'worker', 'sub',
                      'engineer', 'inspector', 'admin'
                    )),
  company           TEXT,

  -- Granular permissions (v2 — for now role determines access)
  permissions       JSONB NOT NULL DEFAULT '{}',
  -- Future: {can_create_rfi: true, can_approve_changes: false, ...}

  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  invited_at        TIMESTAMPTZ,
  accepted_at       TIMESTAMPTZ,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, user_id)
);

CREATE INDEX idx_project_members_project ON project_members(project_id) WHERE is_active = TRUE;
CREATE INDEX idx_project_members_user ON project_members(user_id) WHERE is_active = TRUE;
```

**RLS pattern:** All new tables use `project_members` for access control:
```sql
-- Example: RFIs visible to active project members
CREATE POLICY "rfis_select_members" ON rfis FOR SELECT USING (
  project_id IN (
    SELECT project_id FROM project_members
    WHERE user_id = auth.uid() AND is_active = TRUE
  )
  AND deleted_at IS NULL
);
```

### 4.7 project_counters
**Atomic per-project numbering.** Prevents duplicate RFI/submittal/issue numbers under concurrent writes. On insert, `UPDATE ... RETURNING` atomically increments and returns the next number. Never compute `MAX(number)+1` in application code.

```sql
CREATE TABLE project_counters (
  project_id        UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  next_rfi          INT NOT NULL DEFAULT 1,
  next_submittal    INT NOT NULL DEFAULT 1,
  next_issue        INT NOT NULL DEFAULT 1,
  next_change_event INT NOT NULL DEFAULT 1,
  next_change_order INT NOT NULL DEFAULT 1,
  next_drawing      INT NOT NULL DEFAULT 1
);

-- Auto-created when a project is created (via trigger or application logic)
-- Usage:
-- UPDATE project_counters
-- SET next_rfi = next_rfi + 1
-- WHERE project_id = $1
-- RETURNING next_rfi - 1 AS rfi_number;
```

### 4.8 project_stages
**Named phases of work** (e.g., Demolition, Rough-In, Waterproofing, Finishing). Ordered. Each stage is a **state machine** with completion criteria. Clients understand stages, not tasks — this is the primary unit of progress communication.

```sql
CREATE TABLE project_stages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_number      INT NOT NULL,
  title             TEXT NOT NULL,
  description       TEXT,

  -- Client-facing plain language
  plain_description TEXT,          -- "What's happening in this phase"
  what_to_expect    TEXT,          -- "What you'll notice during this stage"
  safety_notes      TEXT,          -- Noise, dust, access restrictions
  estimated_duration_days INT,

  -- Schedule
  planned_start     DATE,
  planned_end       DATE,
  actual_start      DATE,
  actual_end        DATE,

  -- State machine: not_started → active → blocked → active → completed
  status            TEXT NOT NULL DEFAULT 'not_started'
                    CHECK (status IN ('not_started', 'ready', 'active', 'blocked', 'completed', 'skipped')),
  blocked_reason    TEXT,          -- Auto-derived from unsatisfied gates/inspections
  percent_complete  DECIMAL(5,2) NOT NULL DEFAULT 0,

  -- Completion criteria (what must be true before this stage can close)
  completion_criteria JSONB NOT NULL DEFAULT '[]',
  -- [{type: 'inspection_passed'|'all_tasks_complete'|'client_approval'|
  --         'submittals_approved'|'photos_uploaded'|'no_open_issues',
  --   reference_id: UUID|null, satisfied: boolean, satisfied_at: timestamp|null}]

  -- Milestone payment trigger
  triggers_payment  BOOLEAN NOT NULL DEFAULT FALSE,
  payment_amount    DECIMAL(10,2),
  payment_released  BOOLEAN NOT NULL DEFAULT FALSE,

  -- Schedule Baseline (Jackson Ch 11: freeze original plan for drift analysis)
  baseline_start    DATE,
  baseline_end      DATE,

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, stage_number)
);

CREATE TRIGGER project_stages_updated_at
  BEFORE UPDATE ON project_stages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_project_stages_project ON project_stages(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_stages_status ON project_stages(project_id, status) WHERE deleted_at IS NULL;
```

### 4.9 project_tasks
**Individual tasks within a stage** (Gantt chart items). Can have dependencies.

```sql
CREATE TABLE project_tasks (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_id          UUID REFERENCES project_stages(id) ON DELETE SET NULL,

  title             TEXT NOT NULL,
  description       TEXT,
  plain_description TEXT,            -- Client-friendly version

  -- Assignment
  assigned_worker_id UUID REFERENCES profiles(id),
  assigned_company   TEXT,

  -- Schedule (Gantt)
  planned_start     DATE,
  planned_end       DATE,
  actual_start      DATE,
  actual_end        DATE,
  estimated_hours   DECIMAL(6,1),
  actual_hours      DECIMAL(6,1),

  -- Cost
  estimated_cost    DECIMAL(10,2),
  actual_cost       DECIMAL(10,2),

  -- Progress
  percent_complete  DECIMAL(5,2) NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'ready', 'in_progress',
                                      'paused', 'completed', 'cancelled')),

  -- Dependencies (task IDs that must complete before this can start)
  depends_on        UUID[] NOT NULL DEFAULT '{}',

  sort_order        INT NOT NULL DEFAULT 0,
  is_milestone      BOOLEAN NOT NULL DEFAULT FALSE,

  -- Schedule Baseline (Jackson Ch 11: freeze original plan for drift analysis)
  baseline_start    DATE,
  baseline_end      DATE,

  -- Cost Code (Jackson Ch 12: track labor/cost by CSI code)
  cost_code         TEXT,    -- 'CSI-031100' etc.

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER project_tasks_updated_at
  BEFORE UPDATE ON project_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_project_tasks_project ON project_tasks(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_tasks_stage ON project_tasks(stage_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_tasks_status ON project_tasks(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_tasks_assigned ON project_tasks(assigned_worker_id) WHERE deleted_at IS NULL;
```

### 4.10 task_gates
**Readiness prerequisites per task.** Task cannot move to `in_progress` until all required gates are satisfied, waived, or **bypassed at risk**.

The "Proceed at Risk" mechanism is critical for adoption. If an inspector is 4 hours late but the crew must pour before rain, the app must **not** become a blocker — it must become a **documented risk decision**. A bypass creates a responsibility snapshot, a timeline event, and a liability acknowledgment. The gate is not "satisfied" — it's "bypassed," and if the subsequent inspection fails, the paper trail is airtight.

```sql
CREATE TABLE task_gates (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id           UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,

  gate_type         TEXT NOT NULL
                    CHECK (gate_type IN (
                      'submittal_approved', 'rfi_closed', 'jsa_complete',
                      'materials_delivered', 'inspection_passed',
                      'client_approval', 'permit_obtained',
                      'previous_task_complete',
                      'radon_roughin_verified'
                    )),
  title             TEXT NOT NULL,
  description       TEXT,

  -- What this gate references
  reference_id      UUID,           -- Points to submittal/rfi/inspection/task etc.
  reference_type    TEXT,           -- 'submittal' / 'rfi' / 'inspection' / 'task' / 'decision'

  required          BOOLEAN NOT NULL DEFAULT TRUE,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'satisfied', 'waived', 'bypassed')),

  -- Normal resolution
  satisfied_at      TIMESTAMPTZ,
  satisfied_by      TEXT,           -- Auto or manual
  waived_by_id      UUID REFERENCES profiles(id),
  waiver_reason     TEXT,

  -- "Proceed at Risk" bypass
  bypassed          BOOLEAN NOT NULL DEFAULT FALSE,
  bypassed_at       TIMESTAMPTZ,
  bypassed_by_id    UUID REFERENCES profiles(id),
  bypass_reason     TEXT,
  bypass_liability_acknowledgment BOOLEAN DEFAULT FALSE,
  -- Must be TRUE to save. "I acknowledge that proceeding before [gate title]
  -- increases risk and I accept liability for any resulting failures."
  -- System auto-generates: timeline_event + responsibility_snapshot on bypass.

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_task_gates_task ON task_gates(task_id);
CREATE INDEX idx_task_gates_status ON task_gates(status) WHERE status = 'pending';
CREATE INDEX idx_task_gates_bypassed ON task_gates(task_id) WHERE bypassed = TRUE;
```

### 4.11 project_workers
**Approved crew roster for a project.** Client approves this list. Only approved workers can sign in.

```sql
CREATE TABLE project_workers (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  worker_id         UUID REFERENCES profiles(id),  -- NULL if external/unlicensed helper

  full_name         TEXT NOT NULL,
  role              TEXT NOT NULL,           -- Foreman, Plumber, Apprentice, etc.
  trade             TEXT,                    -- Trade category
  company           TEXT,
  phone             TEXT,
  photo_url         TEXT,

  -- Certifications (denormalized for display speed)
  certifications    JSONB NOT NULL DEFAULT '[]',
  -- [{name, license_number, issued_date, expiry_date, verified, authority}]

  trade_license     TEXT,
  trade_license_expiry DATE,
  wsib_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  wsib_expiry       DATE,
  insurance_verified BOOLEAN NOT NULL DEFAULT FALSE,

  -- Approval
  approved_by_client BOOLEAN NOT NULL DEFAULT FALSE,
  approved_at       TIMESTAMPTZ,

  -- Status
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, worker_id)
);

CREATE TRIGGER project_workers_updated_at
  BEFORE UPDATE ON project_workers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_project_workers_project ON project_workers(project_id);
CREATE INDEX idx_project_workers_worker ON project_workers(worker_id);
```

### 4.12 site_attendance
**Daily sign-in / sign-out log.** GPS-verified. Powers "who's on site" panel. Supports both platform workers and **guest workers** (laborers, sub-trade operators) who don't have accounts.

**Kiosk Mode:** A general laborer or specialized sub-trade (e.g., concrete pump operator) might show up for 4 hours. They don't have a RenoNext account. They might not have a smartphone. The foreman's phone acts as the terminal: selects "Guest Worker," hands the phone to the worker, worker scribbles a signature for JSA/attendance. System records: "Signed by [Name] via Foreman [Foreman]'s device."

```sql
CREATE TABLE site_attendance (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Worker (nullable for guest/non-digital workers)
  worker_id         UUID REFERENCES project_workers(id) ON DELETE CASCADE,

  -- Guest worker support (when worker_id is NULL)
  guest_name        TEXT,                  -- "John — concrete pump operator"
  guest_company     TEXT,
  guest_trade       TEXT,
  signature_url     TEXT,                  -- Digital squiggle from Kiosk Mode
  authorized_by_id  UUID REFERENCES profiles(id),  -- Foreman who verified identity
  -- CHECK: either worker_id IS NOT NULL OR (guest_name IS NOT NULL AND authorized_by_id IS NOT NULL)

  date              DATE NOT NULL,
  sign_in_at        TIMESTAMPTZ,
  sign_out_at       TIMESTAMPTZ,
  hours_worked      DECIMAL(4,2),

  -- GPS verification
  sign_in_lat       DOUBLE PRECISION,
  sign_in_lng       DOUBLE PRECISION,
  sign_out_lat      DOUBLE PRECISION,
  sign_out_lng      DOUBLE PRECISION,
  inside_geofence   BOOLEAN NOT NULL DEFAULT FALSE,
  gps_verified      BOOLEAN NOT NULL DEFAULT FALSE,

  -- JSA
  jsa_signed        BOOLEAN NOT NULL DEFAULT FALSE,
  jsa_signed_at     TIMESTAMPTZ,
  jsa_signature_url TEXT,                  -- JSA-specific signature (separate from check-in)

  notes             TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, worker_id, date)
  -- Note: guest workers (worker_id NULL) are not constrained by UNIQUE —
  -- multiple guest entries per day are possible
);

CREATE INDEX idx_site_attendance_project_date ON site_attendance(project_id, date);
CREATE INDEX idx_site_attendance_worker ON site_attendance(worker_id) WHERE worker_id IS NOT NULL;
CREATE INDEX idx_site_attendance_guests ON site_attendance(project_id, date) WHERE worker_id IS NULL;
```

### 4.13 rfis (Requests for Information)
**Formal questions to eliminate ambiguity before mistakes happen.**

```sql
CREATE TABLE rfis (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  rfi_number        INT NOT NULL,             -- Auto-increment per project

  raised_by_id      UUID NOT NULL REFERENCES profiles(id),
  raised_by_role    TEXT,                      -- 'client' / 'contractor' / 'sub'
  raised_by_company TEXT,

  -- References
  related_task_id   UUID REFERENCES project_tasks(id) ON DELETE SET NULL,
  related_drawing_id UUID REFERENCES drawings(id) ON DELETE SET NULL,
  related_stage_id  UUID REFERENCES project_stages(id) ON DELETE SET NULL,
  ar_anchor_id      TEXT,                      -- Spatial pin ID (future AR)

  -- Content
  question_type     TEXT NOT NULL
                    CHECK (question_type IN ('clarification', 'discrepancy', 'missing_info', 'design_intent')),
  subject           TEXT NOT NULL,
  description       TEXT NOT NULL,
  plain_language_summary TEXT,                 -- Client-friendly version
  attachments       JSONB NOT NULL DEFAULT '[]',

  -- Priority & timing
  priority          TEXT NOT NULL DEFAULT 'medium'
                    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  required_response_date DATE,

  -- Impact
  schedule_impact_days INT,
  cost_impact       DECIMAL(10,2),

  -- Resolution
  status            TEXT NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open', 'responded', 'closed', 'void')),
  linked_change_event_id UUID,                 -- FK added after change_events created
  closed_at         TIMESTAMPTZ,
  closed_by_id      UUID REFERENCES profiles(id),

  -- Responsibility snapshot (who was responsible at time of creation)
  responsibility_snapshot JSONB NOT NULL DEFAULT '{}',

  -- Visibility
  visibility        TEXT NOT NULL DEFAULT 'project_team'
                    CHECK (visibility IN ('project_team', 'client_visible', 'contractor_only', 'admin_only')),

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, rfi_number)
);

CREATE TRIGGER rfis_updated_at
  BEFORE UPDATE ON rfis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_rfis_project ON rfis(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_rfis_status ON rfis(status) WHERE status != 'closed' AND deleted_at IS NULL;
```

### 4.14 rfi_responses
**Response chain for an RFI.** Multiple responses allowed until one is marked final.

```sql
CREATE TABLE rfi_responses (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rfi_id            UUID NOT NULL REFERENCES rfis(id) ON DELETE CASCADE,
  responder_id      UUID NOT NULL REFERENCES profiles(id),

  response_text     TEXT NOT NULL,
  attachments       JSONB NOT NULL DEFAULT '[]',
  is_final_response BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rfi_responses_rfi ON rfi_responses(rfi_id);
```

### 4.15 submittals
**Product/material approval workflow.** "Are we using what we said we'd use?"

```sql
CREATE TABLE submittals (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  submittal_number  INT NOT NULL,

  submitted_by_id   UUID NOT NULL REFERENCES profiles(id),

  -- References
  related_task_id   UUID REFERENCES project_tasks(id) ON DELETE SET NULL,
  related_stage_id  UUID REFERENCES project_stages(id) ON DELETE SET NULL,

  -- Content
  category          TEXT NOT NULL
                    CHECK (category IN (
                      'product_data', 'shop_drawing', 'sample',
                      'mix_design', 'warranty', 'test_report', 'certificate'
                    )),
  title             TEXT NOT NULL,
  description       TEXT,
  plain_language_summary TEXT,

  -- Product details
  manufacturer      TEXT,
  product_name      TEXT,
  spec_reference    TEXT,

  -- Status
  required_fields_complete BOOLEAN NOT NULL DEFAULT FALSE,
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN (
                      'draft', 'submitted', 'under_review',
                      'approved', 'rejected', 'revise_resubmit'
                    )),
  current_revision  INT NOT NULL DEFAULT 1,

  -- Approval
  approved_by_id    UUID REFERENCES profiles(id),
  approved_at       TIMESTAMPTZ,
  locks_materials   BOOLEAN NOT NULL DEFAULT FALSE,  -- Approved = materials locked

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, submittal_number)
);

CREATE TRIGGER submittals_updated_at
  BEFORE UPDATE ON submittals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_submittals_project ON submittals(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_submittals_status ON submittals(status) WHERE deleted_at IS NULL;
```

### 4.16 submittal_revisions
**Revision history for submittals.** Never overwrite — full history.

```sql
CREATE TABLE submittal_revisions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submittal_id      UUID NOT NULL REFERENCES submittals(id) ON DELETE CASCADE,

  revision_number   INT NOT NULL,
  changes_description TEXT,
  documents         JSONB NOT NULL DEFAULT '[]',  -- [{url, filename, type}]

  submitted_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (submittal_id, revision_number)
);

CREATE INDEX idx_submittal_revisions_submittal ON submittal_revisions(submittal_id);
```

### 4.17 drawings
**Drawing/detail sets.** Versioned, linked to tasks/RFIs/submittals.

```sql
CREATE TABLE drawings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  drawing_number    TEXT NOT NULL,

  title             TEXT NOT NULL,
  description       TEXT,
  drawing_type      TEXT NOT NULL
                    CHECK (drawing_type IN (
                      'detail_sketch', 'manufacturer_diagram',
                      'inspector_required', 'annotated_photo',
                      'site_plan', 'as_built'
                    )),

  current_version   INT NOT NULL DEFAULT 1,

  -- Links
  linked_task_ids   UUID[] NOT NULL DEFAULT '{}',
  linked_rfi_ids    UUID[] NOT NULL DEFAULT '{}',
  linked_submittal_ids UUID[] NOT NULL DEFAULT '{}',

  -- AR
  ar_overlay_available BOOLEAN NOT NULL DEFAULT FALSE,
  ar_model_url      TEXT,

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, drawing_number)
);

CREATE TRIGGER drawings_updated_at
  BEFORE UPDATE ON drawings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_drawings_project ON drawings(project_id) WHERE deleted_at IS NULL;
```

### 4.18 drawing_versions
**Version history for drawings.** Never overwrite.

```sql
CREATE TABLE drawing_versions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drawing_id        UUID NOT NULL REFERENCES drawings(id) ON DELETE CASCADE,

  version_number    INT NOT NULL,
  file_url          TEXT NOT NULL,
  thumbnail_url     TEXT,
  uploaded_by_id    UUID NOT NULL REFERENCES profiles(id),
  change_notes      TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (drawing_id, version_number)
);

CREATE INDEX idx_drawing_versions_drawing ON drawing_versions(drawing_id);
```

### 4.19 change_events
**Change triggers.** Something happened that may require a priced change order.

```sql
CREATE TABLE change_events (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  change_event_number INT NOT NULL,

  -- Trigger
  trigger_type      TEXT NOT NULL
                    CHECK (trigger_type IN (
                      'rfi_result', 'unforeseen_condition',
                      'client_request', 'inspector_requirement',
                      'design_change', 'scope_addition'
                    )),
  trigger_source_id UUID,
  trigger_source_type TEXT,            -- 'rfi' / 'inspection' / 'issue' / 'manual'

  -- Content
  title             TEXT NOT NULL,
  description       TEXT NOT NULL,
  plain_language_summary TEXT,
  evidence          JSONB NOT NULL DEFAULT '[]',  -- Photos, docs, AR pins

  -- Impact assessment
  cost_delta        DECIMAL(10,2),
  schedule_delta_days INT,
  compliance_impact TEXT DEFAULT 'none'
                    CHECK (compliance_impact IN ('none', 'minor', 'major')),

  -- Decision
  status            TEXT NOT NULL DEFAULT 'identified'
                    CHECK (status IN (
                      'identified', 'assessing', 'pending_decision',
                      'approved', 'deferred', 'cancelled'
                    )),
  decided_by_id     UUID REFERENCES profiles(id),
  decided_at        TIMESTAMPTZ,

  -- Responsibility snapshot
  responsibility_snapshot JSONB NOT NULL DEFAULT '{}',

  -- Visibility
  visibility        TEXT NOT NULL DEFAULT 'project_team'
                    CHECK (visibility IN ('project_team', 'client_visible', 'contractor_only', 'admin_only')),

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, change_event_number)
);

CREATE TRIGGER change_events_updated_at
  BEFORE UPDATE ON change_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_change_events_project ON change_events(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_change_events_status ON change_events(status) WHERE deleted_at IS NULL;
```

### 4.20 change_orders
**Priced change orders.** Generated after a change event is approved.

```sql
CREATE TABLE change_orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  change_order_number INT NOT NULL,
  change_event_id   UUID REFERENCES change_events(id) ON DELETE SET NULL,

  -- Content
  title             TEXT NOT NULL,
  description       TEXT,
  plain_language_summary TEXT,

  -- Cost breakdown
  line_items        JSONB NOT NULL DEFAULT '[]',
  -- [{description, category: 'labor'|'material'|'equipment'|'markup', quantity, unit_price, total}]

  subtotal          DECIMAL(10,2) NOT NULL DEFAULT 0,
  markup_percent    DECIMAL(5,2),
  markup_amount     DECIMAL(10,2),
  total             DECIMAL(10,2) NOT NULL DEFAULT 0,

  -- Schedule impact
  schedule_delta_days INT,

  -- Evidence
  evidence_links    JSONB NOT NULL DEFAULT '[]',  -- [{type, id, title}]

  -- Status
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'issued', 'approved', 'rejected', 'void')),
  approved_by_id    UUID REFERENCES profiles(id),
  approved_at       TIMESTAMPTZ,

  -- Responsibility snapshot
  responsibility_snapshot JSONB NOT NULL DEFAULT '{}',

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, change_order_number)
);

CREATE TRIGGER change_orders_updated_at
  BEFORE UPDATE ON change_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_change_orders_project ON change_orders(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_change_orders_status ON change_orders(status) WHERE deleted_at IS NULL;
```

### 4.21 inspections
**Inspection scheduling, results, and tracking.**

```sql
CREATE TABLE inspections (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  related_stage_id  UUID REFERENCES project_stages(id) ON DELETE SET NULL,
  related_task_id   UUID REFERENCES project_tasks(id) ON DELETE SET NULL,

  -- Details
  inspection_type   TEXT NOT NULL,             -- 'plumbing_rough_in', 'framing', etc.
  description       TEXT,
  required          BOOLEAN NOT NULL DEFAULT TRUE,

  -- Scheduling
  scheduled_date    DATE,
  actual_date       DATE,

  -- Inspector
  inspector_name    TEXT,
  inspector_authority TEXT,                    -- 'City of Toronto', 'Private', etc.

  -- Result
  result            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (result IN ('pending', 'passed', 'failed', 'conditional')),
  inspector_notes   TEXT,
  plain_language_result TEXT,                  -- "Passed — your plumbing is good to go"
  conditions        JSONB NOT NULL DEFAULT '[]', -- For conditional passes

  -- Re-inspection
  re_inspection_required BOOLEAN NOT NULL DEFAULT FALSE,
  re_inspection_of  UUID REFERENCES inspections(id),  -- Self-reference

  -- Evidence
  photos            JSONB NOT NULL DEFAULT '[]',
  certificate_url   TEXT,

  -- Responsibility snapshot
  responsibility_snapshot JSONB NOT NULL DEFAULT '{}',

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER inspections_updated_at
  BEFORE UPDATE ON inspections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_inspections_project ON inspections(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_inspections_result ON inspections(result) WHERE result != 'passed' AND deleted_at IS NULL;
```

### 4.22 issues
**Deficiency / punch list / quality issue tracking.**

```sql
CREATE TABLE issues (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  issue_number      INT NOT NULL,

  -- Classification
  category          TEXT NOT NULL
                    CHECK (category IN (
                      'inspection_deficiency', 'quality_issue',
                      'punch_item', 'safety', 'client_concern',
                      'rework', 'damage'
                    )),
  severity          TEXT NOT NULL DEFAULT 'medium'
                    CHECK (severity IN ('low', 'medium', 'high', 'critical')),

  -- Content
  title             TEXT NOT NULL,
  description       TEXT,
  plain_language_summary TEXT,

  -- People
  reported_by_id    UUID NOT NULL REFERENCES profiles(id),
  responsible_party_id UUID REFERENCES profiles(id),
  responsible_company TEXT,

  -- References
  related_task_id   UUID REFERENCES project_tasks(id) ON DELETE SET NULL,
  related_inspection_id UUID REFERENCES inspections(id) ON DELETE SET NULL,

  -- Evidence
  photos            JSONB NOT NULL DEFAULT '[]',
  ar_pin_id         TEXT,                      -- Spatial location (future AR)

  -- Resolution
  due_date          DATE,
  resolution_description TEXT,
  resolution_photos JSONB NOT NULL DEFAULT '[]',

  -- Status
  status            TEXT NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open', 'in_progress', 'ready_for_review', 'closed')),
  closed_by_id      UUID REFERENCES profiles(id),
  closed_at         TIMESTAMPTZ,

  -- Responsibility snapshot
  responsibility_snapshot JSONB NOT NULL DEFAULT '{}',

  -- Visibility
  visibility        TEXT NOT NULL DEFAULT 'project_team'
                    CHECK (visibility IN ('project_team', 'client_visible', 'contractor_only', 'admin_only')),

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, issue_number)
);

CREATE TRIGGER issues_updated_at
  BEFORE UPDATE ON issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_issues_project ON issues(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_issues_status ON issues(status) WHERE status != 'closed' AND deleted_at IS NULL;
CREATE INDEX idx_issues_responsible ON issues(responsible_party_id) WHERE deleted_at IS NULL;
```

### 4.23 daily_reports
**Daily construction log.** Auto-generated from attendance + tasks + materials, editable by contractor.

```sql
CREATE TABLE daily_reports (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  report_date       DATE NOT NULL,
  created_by_id     UUID NOT NULL REFERENCES profiles(id),

  -- Content (auto-populated, editable)
  workers           JSONB NOT NULL DEFAULT '[]',
  -- [{worker_id, name, role, sign_in, sign_out, hours}]

  tasks_performed   JSONB NOT NULL DEFAULT '[]',
  -- [{task_id, title, description, percent_progress}]

  materials_delivered JSONB NOT NULL DEFAULT '[]',
  -- [{name, quantity, unit, supplier}]

  weather           JSONB NOT NULL DEFAULT '{}',
  -- {condition, temp_high, temp_low, wind_kmh, precipitation_mm}

  delays            JSONB NOT NULL DEFAULT '[]',
  -- [{reason, hours_lost, description}]

  photos            JSONB NOT NULL DEFAULT '[]',
  notes             TEXT,

  -- Client-facing
  client_summary    TEXT,                      -- Auto-generated plain language
  is_published      BOOLEAN NOT NULL DEFAULT FALSE,  -- Visible to client when true

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, report_date)
);

CREATE TRIGGER daily_reports_updated_at
  BEFORE UPDATE ON daily_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_daily_reports_project_date ON daily_reports(project_id, report_date) WHERE deleted_at IS NULL;
```

### 4.24 timeline_events
**Auto-generated audit trail.** Every significant action creates an entry. Feeds the Communication Timeline and becomes the Home Vault history.

```sql
CREATE TABLE timeline_events (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  event_type        TEXT NOT NULL,
  -- Values: rfi_opened, rfi_closed, submittal_approved, submittal_rejected,
  -- inspection_passed, inspection_failed, change_order_approved,
  -- issue_opened, issue_closed, milestone_reached, daily_report_filed,
  -- worker_signed_in, worker_signed_out, material_delivered,
  -- photo_uploaded, document_uploaded, task_started, task_completed,
  -- payment_released, decision_needed, decision_made, stage_started,
  -- stage_completed, project_started, project_completed

  -- What generated this event
  source_entity_id  UUID,
  source_entity_type TEXT,           -- 'rfi' / 'submittal' / 'inspection' / etc.

  -- Who did it
  actor_id          UUID REFERENCES profiles(id),

  -- Content
  title             TEXT NOT NULL,
  description       TEXT,
  plain_language_summary TEXT,
  metadata          JSONB NOT NULL DEFAULT '{}',

  -- Visibility
  is_client_visible BOOLEAN NOT NULL DEFAULT TRUE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_timeline_events_project ON timeline_events(project_id, created_at DESC);
CREATE INDEX idx_timeline_events_type ON timeline_events(project_id, event_type);
CREATE INDEX idx_timeline_events_client ON timeline_events(project_id, is_client_visible)
  WHERE is_client_visible = TRUE;
```

### 4.25 decisions
**Unified decision inbox.** Single place for all pending approvals.

```sql
CREATE TABLE decisions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- What needs deciding
  decision_type     TEXT NOT NULL
                    CHECK (decision_type IN (
                      'change_order', 'material_substitution',
                      'schedule_adjustment', 'design_confirmation',
                      'worker_approval', 'scope_change',
                      'inspection_response', 'general'
                    )),
  title             TEXT NOT NULL,
  description       TEXT,
  plain_language_summary TEXT,

  -- Who decides
  requested_by_id   UUID NOT NULL REFERENCES profiles(id),
  assigned_to_id    UUID NOT NULL REFERENCES profiles(id),

  -- Impact (shown to decision maker)
  cost_impact       DECIMAL(10,2),
  schedule_impact_days INT,
  compliance_impact TEXT,

  -- Source
  source_entity_id  UUID,
  source_entity_type TEXT,           -- 'change_order' / 'rfi' / 'submittal' / etc.

  -- Priority & deadline
  priority          TEXT NOT NULL DEFAULT 'medium'
                    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  deadline          DATE,

  -- Resolution
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected', 'deferred')),
  decision_notes    TEXT,
  decided_at        TIMESTAMPTZ,

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER decisions_updated_at
  BEFORE UPDATE ON decisions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_decisions_project ON decisions(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_decisions_assigned ON decisions(assigned_to_id, status)
  WHERE status = 'pending' AND deleted_at IS NULL;
CREATE INDEX idx_decisions_status ON decisions(status) WHERE status = 'pending' AND deleted_at IS NULL;
```

### 4.26 project_documents
**General document storage.** Permits, certificates, warranties, contracts, etc.

```sql
CREATE TABLE project_documents (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  document_type     TEXT NOT NULL
                    CHECK (document_type IN (
                      'permit', 'certificate', 'warranty', 'report',
                      'contract', 'insurance', 'jsa', 'specification',
                      'transmittal', 'photo_set', 'closeout_package', 'other'
                    )),
  title             TEXT NOT NULL,
  description       TEXT,

  file_url          TEXT NOT NULL,
  file_name         TEXT NOT NULL,
  file_type         TEXT,            -- MIME type
  file_size_bytes   INT,

  uploaded_by_id    UUID NOT NULL REFERENCES profiles(id),

  -- Relationships (polymorphic)
  related_entity_id UUID,
  related_entity_type TEXT,          -- 'stage' / 'task' / 'rfi' / 'submittal' / etc.

  tags              TEXT[] NOT NULL DEFAULT '{}',

  -- For transmittals (document_type = 'transmittal')
  items             JSONB NOT NULL DEFAULT '[]',  -- [{document_id, title, revision}] — bundle of docs sent together
  transmitted_to    UUID[],          -- User IDs
  transmitted_at    TIMESTAMPTZ,
  acknowledged_by   JSONB NOT NULL DEFAULT '[]',  -- [{user_id, timestamp}]

  -- Warranty tracking (Jackson Ch 5: warranties are a major closeout deliverable)
  warranty_metadata         JSONB DEFAULT NULL,
  -- {manufacturer, product, coverage_years, start_date, expiry_date,
  --  conditions, subcontractor_company}

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_documents_project ON project_documents(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_documents_type ON project_documents(project_id, document_type) WHERE deleted_at IS NULL;
```

### 4.27 financial_documents
**Financial evidence normalization.** Invoices, receipts, payroll exports, supplier bills. Even if hidden in v1, this becomes Cost Traceability in v2.

```sql
CREATE TABLE financial_documents (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  document_type     TEXT NOT NULL
                    CHECK (document_type IN (
                      'invoice', 'receipt', 'payroll_export',
                      'supplier_bill', 'quote', 'purchase_order',
                      'credit_note', 'expense_claim'
                    )),

  -- Amounts
  amount            DECIMAL(10,2) NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'CAD',
  tax_amount        DECIMAL(10,2),

  -- Parties
  issued_by         TEXT,           -- Company/person name
  issued_by_id      UUID REFERENCES profiles(id),
  issued_to         TEXT,
  issued_to_id      UUID REFERENCES profiles(id),
  invoice_number    TEXT,           -- External reference number
  invoice_date      DATE,

  -- Relationships
  related_change_order_id UUID REFERENCES change_orders(id) ON DELETE SET NULL,
  related_task_id   UUID REFERENCES project_tasks(id) ON DELETE SET NULL,
  related_stage_id  UUID REFERENCES project_stages(id) ON DELETE SET NULL,

  -- Category for cost traceability
  cost_category     TEXT
                    CHECK (cost_category IN (
                      'labor', 'materials', 'equipment',
                      'subcontractor', 'permit', 'overhead', 'other'
                    )),

  -- File
  file_url          TEXT NOT NULL,
  file_name         TEXT,

  -- Status
  status            TEXT NOT NULL DEFAULT 'uploaded'
                    CHECK (status IN ('uploaded', 'verified', 'disputed', 'void')),
  verified_by_id    UUID REFERENCES profiles(id),
  verified_at       TIMESTAMPTZ,

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER financial_documents_updated_at
  BEFORE UPDATE ON financial_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_financial_docs_project ON financial_documents(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_docs_type ON financial_documents(project_id, document_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_docs_change_order ON financial_documents(related_change_order_id) WHERE deleted_at IS NULL;
```

### 4.28 payment_applications (Progress Billing)
**Construction progress billing — the Schedule of Values.** In construction, you rarely pay "Invoice #101." You pay "10% of Line Item 3 (Framing) + 50% of Line Item 4 (HVAC)." Without this structure (CCDC/AIA forms), change orders don't legally integrate into the contract sum, and you can't calculate the statutory **holdback** (10% in Ontario) — which is the homeowner's only defense against construction liens.

This is the bridge between `change_orders` (scope changes) and `payments` (money movement). Without it, the "Finances" panel is just a list of invoices.

> **Construction Act 2026 impact:** As of Jan 1, 2026, Ontario mandates annual holdback release on each contract anniversary. Holdback can no longer be withheld, set off, or deducted. This table now also handles annual release applications via `is_annual_release`. See Pattern H for the full prompt payment + holdback workflow.

```sql
CREATE TABLE payment_applications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  application_number INT NOT NULL,              -- Sequence 1, 2, 3...

  period_start      DATE NOT NULL,
  period_end        DATE NOT NULL,

  -- Schedule of Values (line items with % complete)
  schedule_of_values JSONB NOT NULL DEFAULT '[]',
  -- [{
  --   item_number: INT,
  --   description: TEXT,              -- "Framing", "HVAC Rough-In", etc.
  --   scheduled_value: DECIMAL,       -- Original contract amount for this item
  --   change_order_delta: DECIMAL,    -- Net CO adjustments to this item
  --   previous_percent: DECIMAL,      -- % complete as of last application
  --   this_period_percent: DECIMAL,   -- Additional % completed this period
  --   total_percent: DECIMAL,         -- Cumulative %
  --   total_completed: DECIMAL,       -- Dollar value completed to date
  --   materials_stored: DECIMAL       -- Materials on site, not yet installed
  -- }]

  -- The Money
  original_contract_sum DECIMAL(12,2) NOT NULL,
  net_change_orders     DECIMAL(12,2) NOT NULL DEFAULT 0,
  current_contract_sum  DECIMAL(12,2) GENERATED ALWAYS AS
                        (original_contract_sum + net_change_orders) STORED,

  total_completed_this_period DECIMAL(12,2) NOT NULL,
  total_completed_to_date     DECIMAL(12,2) NOT NULL,
  materials_stored_to_date    DECIMAL(12,2) NOT NULL DEFAULT 0,

  -- Statutory Holdback (Critical for Canadian/US Compliance)
  holdback_percent      DECIMAL(5,2) NOT NULL DEFAULT 10.00, -- Ontario standard
  holdback_amount       DECIMAL(12,2) NOT NULL,     -- Amount held back this period
  total_holdback_to_date DECIMAL(12,2) NOT NULL DEFAULT 0,

  -- Annual Holdback Release (Construction Act 2026 — mandatory)
  -- See Pattern H for full workflow: notice → 60-74 day wait → release → cascade
  is_annual_release     BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE if this is a holdback release application
  annual_release_notice_published_at TIMESTAMPTZ,        -- When notice was published
  annual_release_due_at TIMESTAMPTZ,                     -- 60-74 days after notice
  annual_release_paid_at TIMESTAMPTZ,                    -- When holdback was actually released

  -- Previous payments
  total_previous_payments DECIMAL(12,2) NOT NULL DEFAULT 0,

  -- Amount due this period
  amount_due            DECIMAL(12,2) NOT NULL,
  -- = total_completed_to_date + materials_stored - holdback - previous_payments

  -- Status
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'submitted', 'under_review',
                                      'certified', 'paid', 'rejected', 'revised')),

  -- Certification (Client or Architect/Engineer signs off)
  certified_by_id   UUID REFERENCES profiles(id),
  certified_at      TIMESTAMPTZ,
  certification_notes TEXT,

  -- Link to actual payment once processed
  payment_id        UUID,             -- → payments (FK added after payment created)

  -- Responsibility Snapshot
  responsibility_snapshot JSONB NOT NULL DEFAULT '{}',

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, application_number)
);

CREATE TRIGGER payment_applications_updated_at
  BEFORE UPDATE ON payment_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_pay_apps_project ON payment_applications(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_pay_apps_status ON payment_applications(status) WHERE deleted_at IS NULL;
```

### 4.29 lien_waivers
**Proof that subs/suppliers have been paid and waive their lien rights.** This answers "Am I safe?" better than anything else. If a GC doesn't pay their sub, the sub can put a **construction lien on the homeowner's house** — even if the homeowner paid the GC in full. Collecting lien waivers is the only defense. Most homeowners don't even know this risk exists.

Four types follow standard legal categories:
- **Conditional progress** — "I'll waive my rights once this check clears" (during project)
- **Unconditional progress** — "I waive my rights, payment received" (during project)
- **Conditional final** — "I'll waive all remaining rights once final payment clears"
- **Unconditional final** — "I waive all rights, fully paid" (project close-out)

```sql
CREATE TABLE lien_waivers (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  payment_app_id    UUID REFERENCES payment_applications(id) ON DELETE SET NULL,

  -- The Signer
  signer_id         UUID REFERENCES profiles(id),  -- The Sub/Supplier
  signer_company    TEXT NOT NULL,
  signer_role       TEXT NOT NULL
                    CHECK (signer_role IN ('subcontractor', 'material_supplier', 'equipment_rental')),

  -- Waiver Details
  waiver_type       TEXT NOT NULL
                    CHECK (waiver_type IN (
                      'conditional_progress', 'unconditional_progress',
                      'conditional_final', 'unconditional_final'
                    )),

  amount_waived     DECIMAL(12,2) NOT NULL,
  period_through    DATE NOT NULL,              -- Coverage through this date
  exceptions        TEXT,                        -- "Except for disputed amount of $X for..."

  -- Evidence
  file_url          TEXT,                        -- The signed PDF
  digital_signature JSONB,
  -- {ip, timestamp, user_agent, consent_text, consent_hash}

  -- Status
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'requested', 'signed', 'rejected', 'expired')),
  signed_at         TIMESTAMPTZ,
  requested_at      TIMESTAMPTZ,

  -- Soft delete + legal hold
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lien_waivers_project ON lien_waivers(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_lien_waivers_pay_app ON lien_waivers(payment_app_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_lien_waivers_status ON lien_waivers(status) WHERE status != 'signed' AND deleted_at IS NULL;
```

### 4.30 proposals (Pre-Hire Artifact)
**The explicit PLAN phase artifact.** Trust is won *before* the homeowner clicks "Assign Contractor." This table creates a first-class, shareable document generated from an execution sequence — before any project exists.

A proposal is **not** a bid amount. It's a **method statement**: "Here is exactly how we will do your job." Numbered steps, named inspections, gates that must be cleared, plain-language explanations. This shifts the buying decision from **price comparison** to **risk comparison** — which is how premium contractors win higher-margin work.

The homeowner receives a read-only link (`/proposal/[public_token]`) or a watermarked PDF. When they compare two contractors, the one with a RenoNext proposal looks objectively safer.

```sql
CREATE TABLE proposals (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_token      UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,  -- Shareable link

  -- Who and what
  contractor_id     UUID NOT NULL REFERENCES profiles(id),
  job_id            UUID REFERENCES jobs(id) ON DELETE SET NULL,      -- The job being bid on
  bid_id            UUID REFERENCES job_bids(id) ON DELETE SET NULL,  -- The associated bid
  sequence_id       UUID NOT NULL REFERENCES execution_sequences(id),

  -- Snapshot (frozen when sent — template edits don't affect sent proposals)
  sequence_version  INT NOT NULL,
  steps_snapshot    JSONB NOT NULL DEFAULT '[]',     -- Full copy of sequence_steps at send time
  ruleset_snapshot  JSONB NOT NULL DEFAULT '{}',     -- Compliance rules at send time

  -- Proposal content
  title             TEXT NOT NULL,                   -- "Foundation Waterproofing — 123 Smith St"
  cover_letter      TEXT,                            -- Contractor's personal message
  plain_language_summary TEXT,                       -- "Here's how we'll waterproof your foundation"

  -- Estimated scope (from sequence + contractor input)
  estimated_cost    DECIMAL(12,2),
  estimated_duration_days INT,
  estimated_start_date DATE,
  warranty_terms    TEXT,

  -- Energy performance (NBC §9.36 — v1.5)
  energy_tier_target INT CHECK (energy_tier_target BETWEEN 1 AND 5),
  -- 1=baseline, 2=improved, 3=high-performance, 4=very high, 5=near net-zero
  -- Contractors who specify a tier get SCI bonus. Displayed on proposal comparison.

  -- Contractor signature (signs the proposal before sending)
  contractor_signature JSONB,
  -- {signature_image_url, signed_at, ip, user_agent, consent_text}

  -- PDF artifact
  pdf_url           TEXT,                            -- Watermarked PDF (generated on send)
  pdf_generated_at  TIMESTAMPTZ,

  -- Status
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'declined', 'expired', 'withdrawn')),
  sent_at           TIMESTAMPTZ,
  viewed_at         TIMESTAMPTZ,
  accepted_at       TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,                     -- Auto-expire after X days

  -- Comparison signals (auto-populated from sequence + ruleset)
  total_inspections INT NOT NULL DEFAULT 0,          -- "This plan includes 4 inspections"
  total_gates       INT NOT NULL DEFAULT 0,          -- "8 quality checkpoints"
  compliance_score  DECIMAL(5,2),                    -- % of jurisdiction requirements met
  has_code_references BOOLEAN NOT NULL DEFAULT FALSE, -- "Aligned with Ontario Building Code"

  -- Soft delete
  deleted_at        TIMESTAMPTZ,
  deleted_by_id     UUID REFERENCES profiles(id),
  deletion_reason   TEXT,
  legal_hold        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_proposals_contractor ON proposals(contractor_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_proposals_job ON proposals(job_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_proposals_token ON proposals(public_token);
CREATE INDEX idx_proposals_status ON proposals(status) WHERE status IN ('sent', 'viewed') AND deleted_at IS NULL;
```

**The comparison language** surfaces automatically on the proposal page:

```
┌──────────────────────────────────────────────────┐
│  PROPOSAL: Foundation Waterproofing               │
│  From: ABC Contractors • Sent: Feb 10, 2026       │
│                                                    │
│  "Here's how we'll waterproof your foundation"     │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  Scope Confidence: HIGH                       │ │
│  │                                               │ │
│  │ ✓ 12 numbered steps                          │ │
│  │ ✓ 4 inspections (incl. City of Toronto)      │ │
│  │ ✓ 8 quality gates                            │ │
│  │ ✓ Aligned with OBC §9.13                     │ │
│  │ ✓ 10% statutory holdback protection          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Step 1: Site Preparation                          │
│  ⚡ "Skipping this step may void warranty"         │
│  📋 Ontario Building Code §9.13.2                  │
│  ✓ Standard industry practice                      │
│                                                    │
│  Step 2: Excavation...                             │
│  ...                                               │
└──────────────────────────────────────────────────┘
```

### 4.31 delivery_log
**Material delivery tracking with will-call pattern** (Jackson Ch 10). Every delivery is logged with condition, photos, and receiver. Will-call materials (contractor picks up from supplier) get a scheduled date and confirmation flow so nothing falls through the cracks.

```sql
CREATE TABLE delivery_log (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  description       TEXT NOT NULL,
  supplier          TEXT,
  purchase_order_ref TEXT,
  delivered_at      TIMESTAMPTZ NOT NULL,
  received_by_id    UUID REFERENCES profiles(id),
  received_by_name  TEXT,               -- Fallback for guest workers
  condition         TEXT NOT NULL CHECK (condition IN (
    'accepted', 'accepted_with_notes', 'refused'
  )),
  inspection_notes  TEXT,
  photos            JSONB NOT NULL DEFAULT '[]',
  related_task_id   UUID REFERENCES project_tasks(id) ON DELETE SET NULL,

  -- Will-call pattern (contractor picks up from supplier)
  is_will_call      BOOLEAN NOT NULL DEFAULT FALSE,
  will_call_scheduled_for DATE,
  will_call_confirmed_at TIMESTAMPTZ,
  will_call_cancelled BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_delivery_log_project ON delivery_log(project_id);
CREATE INDEX idx_delivery_log_will_call ON delivery_log(project_id, is_will_call)
  WHERE is_will_call = TRUE AND will_call_confirmed_at IS NULL AND will_call_cancelled = FALSE;
```

### 4.32 meeting_minutes
**Formal meeting documentation** (Jackson Ch 6). Construction meetings are contractual events — what's said in the pre-construction conference or weekly progress meeting can become binding. Meeting minutes with action items and attendee lists create the paper trail.

```sql
CREATE TABLE meeting_minutes (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  meeting_type      TEXT NOT NULL CHECK (meeting_type IN (
    'preconstruction_conference', 'weekly_progress',
    'subcontractor_coordination', 'safety', 'special'
  )),
  meeting_date      TIMESTAMPTZ NOT NULL,
  location          TEXT,
  attendees         JSONB NOT NULL DEFAULT '[]',
  -- [{user_id, name, company, role, present: boolean}]
  agenda            JSONB NOT NULL DEFAULT '[]',
  -- [{item_number, topic, discussion, resolution}]
  action_items      JSONB NOT NULL DEFAULT '[]',
  -- [{description, assigned_to_id, assigned_to_name, due_date, status}]
  file_url          TEXT,               -- Uploaded PDF/scan of signed minutes
  created_by_id     UUID NOT NULL REFERENCES profiles(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meeting_minutes_project ON meeting_minutes(project_id);
CREATE INDEX idx_meeting_minutes_type ON meeting_minutes(project_id, meeting_type);
```

### 4.33 permit_guides
**Region-specific building permit guidance.** Structured content that powers the Permit Advisor checklist. Each municipality has different forms, fees, processes, and quirks. Toronto is the first entry — seeded from the City of Toronto Homeowner's Guide to Building Permits.

> **v1.5 table.** Content is curated manually (not scraped). Each municipality guide is reviewed and structured once, then maintained as regulations change. The structured JSONB fields power the auto-generated checklist UI.

```sql
CREATE TABLE permit_guides (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region            TEXT NOT NULL,                -- 'toronto', 'mississauga', 'brampton', etc.
  province          TEXT NOT NULL DEFAULT 'ON',
  name              TEXT NOT NULL,                -- 'Toronto Homeowner Building Permit Guide'
  source_url        TEXT,                         -- Original PDF/page URL
  last_reviewed_at  DATE,                         -- When content was last verified

  -- Permit types issued by this municipality
  permit_types      JSONB NOT NULL DEFAULT '[]',
  -- [{type: 'BLD-SR', name: 'Small Residential Building Permit',
  --   description, required_for: ['new_house', 'addition', 'renovation']}]

  -- Required forms with download links
  required_forms    JSONB NOT NULL DEFAULT '[]',
  -- [{name: 'Application for Permit to Construct or Demolish',
  --   url, required_for: ['all'], notes, requires_bcin: false}]

  -- Required drawings by project type
  required_drawings JSONB NOT NULL DEFAULT '[]',
  -- [{name: 'Site Plan', description, required_for: ['new_house', 'addition']}]

  -- Parallel municipal approvals that catch people off guard
  parallel_approvals JSONB NOT NULL DEFAULT '[]',
  -- [{name: 'Tree Permit', agency: 'Parks, Forestry & Recreation',
  --   when_required: 'Removing or potentially damaging any trees',
  --   contact: {phone, email}, url}]

  -- Required inspections by permit type
  required_inspections JSONB NOT NULL DEFAULT '[]',
  -- [{category: 'Building', name: 'Footings',
  --   when_to_call: 'At completion of formwork, prior to pouring concrete',
  --   test_required: null}]

  -- Fee information
  fee_schedule      JSONB NOT NULL DEFAULT '{}',
  -- {new_house: {unit: 'per_sqm', notes: 'Includes decks, fireplaces, porches'},
  --  addition: {unit: 'per_sqm'}, deck: {unit: 'flat_fee'}, ...}

  -- FASTRACK eligibility
  fastrack_info     JSONB NOT NULL DEFAULT '{}',
  -- {available: true, turnaround_days: 5,
  --  eligible_projects: ['additions_under_100sqm', 'minor_interior',
  --    'second_suite', 'decks_verandas', 'garages_carports', 'basement_entrance',
  --    'pool_fence', 'fire_damage_repair', 'plumbing_residential']}

  -- Customer service / contact info
  customer_service  JSONB NOT NULL DEFAULT '{}',
  -- {phone: '416-397-5330', email: 'bldapplications@toronto.ca',
  --  locations: [{name: 'Toronto City Hall', address: '100 Queen St W', hours: '8:30-4:30'}],
  --  telepermit: {phone: '416-338-0700', note: '48-hour notice required'}}

  -- Construction tips
  tips              JSONB NOT NULL DEFAULT '[]',
  -- [{category: 'neighbours', text: 'Keep nearby residents informed'},
  --  {category: 'safety', text: 'Enclose site with protective fencing'}]

  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_permit_guides_region ON permit_guides(region, province) WHERE is_active = TRUE;
```

### 4.34 permit_applications
**Per-project permit tracking.** Each project may require multiple permits (Building, Plumbing, HVAC). This table tracks the full lifecycle from preparation through final inspection closure. Auto-populates checklists from `permit_guides` based on project municipality and type.

> **v1.5 table.** The permit workflow is: preparing → submitted → under_review → (revisions_required?) → approved → active → final_inspection → closed. Each permit tracks its own form checklist, drawing requirements, and inspection sequence.

```sql
CREATE TABLE permit_applications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  permit_guide_id   UUID REFERENCES permit_guides(id),   -- Source guide for auto-populating checklists
  permit_type       TEXT NOT NULL CHECK (permit_type IN (
    'building', 'plumbing', 'hvac', 'demolition', 'street_occupation'
  )),
  permit_number     TEXT,                         -- Assigned by city after issuance
  municipality      TEXT NOT NULL,                -- 'toronto', 'mississauga', etc.

  -- Status lifecycle
  status            TEXT NOT NULL DEFAULT 'preparing' CHECK (status IN (
    'preparing',              -- Gathering forms and drawings
    'submitted',              -- Application filed with city
    'under_review',           -- Plan examiner reviewing
    'revisions_required',     -- Compliance issues found — resubmit
    'approved',               -- Permit issued — construction may begin
    'active',                 -- Construction underway, inspections in progress
    'final_inspection',       -- Awaiting final inspection
    'closed'                  -- All inspections passed, permit closed
  )),

  -- Key dates
  submitted_at      TIMESTAMPTZ,
  issued_at         TIMESTAMPTZ,
  closed_at         TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,

  -- Form checklist (auto-populated from permit_guide, tracked per-permit)
  required_forms    JSONB NOT NULL DEFAULT '[]',
  -- [{form_name, completed: boolean, document_id: UUID|null, notes}]

  -- Drawing checklist
  required_drawings JSONB NOT NULL DEFAULT '[]',
  -- [{drawing_name, completed: boolean, document_id: UUID|null}]

  -- Parallel approvals tracker
  parallel_approvals JSONB NOT NULL DEFAULT '[]',
  -- [{approval_name, status: 'not_started'|'applied'|'approved'|'not_required',
  --   reference_number, applied_at, approved_at, notes}]

  -- Inspection tracker (per this permit)
  inspections_required JSONB NOT NULL DEFAULT '[]',
  -- [{inspection_name, status: 'pending'|'booked'|'passed'|'failed',
  --   booked_for: TIMESTAMPTZ, completed_at, inspector_notes,
  --   related_task_id: UUID|null, related_stage_id: UUID|null}]

  -- Fees
  fee_estimate      DECIMAL(10,2),
  fee_paid          DECIMAL(10,2),
  fee_receipt_url   TEXT,

  -- FASTRACK
  is_fastrack       BOOLEAN NOT NULL DEFAULT FALSE,
  fastrack_deadline  DATE,                        -- 5 business days from submission

  -- Designer info (auto-filled from pro_profiles.bcin)
  designer_bcin     TEXT,
  designer_name     TEXT,
  designer_company  TEXT,

  notes             TEXT,
  created_by_id     UUID NOT NULL REFERENCES profiles(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_permit_applications_project ON permit_applications(project_id);
CREATE INDEX idx_permit_applications_status ON permit_applications(project_id, status)
  WHERE status NOT IN ('closed');
```

### 4.35 trade_assemblies
**Parametric 3D model definitions for construction trades** (Pattern J). Each assembly defines a set of geometric primitives, configurable parameters, and linkages to sequence steps. The 3D viewer renders these as interactive layered visualizations on proposals and project dashboards.

> **v1.5 table.** In Phase 2 (v1), the waterproofing assembly is hardcoded as a TypeScript constant — no database needed. In v1.5, this table stores assemblies so contractors can customize dimensions, add trades, and platform can ship verified assemblies.

```sql
CREATE TABLE trade_assemblies (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_type        TEXT NOT NULL,                -- 'waterproofing', 'underpinning', 'concrete_footings', etc.
  name              TEXT NOT NULL,                -- 'Foundation Waterproofing — Standard'
  description       TEXT,

  -- Geometric primitives (the 3D model definition)
  primitives        JSONB NOT NULL DEFAULT '[]',
  -- [{
  --   id: 'foundation_wall',
  --   type: 'box',                    -- box, cylinder, plane, tube_path
  --   label: 'Foundation Wall',
  --   layer_order: 1,                 -- stacking order for explode view
  --   linked_step_numbers: [1, 2],    -- which sequence steps reveal this primitive
  --   geometry: {
  --     width: '{wall_length}',       -- parameter references use {param_key} syntax
  --     height: '{wall_height}',
  --     depth: '{wall_thickness}'
  --   },
  --   position: { x: 0, y: '{wall_height} / 2', z: 0 },
  --   material: {
  --     color: '#808080',
  --     opacity: 1.0,
  --     texture: 'concrete'           -- named texture from asset library
  --   },
  --   annotations: [
  --     { text: 'NBC §9.15', anchor: 'top', visible_on: 'hover' }
  --   ]
  -- }]

  -- Configurable parameters (dimensions that vary per project)
  parameters        JSONB NOT NULL DEFAULT '[]',
  -- [{
  --   key: 'wall_height',
  --   label: 'Foundation Wall Height',
  --   unit: 'mm',
  --   default_value: 2400,
  --   min: 1800,
  --   max: 3600,
  --   step: 100
  -- }]

  -- Named 2D section cut views
  section_cuts      JSONB NOT NULL DEFAULT '[]',
  -- [{
  --   name: 'Typical Wall Section',
  --   plane: { axis: 'x', position: 0.5 },
  --   camera: { position: [5, 2, 0], target: [0, 1, 0] },
  --   annotations: [{ text: 'Membrane', line_to: 'membrane_layer' }]
  -- }]

  -- Camera presets for common viewpoints
  camera_presets    JSONB NOT NULL DEFAULT '[]',
  -- [
  --   { name: 'Front', position: [0, 2, 8], target: [0, 1, 0] },
  --   { name: 'Top Down', position: [0, 10, 0.1], target: [0, 0, 0] },
  --   { name: 'Exploded', position: [4, 6, 8], target: [0, 3, 0] },
  --   { name: 'Section Cut', position: [5, 2, 0], target: [0, 1, 0] }
  -- ]

  -- Ownership & sharing
  source            TEXT NOT NULL DEFAULT 'platform'
                    CHECK (source IN ('platform', 'contractor', 'custom')),
  is_public         BOOLEAN NOT NULL DEFAULT TRUE,
  created_by_id     UUID REFERENCES profiles(id),
  version           INT NOT NULL DEFAULT 1,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trade_assemblies_trade ON trade_assemblies(trade_type) WHERE is_public = TRUE;
```

### New RLS Policies (003_project_rls.sql)

```
-- All new tables follow the same pattern:
-- Project participants (client + contractor) can SELECT
-- Contractor can INSERT/UPDATE operational tables
-- Client can INSERT/UPDATE decision tables
-- Both can INSERT timeline_events (auto-generated)
-- Admin can do everything
```

---

## 5. TypeScript Type System

### Existing types (packages/shared/src/types/)
- `user.ts` — Profile, ProProfile, ClientProfile, ProWithProfile
- `job.ts` — Job, JobBid, JobProgress, Review, Category
- `material.ts` — MaterialTemplate, JobMaterial, MaterialOrder, Tool, ToolRental
- `message.ts` — Conversation, Message, Notification

### New type files needed

**`project.ts`** — Base types + project structure:
- `SoftDeletable` — base interface for deleted_at, deleted_by_id, deletion_reason, legal_hold
- `ResponsibilitySnapshot` — {user_id, full_name, company, role, trade_license, captured_at}
- `Visibility` — union type: 'project_team' | 'client_visible' | 'contractor_only' | 'admin_only'
- `StageStatus` — 'not_started' | 'ready' | 'active' | 'blocked' | 'completed' | 'skipped'
- `CompletionCriterion` — {type, reference_id, satisfied, satisfied_at}
- `ExecutionSequence`, `SequenceStep`, `ProjectSequenceInstance`, `Proposal`
- `Project`, `ProjectStage`, `ProjectTask`, `TaskGate`, `ProjectWorker`, `SiteAttendance`

**`documents.ts`** — Document control entities:
- `RFI`, `RFIResponse`, `Submittal`, `SubmittalRevision`
- `Drawing`, `DrawingVersion`, `ProjectDocument`

**`changes.ts`** — Change management + financial evidence:
- `ChangeEvent`, `ChangeOrder`, `Decision`
- `FinancialDocument`, `CostCategory`
- `PaymentApplication`, `ScheduleOfValuesItem`, `LienWaiver`

**`reports.ts`** — Reporting + quality entities:
- `DailyReport`, `TimelineEvent`, `Inspection`, `Issue`
- `WeatherData`, `DelayRecord`

---

## 6. Page Routes & Ownership

### Existing Routes

| Route | Role | Status |
|-------|------|--------|
| `/` | Public | Built (landing) |
| `/post-job` | Client | Built |
| `/pros` | Public | Built |
| `/pros/[id]` | Public | Built |
| `/dashboard` | Client | Built (shell) |
| `/dashboard/jobs` | Client | Built |
| `/dashboard/jobs/[id]` | Client | Built |
| `/dashboard/messages` | Client | Built |
| `/dashboard/settings` | Client | Built |
| `/dashboard/wallet` | Client | Built |
| `/dashboard/site` | Client | Built (mock data, crew view only) |
| `/pro-dashboard` | Pro | Built (shell) |
| `/pro-dashboard/jobs` | Pro | Built |
| `/pro-dashboard/find-jobs` | Pro | Built |
| `/pro-dashboard/earnings` | Pro | Built |
| `/pro-dashboard/gallery` | Pro | Built |
| `/pro-dashboard/settings` | Pro | Built |
| `/pro-dashboard/wallet` | Pro | Built |
| `/pro-network` | GC | Built (mock data) |
| `/pro-network/crew` | GC | Built (shell) |
| `/pro-network/tenders` | GC | Built (shell) |
| `/pro-network/contracts` | GC | Built (shell) |
| `/pro-network/payroll` | GC | Built (shell) |
| `/pro-network/compliance` | GC | Built (shell) |
| `/pro-network/financials` | GC | Built (shell) |
| `/pro-network/subs` | GC | Built (shell) |
| `/admin` | Admin | Built (shell) |

### New Routes Needed

| Route | Role | Purpose |
|-------|------|---------|
| `/dashboard/project/[id]` | Client | **Project Command Center** — the core product screen |
| `/dashboard/project/[id]/blueprint` | Client | Execution sequence roadmap — "You are here" |
| `/dashboard/project/[id]/people` | Client | Who's on site, crew roster |
| `/dashboard/project/[id]/schedule` | Client | Gantt chart, milestones |
| `/dashboard/project/[id]/progress` | Client | Daily photos, stage descriptions |
| `/dashboard/project/[id]/materials` | Client | What's used/ordered, deliveries |
| `/dashboard/project/[id]/documents` | Client | RFIs, submittals, drawings, docs |
| `/dashboard/project/[id]/finances` | Client | Escrow, payments, cost breakdown, holdback status, lien waivers |
| `/dashboard/project/[id]/decisions` | Client | Decision inbox |
| `/dashboard/project/[id]/timeline` | Client | Auto-generated project narrative |
| `/pro-network/project/[id]` | GC | **Supervisor Command Center** |
| `/pro-network/project/[id]/blueprint` | GC | Edit execution sequence, reorder steps |
| `/pro-network/project/[id]/schedule` | GC | Gantt editor, task assignment |
| `/pro-network/project/[id]/crew` | GC | Worker management, certs, attendance |
| `/pro-network/project/[id]/rfis` | GC | RFI hub |
| `/pro-network/project/[id]/submittals` | GC | Submittal log |
| `/pro-network/project/[id]/drawings` | GC | Drawing management |
| `/pro-network/project/[id]/changes` | GC | Change events + orders |
| `/pro-network/project/[id]/issues` | GC | Deficiency tracking |
| `/pro-network/project/[id]/inspections` | GC | Inspection tracker |
| `/pro-network/project/[id]/daily-log` | GC | Daily report editor |
| `/pro-network/project/[id]/documents` | GC | All project documents |
| `/pro-network/project/[id]/finances` | GC | Expenses, budget vs actual, progress billing |
| `/pro-network/project/[id]/billing` | GC | Payment applications (Schedule of Values), lien waivers |
| `/pro-network/blueprints` | GC | **Golden Library** — manage execution sequence templates |
| `/pro-network/blueprints/[id]` | GC | Edit/create sequence template |
| `/pro-network/blueprints/generate` | GC | **Blueprint Autofill** — select trade + jurisdiction → auto-generate |
| `/pro-network/proposals` | GC | Manage sent proposals, track views/acceptance |
| `/pro-network/proposals/[id]` | GC | Create/edit proposal from sequence |
| `/pro-network/project/[id]/deliveries` | GC | **Delivery log** — track deliveries + will-call pickups |
| `/pro-network/project/[id]/site-plan` | GC | **Site logistics** — site layout, access, work hours |
| `/pro-network/project/[id]/closeout` | GC | **Closeout checklist** — punch list, docs, retainage |
| `/dashboard/project/[id]/closeout` | Client | **Client closeout view** — completion status, warranty info |
| `/dashboard/project/[id]/warranties` | Client | **Warranty tracker** — active warranties, expiry dates (Home Vault preview) |
| `/dashboard/project/[id]/permits` | Client | **Permit status** — which permits are active, next inspection, form progress |
| `/pro-network/project/[id]/permits` | GC | **Permit tracker** — manage permit applications, form checklists, inspection bookings |
| `/pro-network/permit-guides` | GC | **Permit guide browser** — view municipal permit requirements by region |
| `/proposal/[token]` | Public | **Read-only proposal view** — shareable link, no auth required |

---

## 7. Client Dashboard — Project Command Center

The single most important screen. This is the product.

### Layout

```
┌─────────────────────────────────────────────────────┐
│  ← My Projects          123 Smith St, Unit 4        │
│                          Basement Waterproofing      │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR NAV  │  MAIN CONTENT AREA                   │
│              │                                      │
│ Overview ●   │  [Selected section renders here]     │
│ Blueprint    │                                      │
│ People       │                                      │
│ Schedule     │                                      │
│ Progress     │                                      │
│ Materials    │                                      │
│ Documents    │                                      │
│ Finances     │                                      │
│ Decisions (3)│                                      │
│ Timeline     │                                      │
└──────────────┴──────────────────────────────────────┘
```

### Overview Panel (Default View)

Four sections answering the four questions:

**1. Project Health Insights** — "Am I safe?"
- Schedule confidence %
- Health indicator (on_track / at_risk / behind / critical)
- Weather / delay risks
- Material delivery status
- Scope Confidence badge (SCI: High/Medium/Low)

**2. Decisions Needed** — "Do I need to act?"
- Count badge on sidebar
- Each shows: title, cost impact, schedule impact
- Priority color coding
- **Prompt payment countdown** — "Invoice received [date]. Payment due in [X] days." (Construction Act §6.1)
- **Invoice review deadline** — "Review by [date] or auto-approved" (7-day deeming rule)

**3. Next Milestone Readiness** — "Is this normal?"
- Current stage + progress bar
- Checklist: inspections, submittals, photos, approvals
- Green/yellow/red indicators

**4. Project Timeline** — "Will this matter later?"
- Chronological auto-generated narrative
- Day markers with events
- Feeds Home Vault

---

## 8. Contractor Dashboard — Supervisor Command Center

### Layout

```
┌─────────────────────────────────────────────────────┐
│  ← My Projects          123 Smith St                │
│                          Supervisor View             │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR NAV  │  MAIN CONTENT AREA                   │
│              │                                      │
│ Overview ●   │  [Selected section renders here]     │
│ Blueprint    │                                      │
│ Schedule     │                                      │
│ Crew         │                                      │
│ Daily Log    │                                      │
│ RFIs (2)     │                                      │
│ Submittals   │                                      │
│ Drawings     │                                      │
│ Changes      │                                      │
│ Issues (1)   │                                      │
│ Inspections  │                                      │
│ Documents    │                                      │
│ Finances     │                                      │
└──────────────┴──────────────────────────────────────┘
```

---

## 9. Data Flow Map

### Pre-Execution: Sequence → Project Structure

```
CONTRACTOR CREATES SEQUENCE           CLIENT APPROVAL              SYSTEM GENERATES
───────────────────────────          ────────────────             ────────────────

Selects/creates blueprint ──────►   Client sees step-by-step
  with steps, inspections,          roadmap with plain
  crew types, durations             language descriptions
                                           │
                               Client approves ──────────────►  project_tasks (1 per step)
                               Sequence locks                   task_gates (from prerequisites)
                                                                inspections (from inspection_types)
                                                                submittals (from submittal_types)
                                                                project_stages (grouped from steps)
                                                                milestone payments (from triggers)
```

### During Execution: Contractor Input → Client Visibility

```
CONTRACTOR ACTIONS                    AUTO-GENERATED              CLIENT SEES
─────────────────                    ──────────────              ───────────

Files daily report ──────────────►  timeline_event ──────────►  Project Timeline
                                    project health update ───►  Health Panel

Signs in worker ─────────────────►  timeline_event ──────────►  "3 workers on site"
                                    site_attendance record ──►  People panel

Uploads photos ──────────────────►  timeline_event ──────────►  Progress photos
                                                                Daily summary

Submits submittal ───────────────►  decision (if approval) ──►  Decision Inbox
                                    timeline_event ──────────►  Timeline

Opens RFI ───────────────────────►  timeline_event ──────────►  Timeline
                                    (if client-relevant) ────►  Decision Inbox

Creates change event ────────────►  change_order (if $) ─────►  Decision Inbox
                                    timeline_event ──────────►  Timeline
                                    project budget update ───►  Finances

Schedules inspection ────────────►  task_gate updated ───────►  Milestone Readiness
                                    timeline_event ──────────►  Timeline

Logs issue ──────────────────────►  timeline_event ──────────►  Timeline
                                    project health update ───►  Health Panel

Completes task ──────────────────►  % complete updated ──────►  Progress bar
                                    timeline_event ──────────►  Timeline
                                    next task gates checked ─►  Milestone Readiness
                                    earned value recalc ─────►  Health Panel
```

### Pre-Hire: Compare Proposals (The Quiet Price-Shopping Killer)

```
CLIENT HAS 2+ PROPOSALS FOR SAME JOB
────────────────────────────────────

┌──────────────────────────┐  ┌──────────────────────────┐
│  Contractor A            │  │  Contractor B            │
│  ────────────            │  │  ────────────            │
│  $42,000                 │  │  $28,000                 │
│                          │  │                          │
│  ✓ 12 steps documented   │  │  ✗ No blueprint          │
│  ✓ 4 inspections         │  │  ✗ No inspections listed │
│  ✓ Code references (OBC) │  │  ✗ No code references    │
│  ✓ Holdback protection   │  │  ✗ No documentation plan │
│  ✓ 18-day timeline       │  │  ? "About 2 weeks"      │
│                          │  │                          │
│  Compliance score: 94%   │  │  Compliance score: —     │
│                          │  │                          │
│  [View Full Blueprint →] │  │  [No blueprint to view]  │
│  [Accept Proposal]       │  │  [Accept Proposal]       │
└──────────────────────────┘  └──────────────────────────┘

Data source: proposals table (steps_snapshot, total_inspections,
total_gates, compliance_score, has_code_references)
No new tables. Pure UI composition.
```

This view **never mentions price as a ranking factor**. It only surfaces *completeness* and *transparency* signals — which naturally correlates with the contractor who uses RenoNext more deeply. The homeowner draws their own conclusion.

---

## 10. Build Plan — Phased

### The v1 Cut (Non-Negotiable Discipline)

If you try to build everything in this document before charging money, you'll stall. The full 32-table architecture is the **map**, not the **territory**. v1 ships a product that can:

1. **Win jobs** (Proposals with blueprints)
2. **Show value** (Client sees progress, decisions, timeline)
3. **Collect money** (Basic milestone payments)

Everything else is v1.5/v2.

#### v1 Tables (15 tables — ship these)

```
CORE PIPELINE:
  compliance_rulesets         — powers blueprint credibility
  execution_sequences         — the product
  sequence_steps              — the product
  project_sequence_instances  — locked blueprint per project
  proposals                   — pre-hire trust artifact

PROJECT CORE:
  projects                    — anchor for everything
  project_members             — RLS foundation
  project_counters            — prevents race conditions
  project_stages              — client-facing progress unit
  project_tasks               — Gantt items
  task_gates (with bypass)    — enforced causality

VISIBILITY:
  timeline_events             — immutable audit trail
  decisions                   — unified approval inbox
  daily_reports (light)       — auto-generated summaries
```

Note: v1 uses the **existing** `payments` table (with new `project_id` FK) for basic milestone releases. No separate `payment_applications` table needed yet.

#### v1 Scope Discipline: What Helps Win the First Job?

The first 30 days must produce: **higher close rate, better clients, fewer dumb questions.** Everything else is v1.5. Cut hard:

| Feature | v1 Behavior | Why |
|---------|-------------|-----|
| **project_stages** | Auto-generated from sequence only. No manual create/edit/reorder. | Editing stages doesn't win jobs. Auto-gen from blueprint does. |
| **Baseline schedule tracking** | Columns exist (nullable), UI does not surface them. | Drift analysis helps run jobs — that's v1.5. |
| **Daily reports** | Auto-generated only (from tasks + attendance). No rich editing UI. | Contractors won't write reports in month 1. Auto-gen proves the system works. |
| **Task cost tracking** | `estimated_cost`/`actual_cost` columns exist, UI hides them. | Cost tracking helps optimize — not win the first job. |
| **Weather** | `weather` field on daily_reports is manual text only. No API integration. | Weather API is polish. A text field saying "Rain, 8°C" is fine for v1. |
| **Closeout UI** | Columns exist on projects, no dedicated closeout page in v1. | Nobody closes out in month 1. Closeout checklist is v1.5. |
| **BCIN badge** | Displayed on proposals + compare view. Auto-filled from `pro_profiles`. | BCIN is a trust signal that closes jobs. Zero-cost display. |
| **Permit tracking** | `permit_obtained` gate exists. No dedicated permit UI in v1. | Permit tracker is v1.5. The gate is enough for v1. |
| **3D assembly** | Hardcoded waterproofing assembly on proposal page. No DB table, no editor. | ONE trade, hardcoded. Table + editor is v1.5. The proposal page 3D is the sales weapon. |

> **Principle:** If it doesn't appear in the proposal, the client dashboard, or the contractor's first project setup — it's v1.5. The columns stay in the migration (zero cost, future-proof). The UI ships lean.

#### v1 UI (ship these)

| Screen | Purpose |
|--------|---------|
| `/proposal/[token]` | **Public proposal page** — this is the sales weapon |
| `/pro-network/blueprints` | **Golden Library** — browse/create/edit sequences |
| `/pro-network/blueprints/[id]` | **Blueprint editor** — step-by-step builder |
| `/pro-network/proposals/[id]` | **Proposal creator** — generate, sign, send |
| `/dashboard/project/[id]` | **Client overview** — health + decisions + timeline |
| `/dashboard/project/[id]/blueprint` | **Blueprint roadmap** — "You are here" |
| `/dashboard/project/[id]/decisions` | **Decision inbox** — pending approvals |
| `/dashboard/project/[id]/timeline` | **Timeline** — auto-generated narrative |
| `/pro-network/project/[id]` | **Supervisor overview** — task status |
| `/pro-network/project/[id]/blueprint` | **Project blueprint** — edit/lock |
| `/pro-network/project/[id]/daily-log` | **Daily log** — lightweight report |
| `/dashboard/jobs/[id]/compare` | **Compare Proposals** — side-by-side view with SCI badges (client-only) |

#### v2 Tables (15 tables — delay these)

```
DOCUMENT CONTROL (safe to postpone):
  rfis, rfi_responses, submittals, submittal_revisions,
  drawings, drawing_versions

PEOPLE & FIELD:
  project_workers, site_attendance

CHANGE MANAGEMENT:
  change_events, change_orders

QUALITY:
  inspections, issues

FINANCIAL:
  project_documents, financial_documents,
  payment_applications, lien_waivers
```

These are excellent — just not required to validate demand.

---

### Phase 1: Foundation (v1 Database + Types)
**Goal:** v1 tables exist, types defined, mock data works. Ship the skeleton.

| # | Task | Files |
|---|------|-------|
| 1.1 | ~~Write migration 006_project_management.sql (**v1: 14 tables** + indexes + triggers + auto-counter)~~ **DONE** | `packages/supabase/migrations/006_project_management.sql` |
| 1.2 | ~~Write migration 007_project_rls.sql (RLS for v1 tables using project_members — 53 policies + 5 helper functions)~~ **DONE** | `packages/supabase/migrations/007_project_rls.sql` |
| 1.3 | ~~Write migration 008_alter_existing.sql (payments project_id + milestone_number, notifications priority + batch_key, **pro_profiles BCIN fields**)~~ **DONE** | `packages/supabase/migrations/008_alter_existing.sql` |
| 1.4 | ~~Create TypeScript types — project.ts (SoftDeletable, ResponsibilitySnapshot, ExecutionSequence, SequenceStep, ComplianceRuleset, Proposal, ProjectMember, ProjectCounters, Project, ProjectStage, ProjectTask, TaskGate, Decision, TimelineEvent, DailyReport)~~ **DONE** | `packages/shared/src/types/project.ts` |
| 1.5 | ~~Update types/index.ts to export new types~~ **DONE** | `packages/shared/src/types/index.ts` |
| 1.6 | ~~Create mock data — sample waterproofing project with all v1 entities~~ **DONE** | `apps/web/lib/mock-data/project.ts` |
| 1.7 | ~~Seed data — **22 trades, 230 steps, 10 compliance rulesets** from Kent Lester book~~ **DONE** | `packages/supabase/migrations/009_seed_golden_library.sql` |

### Phase 2: The Trust Engine (Proposals + Client Dashboard)
**Goal:** Contractor can create and send a proposal. Homeowner can see the project dashboard. This is the product.

| # | Task | Route / Files |
|---|------|---------------|
| 2.1 | **Public proposal page** — read-only shareable view with comparison signals, code references, confidence nudges | `apps/web/app/proposal/[token]/page.tsx` |
| 2.2 | **Golden Library** — browse platform templates, see usage stats | `apps/web/app/pro-network/blueprints/page.tsx` |
| 2.3 | **Blueprint editor** — step-by-step sequence builder with gates, inspections, code refs | `apps/web/app/pro-network/blueprints/[id]/page.tsx` |
| 2.4 | **Proposal creator** — select sequence, add cover letter, sign, generate link | `apps/web/app/pro-network/proposals/[id]/page.tsx` |
| 2.5 | **Proposal manager** — list sent proposals, track views/acceptance | `apps/web/app/pro-network/proposals/page.tsx` |
| 2.6 | Port `SignatureCanvas` from JSA → `apps/web/components/shared/signature-pad.tsx` |
| 2.7 | Client project layout with sidebar nav | `apps/web/app/dashboard/project/[id]/layout.tsx` |
| 2.8 | Client overview — Health + Decisions + Milestone + Timeline (4 Golden Questions) | `apps/web/app/dashboard/project/[id]/page.tsx` |
| 2.9 | Decision Inbox component | `apps/web/components/project/decision-inbox.tsx` |
| 2.10 | Milestone Readiness component (task gates visualization) | `apps/web/components/project/milestone-readiness.tsx` |
| 2.11 | Project Timeline component | `apps/web/components/project/project-timeline.tsx` |
| 2.12 | Blueprint roadmap — "You are here" step visualization | `apps/web/app/dashboard/project/[id]/blueprint/page.tsx` |
| 2.13 | Decisions page — full decision inbox | `apps/web/app/dashboard/project/[id]/decisions/page.tsx` |
| 2.14 | Timeline page — full audit trail | `apps/web/app/dashboard/project/[id]/timeline/page.tsx` |
| 2.15 | **Compare Proposals** — side-by-side view for homeowners with 2+ bids on same job. **SCI badge** (High/Medium/Low) as primary comparison signal, plus: step count, inspection count, code references, holdback protection, completion estimate. No new data — pure UI composition over existing `proposals` table. Quietly kills price shopping. | `apps/web/app/dashboard/jobs/[id]/compare/page.tsx` |
| 2.16 | **SCI computation** — client-side utility that computes Scope Confidence Index from proposal data (step coverage, inspection coverage, gate coverage, code refs, payment structure, warranty terms). BCIN holder gets +5% bonus. | `apps/web/lib/utils/scope-confidence.ts` |
| 2.17 | **Prompt payment countdown** — component showing invoice receipt date, 7-day review deadline, 28-day payment due date (Construction Act §6.1). Surfaces in "Decisions Needed" panel. | `apps/web/components/project/payment-countdown.tsx` |
| 2.18 | **BCIN badge** — on proposals + contractor profile: *"Licensed Designer (BCIN #XXXXX) — prepares permit drawings in-house."* On Compare Proposals: *"No separate designer needed."* Pulls from `pro_profiles.bcin`. | `apps/web/components/shared/bcin-badge.tsx` |
| 2.19 | **3D Assembly Viewer** — raw Three.js component with rotate, explode, and step-overlay modes. Camera controls (orbit, zoom, pan). Layer highlighting on hover/click with label + code reference tooltip. Responsive (works on mobile with touch gestures). | `apps/web/components/3d/assembly-viewer.tsx` |
| 2.20 | **Waterproofing assembly (hardcoded)** — TypeScript constant defining 14 primitives (wall, footing, slab, soil, membrane, dimple board, drain tile, gravel, insulation, sump pit, radon pipe, underpin pins, bench footing, backfill) with default parameters and step linkages. No DB table needed for v1. | `apps/web/lib/assemblies/waterproofing.ts` |
| 2.21 | **Proposal 3D section** — embed Assembly Viewer on public proposal page (`/proposal/[token]`). Step timeline below the 3D view: scroll through steps, layers build up in sequence. Explode button separates layers. Section-cut toggle shows 2D detail view. | `apps/web/app/proposal/[token]/page.tsx` (enhancement) |
| 2.22 | **2D Section Cut renderer** — generate a flat orthographic view from the same assembly data. Annotation lines pointing to each layer with label + NBC code ref. Exportable as SVG/PNG for proposal PDF. | `apps/web/components/3d/section-cut.tsx` |

### Phase 3: Contractor Operations (Supervisor Dashboard)
**Goal:** Contractor can manage a project — tasks, gates, daily log. The operational side.

> **v1 cuts applied:** Stages are auto-generated from sequence (no manual editing). Daily log is auto-generated (no rich editor). Task cost fields hidden. Weather is a text field. See [v1 Scope Discipline](#v1-scope-discipline-what-helps-win-the-first-job).

| # | Task | Route / Files |
|---|------|---------------|
| 3.1 | Supervisor layout with sidebar | `apps/web/app/pro-network/project/[id]/layout.tsx` |
| 3.2 | Supervisor overview — task status, gate status, open decisions | `apps/web/app/pro-network/project/[id]/page.tsx` |
| 3.3 | Project blueprint — view/lock for active project, "Proceed at Risk" bypass (no stage editing) | `apps/web/app/pro-network/project/[id]/blueprint/page.tsx` |
| 3.4 | Task manager — update %, mark complete, assign workers (no cost fields in v1) | `apps/web/app/pro-network/project/[id]/schedule/page.tsx` |
| 3.5 | Daily log — auto-generated read-only summary (workers on site + tasks completed + manual notes field) | `apps/web/app/pro-network/project/[id]/daily-log/page.tsx` |
| 3.6 | Port `useAutoSave` from JSA → `packages/shared/src/hooks/useAutoSave.ts` |

### Phase 4: API Layer + Core Edge Functions
**Goal:** Connect v1 UI to Supabase. Real data flows.

| # | Task | Files |
|---|------|-------|
| 4.1 | API clients for v1 tables | `packages/shared/src/api/projects.ts`, `sequences.ts`, `proposals.ts` |
| 4.2 | React Query hooks for v1 entities | `packages/shared/src/hooks/useProject.ts`, `useSequences.ts`, `useProposals.ts` |
| 4.3 | Zustand store for project state + offline queue | `packages/shared/src/stores/projectStore.ts` |
| 4.4 | Edge function: **instantiate sequence** → generate tasks, gates from steps | `packages/supabase/functions/instantiate-sequence/` |
| 4.5 | Edge function: **generate timeline events** (DB triggers on major table changes) | `packages/supabase/functions/generate-timeline-event/` |
| 4.6 | Edge function: **check task gates** (on task status change) | `packages/supabase/functions/check-task-gates/` |
| 4.7 | Edge function: **generate proposal PDF** (watermarked, signed, shareable) | `packages/supabase/functions/generate-proposal-pdf/` |
| 4.8 | Edge function: **parse estimate to sequence** (PDF → LLM → draft sequence) — the Growth Hack | `packages/supabase/functions/parse-estimate-to-sequence/` |
| 4.9 | Edge function: **generate blueprint from template** (trade + jurisdiction → auto-fill) | `packages/supabase/functions/generate-blueprint/` |
| 4.10 | Job → Project auto-creation when job status = 'in_progress' | DB trigger or edge function |

### Phase 5: Integration + Ship
**Goal:** Everything connected. Data flows end-to-end. Ship v1.

| # | Task |
|---|------|
| 5.1 | Wire Decision Inbox to task_gates + milestones |
| 5.2 | Wire Timeline to auto-generated events |
| 5.3 | Basic milestone payment release (via existing payments table with project_id) |
| 5.4 | Notification triggers — critical push + digest batch |
| 5.5 | Link existing `/dashboard/site` page into project structure |
| 5.6 | Edge function: **generate daily digest** (5PM batch) |
| 5.7 | Edge function: **auto-generate daily report** (from tasks + weather) |
| 5.8 | End-to-end test: contractor creates sequence → sends proposal → client approves → project created → tasks generated → gates enforced → timeline flows → decisions appear → milestone paid |

### v1.5: Document Control + Field Operations
**Goal:** Add the engine room. RFIs, submittals, drawings, crew management, change orders.

| # | Task |
|---|------|
| v1.5.1 | Migration 010: v2 tables (rfis, rfi_responses, submittals, submittal_revisions, drawings, drawing_versions, change_events, change_orders, inspections, issues) |
| v1.5.2 | Migration 011: field operations (project_workers, site_attendance with guest support) |
| v1.5.3 | TypeScript types — documents.ts, changes.ts, reports.ts |
| v1.5.4 | Client pages — People, Schedule (Gantt), Progress, Materials, Documents, Finances |
| v1.5.5 | Contractor pages — RFI hub, Submittal log, Drawings, Changes, Issues, Inspections, Crew, Documents, Finances |
| v1.5.6 | Port AdvancedDrawingViewer from JSA (OpenSeadragon) |
| v1.5.7 | Port GPS sign-in flow from JSA patterns |
| v1.5.8 | Kiosk Mode for guest workers |
| v1.5.9 | Earned value calculations (CPI/SPI) |
| v1.5.10 | "Promote to Entity" — chat message → RFI/Issue with one click |
| v1.5.11 | Migration 012: delivery_log table + will-call tracking |
| v1.5.12 | Site logistics fields on projects + site_logistics drawing type |
| v1.5.13 | Warranty metadata on project_documents |
| v1.5.14 | Closeout checklist UI (client + contractor) |
| v1.5.15 | Baseline Gantt overlay (schedule drift visualization) |
| v1.5.16 | Delivery log UI with will-call management |
| v1.5.17 | Manual stage editing UI (create/edit/reorder stages beyond auto-gen) |
| v1.5.18 | Daily report rich editor (manual entries, photo attach, weather API) |
| v1.5.19 | Task cost tracking UI (estimated_cost, actual_cost, budget vs actual) |
| v1.5.20 | Closeout checklist UI — contractor (`/pro-network/project/[id]/closeout`) |
| v1.5.21 | Closeout view — client (`/dashboard/project/[id]/closeout`) |
| v1.5.22 | Expand Ontario compliance_rulesets with full OBC §1.3.5 mandatory inspection matrix (21 stages) |
| v1.5.23 | Prompt payment notification edge function (7-day deeming + 28-day payment reminders) |
| v1.5.24 | Invoice review deadline UI — "Review by [date] or auto-approved" (Construction Act §6.1) |
| v1.5.25 | `energy_tier_target` field on proposals — contractors specify NBC §9.36 tier (1-5); displayed on comparison view; SCI bonus for specifying |
| v1.5.26 | NBC Part 9 code reference enrichment — update all seed sequences with correct §9.x references (excavation §9.12, footings §9.15, waterproofing §9.13, drainage §9.14, insulation §9.25/§9.36) |
| v1.5.27 | Dampproofing vs waterproofing branch logic — sequence builder suggests appropriate scope based on site conditions (hydrostatic pressure = waterproofing §9.13.3; no pressure = dampproofing §9.13.2) |
| v1.5.28 | Interior moisture barrier step — auto-added to basement finishing sequences where finishes touch foundation walls (NBC §9.13.2.5, permeance limit 170 ng/(Pa·s·m²)) |
| v1.5.29 | Migration: `permit_guides` table (region-specific permit content — Pattern I Layer 2) |
| v1.5.30 | Migration: `permit_applications` table (per-project permit tracking with form/drawing/inspection checklists) |
| v1.5.31 | Seed: Toronto permit guide — forms, drawings, parallel approvals, inspections, fees, FASTRACK eligibility (from City of Toronto Homeowner's Guide) |
| v1.5.32 | Permit checklist UI — auto-generate required forms/drawings/approvals based on project type + municipality (`/pro-network/project/[id]/permits`) |
| v1.5.33 | Client permit status view — which permits are active, next inspection, what's needed (`/dashboard/project/[id]/permits`) |
| v1.5.34 | Permit guide browser — contractors view municipal requirements before starting a project (`/pro-network/permit-guides`) |
| v1.5.35 | Inspection booking reminders — 48-hour notice alerts for booked inspections, "don't cover work" warnings on relevant tasks |
| v1.5.36 | BCIN verification — edge function to verify BCIN via QuARTS registry, set `pro_profiles.bcin_verified` |
| v1.5.37 | Migration: `trade_assemblies` table + `assembly_id` FK on `execution_sequences` + `assembly_params` on `project_sequence_instances` |
| v1.5.38 | Seed: waterproofing assembly (migrate hardcoded constant to DB), underpinning assembly, concrete footings assembly |
| v1.5.39 | Assembly editor UI — contractors customize primitive dimensions, reorder layers, adjust parameters per project |
| v1.5.40 | Additional trade assemblies: insulation (wall section), roofing (roof cross-section), framing (wall assembly) |
| v1.5.41 | Parametric project config — on project creation, set actual dimensions (wall height, excavation depth, etc.) that override assembly defaults |

### v2: Financial Control + Advanced
**Goal:** Progress billing, lien protection, cost traceability, AR.

| # | Task |
|---|------|
| v2.1 | Migration 008: financial control (payment_applications, lien_waivers) |
| v2.2 | Migration 009: financial_documents, project_documents enhancements |
| v2.3 | Progress billing UI (Schedule of Values) |
| v2.4 | Lien waiver collection + status tracking |
| v2.5 | Cost Traceability (click-through cost breakdown) |
| v2.6 | Home Vault — aggregate completed project data |
| v2.7 | Quality Confidence Score |
| v2.8 | Contractor Credibility Signals |
| v2.9 | Blueprint Autofill UI |
| v2.10 | AR Layer (port from JSA: Three.js + D-pad + GPS anchors) |
| v2.11 | As-Built Package Generator |
| v2.12 | Plain-Language Mode (LLM-powered) |
| v2.13 | Silent Risk Detection |
| v2.14 | **Unified Files Table** — `files (id, project_id, bucket_path, uploaded_by_id, mime, size, hash, created_at)`. Replaces scattered `file_url`/`attachments` JSONB fields. Enables deduplication, virus scanning, storage quotas. |
| v2.15 | Migration 013: meeting_minutes table |
| v2.16 | Cost code tracking on tasks + financial_documents (CSI division mapping) |
| v2.17 | Productivity dashboard (budget vs actual by cost code) |
| v2.18 | Warranty expiry alerts edge function (feeds Home Vault notifications) |
| v2.19 | Will-call reminder notifications edge function |
| v2.20 | Project evaluation/debrief UI (lessons learned capture + export) |
| v2.21 | **Annual holdback release workflow** — anniversary detection → notice publication → 60-74 day countdown → release → cascade payment tracking (Construction Act 2026) |
| v2.22 | Cascade payment tracking — GC→sub payment deadlines with 14-day countdown after holdback release |
| v2.23 | Termination notice publication workflow (7-day requirement, Construction Act 2026) |
| v2.24 | Adjudication support — ODACC filing integration, 90-day availability window tracking |
| v2.25 | `airtightness_test_passed` gate type — links airtightness testing (3.2 ACH / 50 Pa per NBC §9.36.6) to energy tier compliance verification |
| v2.26 | Energy tier compliance checklist UI — NBC Appendix C 10-step verification (building systems, heating, cooling, airtightness, tier determination) |
| v2.27 | NBC climate zone auto-detection — lookup Heating Degree-Days by postal code from NBC Table C-2 to auto-suggest correct RSI values and energy tier thresholds |
| v2.28 | Permit form pre-fill — use project data (address, contractor BCIN, designer info, scope) to pre-fill standard municipal forms (Schedule 1, Application to Construct/Demolish, Energy Efficiency Design Summary Part 9) |
| v2.29 | Permit PDF overlay generation — generate filled PDF overlays for standard City forms using project + contractor data |
| v2.30 | Multi-municipality permit guides — Mississauga, Brampton, Markham, Vaughan, Hamilton, Ottawa (expand from Toronto) |
| v2.31 | Zoning compliance pre-check — link to municipal zoning bylaws by property address, flag potential variances before permit application |
| v2.32 | Custom trade assemblies — contractor creates assemblies from scratch using primitive builder UI |
| v2.33 | AR assembly overlay — place 3D assembly model on real-world GPS coordinates (port JSA `ForemanARPositioning` pattern). Homeowner points phone at foundation → sees planned layers overlaid on reality. |
| v2.34 | As-built vs planned comparison — overlay actual inspection photos on 3D model to show what was built vs what was planned |
| v2.35 | PDF section-cut export — auto-generate 2D construction detail drawings from assembly data for permit applications (feeds BCIN designer workflow) |

---

## Appendix A: Entity Relationship Summary

```
profiles ─────────┬──── client_profiles
                  ├──── pro_profiles ──── pro_categories
                  │
compliance_rulesets ──► execution_sequences ◆ ──── sequence_steps
  (jurisdiction rules)    (Golden Library)         (auto-generates project structure)
                               │
trade_assemblies ──────────────┘ (3D parametric model, via assembly_id FK)
                  │                   │
                  │                   └──── proposals ◆ (pre-hire artifact, public_token link)
                  │                           ├── steps_snapshot (frozen at send time)
                  │                           └── /proposal/[token] (public read-only page)
                  │
jobs ─────────────┼──── job_bids
                  ├──── job_progress
                  ├──── job_materials ──── material_orders
                  ├──── reviews
                  ├──── payments ★
                  │
                  └──── projects (1:1 with jobs)
                          │
                          ├── project_members ──► profiles (RLS anchor)
                          ├── project_counters (atomic numbering)
                          │
                          ├── project_sequence_instances ──► execution_sequences
                          │     (locked blueprint for this project)
                          │
                          ├── project_stages ◆
                          │     └── project_tasks ◆
                          │           └── task_gates
                          │
                          ├── project_workers
                          │     └── site_attendance
                          │
                          ├── rfis ◆ ●
                          │     └── rfi_responses
                          │
                          ├── submittals ◆
                          │     └── submittal_revisions
                          │
                          ├── drawings ◆
                          │     └── drawing_versions
                          │
                          ├── change_events ◆ ●
                          │     └── change_orders ◆ ●
                          │
                          ├── inspections ◆ ●
                          ├── issues ◆ ●
                          ├── daily_reports ◆
                          ├── timeline_events
                          ├── decisions ◆
                          ├── project_documents ◆
                          ├── financial_documents ◆
                          │
                          ├── payment_applications ◆ ●
                          │     └── lien_waivers ◆
                          │
                          ├── delivery_log
                          ├── meeting_minutes
                          │
                          ├── permit_applications ──► permit_guides (region content)
                          │     (form checklists, inspection tracking, fees)
                          │
                          └── payments ★ (via project_id)

  ◆ = soft delete + legal hold
  ● = responsibility snapshot
  ★ = payments has both job_id (legacy) and project_id (new flows)
```

## Appendix B: System-Wide Column Reference

These columns appear on every entity marked with the corresponding symbol above:

```sql
-- ◆ Soft Delete + Legal Hold
deleted_at        TIMESTAMPTZ,
deleted_by_id     UUID REFERENCES profiles(id),
deletion_reason   TEXT,
legal_hold        BOOLEAN NOT NULL DEFAULT FALSE

-- ● Responsibility Snapshot
responsibility_snapshot JSONB NOT NULL DEFAULT '{}'
-- {user_id, full_name, company, role, trade_license, captured_at}

-- Visibility (on rfis, issues, change_events)
visibility TEXT NOT NULL DEFAULT 'project_team'
  CHECK (visibility IN ('project_team', 'client_visible', 'contractor_only', 'admin_only'))

-- "Proceed at Risk" bypass (on task_gates)
bypassed                      BOOLEAN NOT NULL DEFAULT FALSE
bypassed_at                   TIMESTAMPTZ
bypassed_by_id                UUID REFERENCES profiles(id)
bypass_reason                 TEXT
bypass_liability_acknowledgment BOOLEAN DEFAULT FALSE
-- status becomes 'bypassed' — distinct from 'satisfied' or 'waived'
```

## Appendix C: Query Conventions

All queries MUST follow these patterns:

```sql
-- Always filter soft-deleted records
SELECT * FROM rfis WHERE project_id = $1 AND deleted_at IS NULL;

-- Legal hold check before any deletion
UPDATE rfis SET deleted_at = NOW(), deleted_by_id = $1, deletion_reason = $2
WHERE id = $3 AND legal_hold = FALSE;

-- Visibility filtering for client-facing queries
SELECT * FROM issues
WHERE project_id = $1
  AND deleted_at IS NULL
  AND visibility IN ('project_team', 'client_visible');

-- Responsibility snapshot captured at creation time
INSERT INTO rfis (..., responsibility_snapshot)
VALUES (..., jsonb_build_object(
  'user_id', auth.uid(),
  'full_name', (SELECT full_name FROM profiles WHERE id = auth.uid()),
  'company', $company,
  'role', $role,
  'trade_license', $license,
  'captured_at', NOW()
));
```

---

## Appendix D: JSA Dashboard — Reusable Assets

The **JSA Dashboard** (MJR Contractors) is a battle-tested construction site management app with 144+ components and 345+ API endpoints. It runs on a different stack (React 19 + Vite + Express) but has **already solved many of the UX problems** RenoNext needs. This appendix maps what can be ported, adapted, or used as reference.

### Direct Ports (component logic transplantable)

| JSA Asset | Target in RenoNext | What to Port | Priority |
|-----------|-------------------|--------------|----------|
| `SignatureCanvas` | lien_waivers, payment_applications, crew JSA sign-off | Canvas-based digital signature capture. RenoNext has **zero** signature infrastructure today. Needed for lien waivers (legal documents) and payment application certification. | **P0 — Phase 1** |
| `generatePDF.ts` + jsPDF | Daily reports, payment apps, change orders, lien waivers | PDF generation utility. Adapt template structure. JSA uses jsPDF + html2canvas; RenoNext should use the same pattern via Edge Functions or client-side. | **P0 — Phase 2** |
| `useAutoSave` hook | All entity creation forms (RFIs, issues, submittals, change events, daily reports) | Debounced auto-save to Supabase. Prevents data loss on construction sites (bad signal, dropped phone). | **P1 — Phase 2** |
| `ARDrawingViewer` + `ForemanARPositioning` | **3D Assembly Viewer** (Phase 2) + future AR layer (Phase 6) | Three.js model loading + D-pad positioning + GPS anchor save. Proven on iOS/Android. Uses same raw Three.js approach required by Next.js 15 (no R3F). **Phase 2:** Port camera controls, scene setup, and material system for Assembly Viewer. **Phase 6:** Add GPS anchoring for AR overlay. | **P0 — Phase 2** (viewer), **P2 — Phase 6** (AR) |
| `AdvancedDrawingViewer` (OpenSeadragon) | `drawings` + `drawing_versions` viewer | High-res PDF/drawing zoom with pinch support. Production-tested for large CAD drawings. | **P1 — Phase 3** |

### Pattern Adaptations (proven UX flows to rebuild in Next.js)

| JSA Pattern | Target in RenoNext | What to Adapt |
|-------------|-------------------|---------------|
| **GPS sign-in/out flow** | `site_attendance` | JSA captures GPS at PIN login → records sign-in with lat/lng → auto-signout at midnight. RenoNext already has `geo.ts` (Haversine + `getCurrentPosition` + `isWithinRadius`). Adapt: trigger GPS capture on worker check-in button, write to `site_attendance`, verify against project geofence. |
| **Weather tracking per day** | `daily_reports.weather` JSONB | JSA stores temp/conditions/humidity/wind per date. Port: API call to weather service on daily report creation, auto-populate weather JSONB. Consider OpenWeather or Environment Canada API. |
| **Concrete delivery tracking** | Material delivery tracking in `job_materials` | JSA tracks trucks with real-time GPS + ETA via OSRM. Adapt: use same pattern for material delivery status updates (ordered → shipped → delivered) with optional driver GPS for high-value deliveries. |
| **JSA Form (2-page hazard/control)** | `task_gates` where `gate_type = 'jsa_complete'` | JSA form = job steps + hazards (JSONB) + controls (JSONB) + crew sign-off. This is exactly the evidence structure for a JSA gate. When gate is satisfied, the signed JSA form becomes the proof artifact. |
| **Deficiency tracking** | `issues` table | JSA: log deficiency → attach photos → assign responsible → track resolution → close. Maps 1:1 to issues workflow. Reuse the card layout with severity badges and photo carousel. |
| **RFI form + status flow** | `rfis` + `rfi_responses` | JSA: Open → In Review → Resolved. RenoNext has richer status (open → responded → closed → void) plus visibility model. Adapt JSA's form layout, add plain language summary field. |
| **Safety certificates + expiry alerts** | `project_workers.certifications` JSONB | JSA shows cert name, issued date, expiry date, verified status with color-coded expiry warnings (red < 30 days, yellow < 90 days). Port the visual pattern for RenoNext's worker cert display. |
| **Incident report → investigation** | `issues` with category `safety` | JSA: report → investigate → resolve. RenoNext maps this to issues with `category = 'safety'` and `severity = 'critical'`. |
| **SiteDocuments + version history** | `project_documents` + `drawing_versions` | JSA has upload, version control, star/favorite, Tesseract.js OCR indexing. Port: version list UI, file type icons, full-text search via OCR. |
| **Toolbox meetings** | Daily report supplement or task gate evidence | JSA: attendance + topics + sign-off → PDF. In RenoNext, this becomes part of the daily report or a specific `task_gate` type for safety briefing completion. |

### Reference Only (concept alignment, no code to port)

| JSA Feature | RenoNext Equivalent | Notes |
|-------------|---------------------|-------|
| `CalendarView` (supervisor main dashboard) | Schedule page + milestone view | JSA uses calendar as primary anchor. RenoNext uses Gantt + stage progress as primary anchor — better for multi-week projects. |
| `WorkAreas` → worker assignment | `project_stages` → `project_tasks` → `assigned_worker_id` | Different hierarchy but same concept: partition work, assign people, track per-area. |
| `CommunityFeedCarousel` | `timeline_events` feed | JSA has basic activity stream. RenoNext has richer event typing and client visibility controls. |
| `MaterialRequestForm` | Material ordering flow (`job_materials` → `material_orders`) | Already exists in RenoNext schema. JSA's simple request/approve UX can inform the UI. |
| PIN-based auth (no passwords) | Supabase Auth | **Do not port.** RenoNext uses proper auth. However, consider: for **field workers** (project_workers who aren't platform users), a simplified sign-in (e.g., QR code scan at site entrance) could be valuable in v2. |

### What RenoNext Already Has That JSA Doesn't

| Capability | RenoNext | JSA |
|-----------|----------|-----|
| Execution Blueprints (pre-project planning) | Full schema | None |
| Progress billing + holdbacks | `payment_applications` | None |
| Lien waiver collection | `lien_waivers` | None |
| Change management (events → orders) | Full 2-table workflow | None |
| Submittal approval workflow | Full schema with revisions | None |
| Decision inbox (unified approvals) | `decisions` table | None |
| Visibility model (4-tier access) | Per-entity visibility | None |
| Soft deletion + legal hold | System-wide | None |
| Responsibility snapshots | System-wide | None |
| "Proceed at Risk" (gate bypass with liability) | `task_gates.bypassed` | None |
| Compliance rulesets (jurisdiction-specific) | `compliance_rulesets` | None |
| Home Vault (permanent property record) | Future | None |
| Client-facing plain language mode | `plain_language_summary` on every entity | None |

### Migration Priority for Build Plan

**Phase 1 additions** (when writing 003_project_management.sql):
- No JSA code needed — pure SQL + types

**Phase 2 additions** (Client Dashboard — these JSA ports make the dashboard functional):
1. Port `SignatureCanvas` → `apps/web/components/shared/signature-pad.tsx`
2. Port `useAutoSave` → `packages/shared/src/hooks/useAutoSave.ts`
3. Create `generatePDF` utility → `apps/web/lib/pdf/` (adapt from JSA's jsPDF pattern)
4. Port photo carousel pattern → `apps/web/components/shared/photo-carousel.tsx`
5. Port cert expiry badge pattern → `apps/web/components/project/worker-cert-badge.tsx`
6. Port Three.js camera controls + scene setup from JSA → `apps/web/components/3d/assembly-viewer.tsx` (Pattern J)
7. Create waterproofing assembly constant → `apps/web/lib/assemblies/waterproofing.ts` (14 primitives, hardcoded for v1)

**Phase 3 additions** (Contractor Dashboard — these JSA ports power the supervisor tools):
1. Port `AdvancedDrawingViewer` → `apps/web/components/project/drawing-viewer.tsx`
2. Adapt GPS sign-in flow → `apps/web/components/project/site-checkin.tsx`
3. Adapt weather auto-populate → `apps/web/lib/weather.ts`
4. Port deficiency card layout → `apps/web/components/project/issue-card.tsx`
5. Adapt JSA form structure → `apps/web/components/project/jsa-form.tsx`

**Phase 6** (AR):
1. Port `ForemanARPositioning` + `ARDrawingViewer` → `apps/web/components/ar/`
2. Already compatible: RenoNext uses raw Three.js (no R3F), same as JSA's approach

---

*This document is the single source of truth. Update it as the build progresses.*
