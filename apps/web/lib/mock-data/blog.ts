export type BlogCategory = 'tips' | 'how-to' | 'case-study' | 'industry-news';

export interface BlogPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  replies: BlogComment[];
}

export const categoryLabels: Record<BlogCategory, string> = {
  tips: 'Tips & Tricks',
  'how-to': 'How-To Guides',
  'case-study': 'Case Studies',
  'industry-news': 'Industry News',
};

export const categoryColors: Record<BlogCategory, string> = {
  tips: 'bg-blue-50 text-blue-700 ring-blue-200/50',
  'how-to': 'bg-green-50 text-green-700 ring-green-200/50',
  'case-study': 'bg-purple-50 text-purple-700 ring-purple-200/50',
  'industry-news': 'bg-amber-50 text-amber-700 ring-amber-200/50',
};

export const mockBlogPosts: BlogPost[] = [
  // ── Launch articles (RenoNext Team) ──────────────────────────────
  {
    id: 'launch-1',
    authorId: 'renonext',
    authorName: 'RenoNext Team',
    authorAvatar: '/logo-icon.svg',
    authorHeadline: 'RenoNext — Renovation, Reinvented',
    title: 'Why Renovation Escrow Protects Your Money (and Your Sanity)',
    slug: 'why-renovation-escrow-protects-your-money',
    excerpt:
      'Handing a contractor a $30,000 deposit and hoping for the best? There\'s a better way. Learn how bank-held escrow accounts protect every dollar of your renovation budget.',
    content: `# Why Renovation Escrow Protects Your Money (and Your Sanity)

Picture this: you've just handed a contractor a $30,000 deposit for your basement renovation. Two weeks later, they've ghosted you, the materials never arrived, and your money is gone. This nightmare scenario plays out across Ontario more often than most homeowners realize — and it's entirely preventable with one financial tool: **renovation escrow**.

## What Is Renovation Escrow?

Renovation escrow is a financial arrangement where your project funds are held by a neutral third party — typically a bank or trust company — rather than paid directly to the contractor upfront. The money is released in stages as the contractor completes agreed-upon milestones.

Think of it as a referee holding the prize money until both sides have delivered. Nobody gets paid until the work is actually done and verified.

### How It Works

1. **Homeowner deposits funds** into the escrow account before work begins
2. **Contractor and homeowner agree on milestones** (e.g., demolition complete, framing done, final inspection passed)
3. **Work is completed and verified** at each stage
4. **Funds are released** from escrow to the contractor after milestone approval
5. **Process repeats** until the project is finished

## The Ontario Renovation Problem

Ontario homeowners face a unique challenge: unlike lawyers, doctors, or engineers, general contractors aren't regulated by a provincial body. There's no mandatory licensing system, no professional standards board, and limited recourse when things go wrong.

Consumer protection agencies across Ontario receive thousands of renovation-related complaints annually, with advance payment fraud and abandoned projects ranking among the most common issues.

The current system essentially operates on trust and hope — two things that shouldn't protect your life savings.

## Paying Contractors Directly: The Risks

### Upfront Payment Disasters

Traditional contractor payment structures often require substantial deposits — sometimes 30 to 50% of the total project cost. This creates several problems:

**Incentive Misalignment** — Once a contractor has your money, they have less urgency to complete your project. Your kitchen renovation might get deprioritized while they chase new deposits from other homeowners.

**Disappearing Act** — Bad actors can collect multiple large deposits, complete minimal work, and vanish. By the time you realize something's wrong, they've moved on.

**Pyramiding** — Even honest contractors can run into financial trouble. If they use your deposit to pay debts from previous projects, you're funding someone else's renovation while yours hasn't started.

## How Escrow Changes Everything

### Milestone-Based Protection

Properly structured escrow accounts release funds only when specific, measurable milestones are achieved:

| Milestone | Payment Released |
|-----------|-----------------|
| Permits pulled, demolition complete | 15% |
| Rough-in inspections passed | 25% |
| Drywall and flooring installed | 25% |
| Fixtures and finishes complete | 25% |
| Final inspection passed | 10% |

### Bank-Held Security

RenoNext uses **bank-held escrow accounts**, which means your renovation funds are held by a federally regulated financial institution — not a person, not a company, but a bank. This provides:

- **Regulatory Protection** — Banks are subject to strict oversight and insurance requirements
- **Separation of Funds** — Your money is segregated from operational business accounts
- **Neutral Third Party** — The bank has no incentive to favour contractor or homeowner
- **Professional Administration** — Financial institutions have established dispute resolution procedures

## What Good Contractors Say

Here's a truth that surprises many homeowners: reputable contractors *support* escrow arrangements. Why?

- They know they'll get paid promptly when work is complete
- They avoid cash flow nightmares from chasing late payments
- They benefit from dispute resolution if homeowners make unreasonable demands
- They stand out from bad actors who avoid accountability

**If a contractor refuses to work with escrow, that's a red flag.**

## The Ontario Holdback Requirement

Ontario's Construction Act requires a 10% holdback on most construction projects, retained for 45–60 days after substantial completion to protect against liens. While this provides some protection, it only covers the final 10% — escrow protects the entire project amount throughout the process.

## How RenoNext Makes Escrow Simple

Setting up traditional escrow can be complex and expensive, which is why many homeowners skip it. RenoNext built milestone-based escrow directly into every project:

1. **Automatic Setup** — Escrow accounts are created when you start a project
2. **Bank-Held Security** — Funds held by regulated financial institutions
3. **Clear Milestones** — Work scopes include predefined, measurable milestones
4. **Photo Verification** — Contractors submit proof of completion for each stage
5. **Fast Releases** — Payments released within 24–48 hours once verified

Your home is likely your largest asset. Protecting the money you invest in improving it isn't paranoia — it's common sense.`,
    category: 'how-to',
    tags: ['escrow', 'renovation', 'homeowner-protection', 'payments', 'ontario'],
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
    upvotes: 0,
    downvotes: 0,
    commentCount: 0,
    createdAt: '2026-03-18',
    updatedAt: '2026-03-18',
  },
  {
    id: 'launch-2',
    authorId: 'renonext',
    authorName: 'RenoNext Team',
    authorAvatar: '/logo-icon.svg',
    authorHeadline: 'RenoNext — Renovation, Reinvented',
    title: 'What Is HouseFax? The Permanent Record Your Home Deserves',
    slug: 'what-is-housefax-permanent-record-your-home-deserves',
    excerpt:
      'When you buy a used car, you ask for the Carfax. Why doesn\'t your home — worth 10 to 20 times more — have the same thing? Meet HouseFax.',
    content: `# What Is HouseFax? The Permanent Record Your Home Deserves

When you buy a used car, you ask for the Carfax report. You want to know if it's been in accidents, how it was maintained, whether the oil changes happened on schedule.

Now ask yourself: **why doesn't your home have the same record?**

Your house is worth 10 to 20 times more than any car you'll ever own, yet there's no standardised way to prove its renovation history, verify the quality of work done, or show future buyers that everything was built to code by licensed professionals.

Until now.

## The Information Gap in Real Estate

### What Buyers Don't Know

When you tour a house, you see finished surfaces: fresh paint, new flooring, an updated kitchen. What you *don't* see:

- Whether that beautiful basement has proper waterproofing
- If the electrical panel upgrade was done by a licensed electrician or a handyman
- Whether permits were pulled for structural changes
- What materials are behind the drywall
- If the roof was installed correctly or is a leak waiting to happen

### What Sellers Can't Prove

Imagine you spent $80,000 on a proper basement renovation: licensed trades, all permits, spray foam insulation, proper drainage. Your neighbour spent $35,000 with a cash contractor and cut every corner.

When you both sell, how do buyers tell the difference? They can't. Both basements look finished. The market treats you the same because the information simply doesn't exist in a verifiable format.

## What Is HouseFax?

HouseFax is a comprehensive, verified record of work done on a property, including:

**Verified Photos** — Time-stamped images of work in progress, showing what's behind the walls before they're closed up.

**Licensed Trade Verification** — Confirmation that electricians, plumbers, and other specialists were properly licensed and insured.

**Material Records** — Documentation of what was actually installed — not just "insulation" but "spray foam, R-20 rating, installed March 2026."

**Permit Documentation** — Records of building permits pulled, inspections passed, and code compliance verified.

**Inspection Reports** — Professional inspection results tied to specific work milestones.

### What Gets Recorded

| Milestone | What's Recorded | Verification |
|-----------|-----------------|--------------|
| Pre-Construction | Site photos, existing conditions | Timestamp, GPS |
| Permits | Building permit numbers, inspection schedules | Municipal records |
| Rough-In | Behind-wall photos of framing, electrical, plumbing | Licensed trade confirmation |
| Inspections | Pass/fail results, inspector notes | Municipal inspection records |
| Materials | Product specs, installation dates, warranties | Contractor submission |
| Final Completion | Completion photos, final inspection | Multiple verification points |

## Why HouseFax Increases Home Value

### Buyer Confidence Premium

Research consistently shows that buyers pay premiums for certainty. When buyers see a complete HouseFax:

- **Risk Reduction** — Verified records eliminate the fear of hidden problems
- **Faster Decisions** — Confident buyers make faster offers with fewer conditions
- **Competitive Differentiation** — In multiple-offer situations, the house with a HouseFax stands out

### Insurance Benefits

A HouseFax can reduce insurance premiums by proving electrical and plumbing systems are up to code, simplify claims with pre-loss documentation, and prevent coverage denials due to unpermitted work.

### Refinancing Advantages

Banks want to verify your home's value when refinancing. A HouseFax provides documentation supporting higher appraisals and proof that renovations were permitted and code-compliant.

## HouseFax vs. Home Inspections

| Feature | Home Inspection | HouseFax |
|---------|----------------|----------|
| **Timing** | Single point in time (during sale) | Continuous record built over ownership |
| **Scope** | Visible conditions only | Behind-wall documentation + visible |
| **Verification** | Inspector opinion | Licensed trade confirmation + permits |
| **History** | No historical information | Complete renovation timeline |
| **Future Value** | Report for one transaction | Permanent record that adds value over time |

Think of HouseFax as the maintenance records and Carfax report, while home inspections are the pre-purchase mechanical check. Both are valuable — they serve different purposes.

## How HouseFax Is Built Through RenoNext

The easiest way to build a HouseFax is automatically through a RenoNext renovation project:

1. **Project Start** — HouseFax record is created and linked to your property address
2. **Milestone Photos** — Contractors upload verified photos at each project stage
3. **Trade Verification** — Licensed professional credentials are confirmed and recorded
4. **Permit Integration** — Building permit data is pulled from municipal systems
5. **Inspection Records** — Results are added as they occur
6. **Final Documentation** — Completed project details are sealed and added to the permanent record

The homeowner doesn't need to do anything — the record builds automatically as the project progresses.

## The Transparency Revolution

HouseFax creates a fundamental shift in how renovation quality affects property values:

**Good Work Gets Rewarded** — Homeowners who invest in proper renovations will finally see that investment reflected in sale prices.

**Bad Work Gets Exposed** — Properties with unpermitted work or poor-quality renovations will face pricing pressure.

**Contractor Accountability** — When work becomes part of a permanent record, contractors have stronger incentives to do things right the first time.

If you're planning any renovation in 2026, you're not just improving your home — you're building a permanent record that will add value for decades. That's what HouseFax delivers, and that's why it's the permanent record your home deserves.`,
    category: 'industry-news',
    tags: ['housefax', 'property-record', 'renovation-history', 'home-value', 'transparency'],
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=400&fit=crop',
    upvotes: 0,
    downvotes: 0,
    commentCount: 0,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-15',
  },
  {
    id: 'launch-3',
    authorId: 'renonext',
    authorName: 'RenoNext Team',
    authorAvatar: '/logo-icon.svg',
    authorHeadline: 'RenoNext — Renovation, Reinvented',
    title: 'How to Vet a Contractor in Ontario: The Complete 2026 Checklist',
    slug: 'how-to-vet-contractor-ontario-complete-checklist',
    excerpt:
      'Hiring a contractor is one of the biggest financial decisions you\'ll make. Here\'s the step-by-step checklist every Ontario homeowner should follow before signing anything.',
    content: `# How to Vet a Contractor in Ontario: The Complete 2026 Checklist

Hiring a contractor in Ontario isn't like buying a product online. You're inviting someone into your home, trusting them with tens of thousands of dollars, and depending on their expertise to modify your largest asset correctly and safely.

Get it wrong, and you're facing incomplete work, code violations, legal disputes, or dangerous conditions. Get it right, and you've found a professional partner who'll deliver quality work on time and on budget.

## Step 1: Verify WSIB Clearance

The Workplace Safety and Insurance Board (WSIB) provides injury insurance for workers in Ontario. If a contractor doesn't have WSIB coverage and someone gets hurt on your property, **you could be held financially responsible** for their medical costs and lost wages.

### How to Check

1. Ask for their WSIB clearance certificate (should be recent)
2. Verify directly with WSIB at 1-800-387-0750 or online
3. Confirm it covers the specific work they'll be doing
4. Check the expiration date

**Red Flag:** If a contractor claims they "don't need WSIB" or offers to "work around" requirements, walk away.

## Step 2: Confirm Liability Insurance

General liability insurance protects you if the contractor damages your property or causes injury during the renovation. Minimum coverage: **$2 million**.

### Verification Process

1. Request a Certificate of Insurance from their insurance broker (not the contractor)
2. Confirm your project address is listed as additional insured
3. Check coverage dates span your project timeline
4. Call the insurance company directly to verify the policy is active

## Step 3: Verify Trade Licences

Ontario doesn't have universal contractor licensing, but specific trades require licences:

| Trade | Licensing Body | How to Verify |
|-------|---------------|---------------|
| Electrical | ESA (Electrical Safety Authority) | esasafe.com or 1-877-372-7233 |
| Gas Fitting | TSSA (Technical Standards & Safety Authority) | tssa.org or 1-877-682-8772 |
| HVAC (refrigerant) | TSSA | tssa.org |
| General Contractor | Municipal | Your city's licensing department |

### Building Permits

For structural work, additions, or major renovations, building permits are required under the Ontario Building Code. Your contractor should:

- Know when permits are required
- Handle the permit application process
- Be familiar with local inspection schedules

**Warning:** If a contractor suggests skipping permits to "save money," that's a dealbreaker. Unpermitted work can make your home uninsurable, create liability during future sales, and result in forced removal plus municipal fines.

## Step 4: Check References and Past Work

Don't just collect phone numbers — actually call them.

### Questions to Ask References

1. "Was the project completed on time and on budget?"
2. "How did the contractor handle unexpected issues?"
3. "Would you hire them again?"
4. "How was communication throughout the project?"
5. "Were there any warranty issues, and how were they handled?"

### Red Flags

- References seem scripted or overly rehearsed
- You can't reach references (disconnected numbers)
- Only relatives or friends provided
- Contractor refuses to provide references for "privacy reasons"

## Step 5: Review the Written Contract

A professional contractor will provide a detailed written contract. Essential elements:

**Scope of Work** — Detailed description including specific materials, fixtures, and finishes.

**Payment Schedule** — Clear milestones tied to work completion. Never more than 10% deposit upfront.

**Timeline** — Start date, estimated completion date, and process for handling delays.

**Warranty** — What's covered, for how long, and how claims are handled.

**Change Order Process** — How changes to the scope will be priced and approved in writing.

**Permits** — Who obtains them, who pays, and confirmation that required inspections will be completed.

### Contract Red Flags

- Verbal agreement only
- Large upfront deposits (30%+)
- Vague descriptions like "renovate kitchen"
- No payment schedule tied to milestones
- Pressure to sign immediately

## Step 6: Verify Business Legitimacy

1. **Business Registration** — Search the Ontario business registry
2. **Business Address** — Verify it's real (not just a P.O. box)
3. **Online Presence** — Professional website, Google Business profile
4. **Years in Business** — How long under their current name?

## Step 7: Check for Complaints

**Where to Search:**

- **Better Business Bureau** — Rating and complaint history
- **Ontario Consumer Protection** — Violations or enforcement actions
- **Google Reviews** — Look for patterns, not just star ratings
- **Court Records** — For large projects, consider searching for judgments or liens

Look for **patterns**, not individual complaints. How the contractor responds to negative reviews tells you more than the review itself.

## Step 8: Trust Your Instincts

**Good Signs:**
- Arrives on time for estimates
- Listens carefully and asks clarifying questions
- Provides detailed written estimates without pressure
- Points out potential issues you hadn't considered
- Responds to messages within 24 hours

**Red Flags:**
- Pressure tactics ("this price is only good today")
- Dismissive of your questions
- Pushes for cash payments
- Badmouths previous clients or competitors
- Can't explain their approach

## Ontario-Specific Considerations

### Construction Act Holdback

Ontario's Construction Act gives contractors, subcontractors, and suppliers the right to place liens on your property if they're not paid. Protect yourself by retaining the statutory 10% holdback for 45–60 days after substantial completion.

### Tarion Warranty

If your renovation involves building new living space (an addition), you may fall under Tarion warranty requirements. Verify whether your contractor is Tarion-registered if this applies.

## The Quick-Reference Checklist

**Documentation:**
- ☐ WSIB clearance certificate verified
- ☐ Certificate of insurance received and confirmed
- ☐ Trade licences verified (ESA, TSSA, municipal)
- ☐ Business registration confirmed
- ☐ Written contract reviewed
- ☐ Building permit plan confirmed

**Due Diligence:**
- ☐ Three references contacted and checked
- ☐ Past work viewed (if possible)
- ☐ BBB, Google reviews checked
- ☐ Ontario Consumer Protection search done
- ☐ Business address and phone verified

**Project Planning:**
- ☐ Detailed scope of work documented
- ☐ Payment schedule tied to milestones
- ☐ Timeline with start and completion dates
- ☐ Warranty terms clearly stated
- ☐ Change order process defined

## The RenoNext Shortcut

Following this complete checklist takes 10–20 hours of research per contractor. RenoNext pre-verifies all these checkpoints for every pro on the platform:

✓ WSIB clearance verified and current
✓ Liability insurance confirmed ($2M+ coverage)
✓ Trade licences verified for specialised work
✓ Identity verification completed
✓ Business registration confirmed
✓ Work quality reviewed through past projects

When you hire through RenoNext, the vetting is already done. You can focus on finding the right fit for your project rather than spending weeks verifying credentials.

Professional contractors expect these questions and welcome the scrutiny. Anyone who's defensive about verification isn't someone you want working on your home.`,
    category: 'tips',
    tags: ['contractor-vetting', 'ontario', 'checklist', 'hiring', 'due-diligence', 'wsib', 'insurance'],
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    upvotes: 0,
    downvotes: 0,
    commentCount: 0,
    createdAt: '2026-03-10',
    updatedAt: '2026-03-10',
  },
  // ── Community contributor articles ───────────────────────────────
  {
    id: 'b1',
    authorId: '1',
    authorName: 'Marcus Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    authorHeadline: 'Licensed Electrician - 15 Years Experience',
    title: '5 Signs Your Home Needs an Electrical Panel Upgrade',
    slug: '5-signs-home-needs-electrical-panel-upgrade',
    excerpt: 'Is your home\'s electrical panel keeping up with modern demands? Here are the top warning signs that it\'s time for an upgrade, plus what to expect during the process.',
    content: `# 5 Signs Your Home Needs an Electrical Panel Upgrade

Your electrical panel is the heart of your home's power system. As a licensed electrician with 15 years of experience, I've seen countless homes with outdated panels struggling to keep up with modern electrical demands.

## 1. Frequent Circuit Breaker Trips

If your breakers trip regularly, it's not just annoying — it's a warning sign. Modern homes draw significantly more power than homes built 20-30 years ago. Between home offices, EV chargers, and smart appliances, your 100-amp panel might not cut it anymore.

**What to look for:**
- Breakers tripping when you run multiple appliances
- Having to choose between running the dryer or the microwave
- Breakers that won't stay reset

## 2. Flickering or Dimming Lights

When your lights dim as the AC kicks on or flicker when you plug in a vacuum, your panel is telling you it's overloaded. This isn't just about comfort — it can damage sensitive electronics.

## 3. Your Panel Still Has Fuses

If your home still uses a fuse box instead of circuit breakers, it's definitely time for an upgrade. Fuse panels haven't been installed since the 1960s and don't meet modern safety codes. Insurance companies may also charge higher premiums for homes with fuse panels.

## 4. You're Planning Major Renovations

Adding a home addition, finishing the basement, or installing an EV charger? These all require additional circuits and likely more amperage than your current panel can supply. A 200-amp panel is now the standard for most homes.

## 5. Burn Marks or Strange Smells

This is the most urgent sign. If you notice:
- Burn marks or discoloration on the panel
- A burning smell near the panel
- Warm or hot panel cover
- Buzzing sounds

**Stop reading and call an electrician immediately.** These are fire hazards.

## What to Expect During an Upgrade

A typical panel upgrade from 100A to 200A takes about 6-8 hours and costs between $2,500-$4,500 in the Toronto area. The process involves:

1. Disconnecting power (your hydro company will need to be involved)
2. Removing the old panel
3. Installing the new panel with modern breakers
4. Reconnecting all circuits
5. ESA inspection

## The Bottom Line

Don't wait for a problem to become an emergency. If you're experiencing any of these signs, get a professional assessment. Most electricians offer free inspections, and the peace of mind is worth it.

*Have questions about your electrical panel? Drop a comment below or reach out to me directly through RenoNext.*`,
    category: 'tips',
    tags: ['electrical', 'home-safety', 'panel-upgrade', 'electrical-panel'],
    coverImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=400&fit=crop',
    upvotes: 47,
    downvotes: 2,
    commentCount: 12,
    createdAt: '2024-11-20',
    updatedAt: '2024-11-20',
  },
  {
    id: 'b2',
    authorId: '2',
    authorName: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
    authorHeadline: 'Master Plumber - Toronto & GTA',
    title: 'How to Prevent Frozen Pipes This Winter: A Toronto Homeowner\'s Guide',
    slug: 'prevent-frozen-pipes-winter-toronto-guide',
    excerpt: 'Toronto winters are brutal on your plumbing. Learn the essential steps every homeowner should take before the first freeze to protect their pipes and avoid costly repairs.',
    content: `# How to Prevent Frozen Pipes This Winter

Toronto's freeze-thaw cycles are notorious for wreaking havoc on residential plumbing. After 12 years of emergency calls during cold snaps, I've put together this comprehensive guide to help you protect your home.

## Why Frozen Pipes Are Dangerous

When water freezes, it expands by about 9%. In a closed pipe, this creates enormous pressure — up to 2,000 PSI — which can easily burst copper, PVC, or even steel pipes. A single burst pipe can release hundreds of gallons of water per hour.

## Prevention Checklist

### Before the Freeze

1. **Insulate exposed pipes** in unheated areas (garage, crawlspace, attic)
2. **Disconnect garden hoses** and shut off exterior faucets
3. **Seal air leaks** around pipes where they enter the house
4. **Know your main shutoff valve** location (this is critical in emergencies)

### During Cold Snaps (-15°C or colder)

1. **Let faucets drip** slightly on exterior walls
2. **Open cabinet doors** under kitchen and bathroom sinks
3. **Keep thermostat at 18°C minimum**, even when away
4. **If leaving town**, consider draining the system or having someone check daily

## What To Do If Pipes Freeze

Don't panic, but act quickly:

1. Turn off the water at the main shutoff
2. Open the faucet the frozen pipe supplies
3. Apply gentle heat (hair dryer, heat lamp — NEVER an open flame)
4. Call a plumber if you can't locate or thaw the pipe

## Cost of Prevention vs. Repair

| Prevention | Cost |
|-----------|------|
| Pipe insulation | $50-150 |
| Faucet covers | $10-30 |
| Heat tape | $30-80 |

| Repair | Cost |
|--------|------|
| Burst pipe repair | $500-2,500 |
| Water damage restoration | $3,000-10,000+ |
| Emergency weekend call | $200-400 (just the visit) |

The math speaks for itself.

*Stay warm and keep those pipes flowing! Questions? I'm happy to help in the comments.*`,
    category: 'how-to',
    tags: ['plumbing', 'winter', 'maintenance', 'pipes', 'toronto'],
    coverImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=400&fit=crop',
    upvotes: 89,
    downvotes: 3,
    commentCount: 24,
    createdAt: '2024-11-15',
    updatedAt: '2024-11-18',
  },
  {
    id: 'b3',
    authorId: '3',
    authorName: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    authorHeadline: 'General Contractor & Renovation Specialist',
    title: 'From Dated to Modern: A Complete Kitchen Renovation Case Study',
    slug: 'dated-to-modern-complete-kitchen-renovation-case-study',
    excerpt: 'Follow along as we transform a 1990s kitchen into a modern open-concept space. Includes timeline, budget breakdown, and lessons learned.',
    content: `# From Dated to Modern: A Complete Kitchen Renovation

## The Challenge

The homeowners had a typical 1990s Toronto kitchen: closed off from the living area, oak cabinets, laminate countertops, and fluorescent lighting. They wanted an open-concept, modern kitchen suitable for entertaining.

## The Plan

- Remove wall between kitchen and living room (after confirming it wasn't load-bearing)
- New custom cabinetry (shaker style, white)
- Quartz countertops
- New plumbing for island sink
- Updated electrical for island outlets and under-cabinet lighting
- Hardwood flooring to match living area

## Timeline

| Week | Work Completed |
|------|---------------|
| 1 | Demolition, wall removal, structural header |
| 2 | Rough plumbing and electrical |
| 3 | Drywall, mudding, sanding |
| 4 | Flooring installation |
| 5 | Cabinet installation |
| 6 | Countertops, backsplash, fixtures |
| 7 | Final touches, painting, punch list |

## Budget Breakdown

| Category | Budget | Actual |
|----------|--------|--------|
| Cabinets | $12,000 | $13,200 |
| Countertops | $5,000 | $4,800 |
| Appliances | $6,000 | $6,500 |
| Plumbing | $3,000 | $3,400 |
| Electrical | $2,500 | $2,800 |
| Flooring | $3,000 | $2,900 |
| Labour | $15,000 | $16,500 |
| **Total** | **$46,500** | **$50,100** |

## Lessons Learned

1. **Always add 10-15% contingency** — we went 8% over budget
2. **Order materials early** — the countertop had a 4-week lead time
3. **Expect the unexpected** — we found knob-and-tube wiring behind the wall that needed replacing
4. **Communication is key** — weekly check-ins with homeowners prevented misunderstandings

The homeowners were thrilled with the result and the open layout completely changed how they use their home.

*Thinking about a kitchen reno? I'm happy to answer questions in the comments!*`,
    category: 'case-study',
    tags: ['renovation', 'kitchen', 'before-after', 'budgeting'],
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
    upvotes: 63,
    downvotes: 1,
    commentCount: 18,
    createdAt: '2024-11-10',
    updatedAt: '2024-11-10',
  },
  {
    id: 'b4',
    authorId: '4',
    authorName: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    authorHeadline: 'Interior Designer & Home Stager',
    title: 'Small Space, Big Impact: Bathroom Design Tips for Toronto Condos',
    slug: 'small-space-big-impact-bathroom-design-tips-toronto-condos',
    excerpt: 'Living in a Toronto condo doesn\'t mean your bathroom has to feel cramped. Here are my top design strategies for maximizing style and function in compact bathrooms.',
    content: `# Small Space, Big Impact: Bathroom Design Tips for Toronto Condos

Toronto condo bathrooms are notoriously compact. But with the right design choices, even a 5x8 bathroom can feel spacious and luxurious.

## 1. Go Light and Bright

- Use large-format tiles (24x24 or larger) to reduce grout lines
- Choose light colours that reflect light
- Install proper vanity lighting at face height

## 2. Float Everything

Wall-mounted vanities and toilets create visual floor space. This single change can make a bathroom feel 30% larger.

## 3. Glass Over Curtains

A frameless glass shower panel instantly modernizes and opens up the space. Skip the shower curtain — it visually divides the room.

## 4. Smart Storage Solutions

- Recessed medicine cabinet (gain 4" of depth)
- Shower niche instead of hanging caddy
- Over-toilet shelving or cabinet
- Vanity with drawers, not doors

## 5. Statement Pieces

In a small space, one bold choice makes all the difference:
- A patterned floor tile
- A unique vessel sink
- A dramatic mirror shape
- Matte black fixtures

The key is picking ONE statement element and keeping everything else simple.

*Working on a condo bathroom? Let me know your challenges in the comments!*`,
    category: 'tips',
    tags: ['interior-design', 'bathroom', 'condo', 'small-space', 'toronto'],
    coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=400&fit=crop',
    upvotes: 35,
    downvotes: 4,
    commentCount: 9,
    createdAt: '2024-11-05',
    updatedAt: '2024-11-05',
  },
  {
    id: 'b5',
    authorId: '5',
    authorName: 'Tom Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    authorHeadline: 'HVAC Technician - Heating & Cooling Expert',
    title: 'Ontario\'s Heat Pump Rebate Program: What Homeowners Need to Know in 2025',
    slug: 'ontario-heat-pump-rebate-program-homeowners-2025',
    excerpt: 'Ontario is offering significant rebates for heat pump installations. Here\'s everything you need to know about qualifying, the application process, and choosing the right system.',
    content: `# Ontario's Heat Pump Rebate Program: What You Need to Know

## The Opportunity

Ontario's Greener Homes Initiative continues into 2025 with substantial rebates for heat pump installations. Combined with federal programs, homeowners can save up to $10,000+ on a new heat pump system.

## Available Rebates

| Program | Rebate Amount |
|---------|--------------|
| Canada Greener Homes Grant | Up to $5,000 |
| Ontario Home Efficiency Rebate | Up to $4,500 |
| Enbridge Gas rebate (if switching from gas) | Up to $2,000 |

## Who Qualifies?

- Must be a homeowner (not rental property)
- Home must be your primary residence
- Need a pre-retrofit EnerGuide evaluation
- System must be installed by a licensed contractor
- Must meet minimum efficiency ratings (HSPF2 ≥ 8.1)

## Types of Heat Pumps

**Air-Source Heat Pumps** — Most common, easiest to install, $8,000-$15,000 installed

**Cold-Climate Heat Pumps** — Work efficiently down to -25°C, ideal for Ontario winters, $10,000-$18,000 installed

**Ductless Mini-Splits** — Great for homes without ductwork, $4,000-$8,000 per zone

## The Process

1. Book EnerGuide pre-retrofit evaluation ($600, partially rebated)
2. Get quotes from licensed HVAC contractors
3. Choose and install your system
4. Book post-retrofit EnerGuide evaluation
5. Submit rebate application with receipts

## Common Misconceptions

**"Heat pumps don't work in Canadian winters"** — Modern cold-climate heat pumps operate efficiently to -25°C or colder.

**"I'll need to keep my furnace"** — Many homeowners do keep their furnace as backup, but a properly sized heat pump handles 95%+ of heating needs.

**"The payback period is too long"** — With rebates, the payback on a heat pump vs. a new furnace + AC is typically 3-5 years.

*Interested in a heat pump for your home? Ask me anything in the comments!*`,
    category: 'industry-news',
    tags: ['hvac', 'heat-pump', 'rebates', 'ontario', 'energy-efficiency'],
    coverImage: 'https://images.unsplash.com/photo-1631545806609-05afa6e8ee2f?w=800&h=400&fit=crop',
    upvotes: 112,
    downvotes: 5,
    commentCount: 31,
    createdAt: '2024-10-28',
    updatedAt: '2024-11-01',
  },
  {
    id: 'b6',
    authorId: '1',
    authorName: 'Marcus Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    authorHeadline: 'Licensed Electrician - 15 Years Experience',
    title: 'How I Installed an EV Charger at Home: Step-by-Step Guide',
    slug: 'how-to-install-ev-charger-home-step-by-step',
    excerpt: 'Thinking about installing a Level 2 EV charger at home? Here\'s a detailed walkthrough of the process, including electrical requirements, permits, and common pitfalls.',
    content: `# How I Installed an EV Charger at Home

Electric vehicles are booming in Ontario, and one of the most common requests I get is for home EV charger installations. Here's what the process actually looks like.

## Step 1: Assess Your Electrical Capacity

Before anything else, we need to check your panel:
- **100A panel**: May need upgrade to 200A first
- **200A panel**: Usually has room for a 40A EV circuit
- **Available space**: Need 2 open breaker slots for a 2-pole breaker

## Step 2: Choose Your Charger

**Level 1 (120V)**: No installation needed, but very slow (5-8 km/hr of charge)
**Level 2 (240V)**: The sweet spot — 30-50 km/hr of charge. Requires a dedicated 40A circuit.

Popular brands: Tesla Wall Connector, ChargePoint Home Flex, Grizzl-E

## Step 3: Run the Circuit

This is where the real work happens:
1. Install a 40A 2-pole breaker in your panel
2. Run 6/3 NMD90 cable (or conduit for exposed runs)
3. Install a NEMA 14-50 outlet OR hardwire the charger
4. Ensure proper grounding

## Step 4: Mount and Connect

- Mount the charger unit on the wall (garage or exterior)
- Connect to the circuit
- Test all connections
- Verify proper voltage and grounding

## Step 5: Get It Inspected

In Ontario, this work requires an ESA inspection. Your electrician should pull the permit and arrange the inspection.

## Cost Breakdown

| Component | Cost Range |
|-----------|-----------|
| Charger unit | $500-$1,200 |
| Electrical materials | $200-$500 |
| Labour (4-6 hours) | $400-$700 |
| ESA permit & inspection | $100-$200 |
| Panel upgrade (if needed) | $2,500-$4,500 |
| **Total (no panel upgrade)** | **$1,200-$2,600** |
| **Total (with panel upgrade)** | **$3,700-$7,100** |

## Pro Tips

- Install the outlet/charger close to where your charge port will be when parked
- Consider future-proofing with a 60A circuit if your panel can handle it
- Hardwired chargers can pull more power than plug-in models
- Check with your electricity provider about off-peak EV rates

*Got a specific question about EV charger installation? Fire away in the comments!*`,
    category: 'how-to',
    tags: ['electrical', 'ev-charger', 'installation', 'guide', 'home-improvement'],
    coverImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=400&fit=crop',
    upvotes: 74,
    downvotes: 2,
    commentCount: 19,
    createdAt: '2024-10-20',
    updatedAt: '2024-10-22',
  },
];

