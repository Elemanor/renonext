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