export const mockBlogComments: BlogComment[] = [
  {
    id: 'c1',
    postId: 'b1',
    authorName: 'HomeOwner_TO',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Great article! My panel is from 1985 and I\'ve been putting off the upgrade. This convinced me to finally call an electrician.',
    upvotes: 8,
    downvotes: 0,
    createdAt: '2024-11-21',
    replies: [
      {
        id: 'c1r1',
        postId: 'b1',
        authorName: 'Marcus Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'Definitely don\'t wait too long! A 1985 panel is likely 100A with outdated breakers. Happy to do a free assessment if you\'re in the GTA.',
        upvotes: 5,
        downvotes: 0,
        createdAt: '2024-11-21',
        replies: [],
      },
    ],
  },
  {
    id: 'c2',
    postId: 'b1',
    authorName: 'DIY_Dave',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'Can a handy homeowner do a panel upgrade themselves, or is this strictly a licensed-electrician job?',
    upvotes: 3,
    downvotes: 1,
    createdAt: '2024-11-22',
    replies: [
      {
        id: 'c2r1',
        postId: 'b1',
        authorName: 'Marcus Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'In Ontario, electrical panel work MUST be done by a licensed electrician and requires an ESA inspection. It involves working with the utility\'s service entrance — not a DIY project. Safety first!',
        upvotes: 12,
        downvotes: 0,
        createdAt: '2024-11-22',
        replies: [],
      },
    ],
  },
  {
    id: 'c3',
    postId: 'b1',
    authorName: 'Condo_Life',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    content: 'Does this apply to condo units too? Our building is from 2005.',
    upvotes: 4,
    downvotes: 0,
    createdAt: '2024-11-23',
    replies: [],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return mockBlogPosts.find((p) => p.id === id);
}

export function getBlogPostsByAuthor(authorId: string): BlogPost[] {
  return mockBlogPosts.filter((p) => p.authorId === authorId);
}

export function getCommentsForPost(postId: string): BlogComment[] {
  return mockBlogComments.filter((c) => c.postId === postId);
}
