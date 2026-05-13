// ============================================
// Unstory.app — Category Seed Configuration
// ============================================
// This file defines the complete category hierarchy for Unstory.app.
// Used by seed scripts to populate the database.
// The website reads categories from the database, but this file
// serves as the authoritative source for initial setup and resets.

export interface CategorySeedConfig {
  name: string;
  slug: string;
  description: string;
  navLabel: string;
  color: string;
  icon: string;
  priority: number;
  seoTitle: string;
  seoDescription: string;
  children: SubcategorySeedConfig[];
}

export interface SubcategorySeedConfig {
  name: string;
  slug: string;
  description: string;
  priority: number;
}

export const CATEGORIES: CategorySeedConfig[] = [
  {
    name: "Wealth",
    slug: "wealth",
    description:
      "Personal finance, investing, insurance, banking, real estate, and wealth-building strategies for ambitious minds.",
    navLabel: "Wealth",
    color: "#C9A84C",
    icon: "trending-up",
    priority: 1,
    seoTitle: "Wealth & Finance Intelligence — Unstory",
    seoDescription:
      "Expert analysis on personal finance, investing, insurance, real estate, and wealth-building strategies for high-income professionals and ambitious readers.",
    children: [
      {
        name: "Personal Finance",
        slug: "personal-finance",
        description: "Money management, budgeting, and financial planning for ambitious professionals.",
        priority: 1,
      },
      {
        name: "Investing",
        slug: "investing",
        description: "Stock markets, alternative investments, venture capital, and portfolio strategy.",
        priority: 2,
      },
      {
        name: "Insurance",
        slug: "insurance",
        description: "Health, life, business, and cyber insurance — risk protection for high-value individuals.",
        priority: 3,
      },
      {
        name: "Banking",
        slug: "banking",
        description: "Private banking, credit strategy, and financial products for wealth builders.",
        priority: 4,
      },
      {
        name: "Real Estate",
        slug: "real-estate",
        description: "Property investment, luxury real estate, REITs, and smart home trends.",
        priority: 5,
      },
      {
        name: "Wealth Habits",
        slug: "wealth-habits",
        description: "Behavioral patterns, money psychology, and routines of successful wealth builders.",
        priority: 6,
      },
    ],
  },
  {
    name: "AI",
    slug: "ai",
    description:
      "Artificial intelligence news, tools, automation, startups, regulation, and infrastructure shaping the future of work and business.",
    navLabel: "AI",
    color: "#6C5CE7",
    icon: "cpu",
    priority: 2,
    seoTitle: "AI & Artificial Intelligence News — Unstory",
    seoDescription:
      "Breaking AI news, tool reviews, automation strategies, startup coverage, regulation analysis, and infrastructure developments.",
    children: [
      {
        name: "AI News",
        slug: "ai-news",
        description: "Breaking developments in artificial intelligence, model releases, and industry shifts.",
        priority: 1,
      },
      {
        name: "AI Tools",
        slug: "ai-tools",
        description: "Reviews and analysis of AI-powered tools for productivity, business, and creation.",
        priority: 2,
      },
      {
        name: "Automation",
        slug: "automation",
        description: "Workflow automation, no-code tools, and AI-powered process optimization.",
        priority: 3,
      },
      {
        name: "AI Startups",
        slug: "ai-startups",
        description: "Emerging AI companies, funding rounds, and disruptive business models.",
        priority: 4,
      },
      {
        name: "AI Regulation",
        slug: "ai-regulation",
        description: "Government policy, safety frameworks, and compliance requirements for AI systems.",
        priority: 5,
      },
      {
        name: "AI Infrastructure",
        slug: "ai-infrastructure",
        description: "Chips, data centers, cloud compute, and the hardware powering the AI revolution.",
        priority: 6,
      },
    ],
  },
  {
    name: "Business",
    slug: "business",
    description:
      "Startups, SaaS, marketing, sales, case studies, and founder playbooks for operators and entrepreneurs.",
    navLabel: "Business",
    color: "#00B894",
    icon: "briefcase",
    priority: 3,
    seoTitle: "Business & Startup Intelligence — Unstory",
    seoDescription:
      "Startup strategies, SaaS insights, marketing tactics, sales frameworks, and real-world case studies for founders and operators.",
    children: [
      {
        name: "Startups",
        slug: "startups",
        description: "Startup ideas, validation, fundraising, and early-stage company building.",
        priority: 1,
      },
      {
        name: "SaaS",
        slug: "saas",
        description: "Software-as-a-service business models, metrics, growth strategies, and tools.",
        priority: 2,
      },
      {
        name: "Marketing",
        slug: "marketing",
        description: "Growth marketing, content strategy, SEO, paid acquisition, and brand building.",
        priority: 3,
      },
      {
        name: "Sales",
        slug: "sales",
        description: "B2B sales strategy, pipeline management, negotiation, and revenue operations.",
        priority: 4,
      },
      {
        name: "Case Studies",
        slug: "case-studies",
        description: "Deep dives into successful and failed companies — lessons for builders.",
        priority: 5,
      },
      {
        name: "Founder Playbooks",
        slug: "founder-playbooks",
        description: "Tactical guides and frameworks from experienced founders and operators.",
        priority: 6,
      },
    ],
  },
  {
    name: "Power",
    slug: "power",
    description:
      "Politics, policy, geopolitics, regulation, energy, and cybersecurity — the forces that shape markets and opportunity.",
    navLabel: "Power",
    color: "#D63031",
    icon: "shield",
    priority: 4,
    seoTitle: "Power, Politics & Policy — Unstory",
    seoDescription:
      "Analysis of politics, geopolitics, regulation, energy policy, and cybersecurity — how power shapes markets, technology, and opportunity.",
    children: [
      {
        name: "Politics",
        slug: "politics",
        description: "Elections, governance, and political forces that impact business and markets.",
        priority: 1,
      },
      {
        name: "Policy",
        slug: "policy",
        description: "Government policy analysis, tax changes, and regulatory impact on industries.",
        priority: 2,
      },
      {
        name: "Geopolitics",
        slug: "geopolitics",
        description: "Global power dynamics, trade wars, defense strategy, and international relations.",
        priority: 3,
      },
      {
        name: "Regulation",
        slug: "regulation",
        description: "Tech regulation, financial compliance, and legal frameworks affecting business.",
        priority: 4,
      },
      {
        name: "Energy",
        slug: "energy",
        description: "Energy markets, renewables, oil, nuclear, and the geopolitics of energy security.",
        priority: 5,
      },
      {
        name: "Cybersecurity",
        slug: "cybersecurity",
        description: "Digital threats, privacy, data protection, and security strategy for individuals and companies.",
        priority: 6,
      },
    ],
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description:
      "Luxury, travel, premium cars, smart homes, fine dining, and longevity — curated for discerning taste.",
    navLabel: "Lifestyle",
    color: "#E17055",
    icon: "diamond",
    priority: 5,
    seoTitle: "Premium Lifestyle & Luxury — Unstory",
    seoDescription:
      "Curated luxury, premium travel, fine dining, smart homes, longevity, and lifestyle intelligence for discerning readers.",
    children: [
      {
        name: "Luxury",
        slug: "luxury",
        description: "Watches, fashion, collectibles, and premium goods that hold value and signal taste.",
        priority: 1,
      },
      {
        name: "Travel",
        slug: "travel",
        description: "Premium travel, business travel optimization, and global living insights.",
        priority: 2,
      },
      {
        name: "Cars",
        slug: "cars",
        description: "Luxury and performance vehicles, EVs, and automotive technology.",
        priority: 3,
      },
      {
        name: "Smart Homes",
        slug: "smart-homes",
        description: "Home automation, premium interiors, and technology-enhanced living.",
        priority: 4,
      },
      {
        name: "Dining",
        slug: "dining",
        description: "Fine dining, premium food culture, and the business of gastronomy.",
        priority: 5,
      },
      {
        name: "Longevity",
        slug: "longevity",
        description: "Health optimization, biohacking, executive wellness, and preventive medicine.",
        priority: 6,
      },
    ],
  },
  {
    name: "Skills",
    slug: "skills",
    description:
      "High-income skills, career strategy, productivity systems, personal branding, education, and creator economy.",
    navLabel: "Skills",
    color: "#0984E3",
    icon: "zap",
    priority: 6,
    seoTitle: "High-Income Skills & Career Growth — Unstory",
    seoDescription:
      "Master high-income skills, accelerate career growth, build a personal brand, and leverage the creator economy for wealth and influence.",
    children: [
      {
        name: "High-Income Skills",
        slug: "high-income-skills",
        description: "Skills that generate outsized income: coding, sales, writing, AI, and negotiation.",
        priority: 1,
      },
      {
        name: "Careers",
        slug: "careers",
        description: "Career strategy, salary negotiation, leadership, and professional advancement.",
        priority: 2,
      },
      {
        name: "Productivity",
        slug: "productivity",
        description: "Time management, focus systems, personal operating systems, and tools.",
        priority: 3,
      },
      {
        name: "Personal Brand",
        slug: "personal-brand",
        description: "Building influence, audience growth, and thought leadership online.",
        priority: 4,
      },
      {
        name: "Education",
        slug: "education",
        description: "Online courses, certifications, MBA alternatives, and lifelong learning strategy.",
        priority: 5,
      },
      {
        name: "Creator Economy",
        slug: "creator-economy",
        description: "Newsletter businesses, content monetization, creator tools, and media entrepreneurship.",
        priority: 6,
      },
    ],
  },
  {
    name: "Trends",
    slug: "trends",
    description:
      "Internet culture, consumer tech, media shifts, status signals, e-commerce, and emerging market opportunities.",
    navLabel: "Trends",
    color: "#FDCB6E",
    icon: "activity",
    priority: 7,
    seoTitle: "Internet Trends & Culture — Unstory",
    seoDescription:
      "Track internet culture shifts, consumer technology, media evolution, e-commerce trends, and emerging market opportunities.",
    children: [
      {
        name: "Internet Culture",
        slug: "internet-culture",
        description: "Memes, digital movements, platform dynamics, and online behavior patterns.",
        priority: 1,
      },
      {
        name: "Consumer Tech",
        slug: "consumer-tech",
        description: "Gadgets, apps, platforms, and consumer-facing technology trends.",
        priority: 2,
      },
      {
        name: "Media",
        slug: "media",
        description: "Media industry shifts, content distribution, streaming, and journalism evolution.",
        priority: 3,
      },
      {
        name: "Status Signals",
        slug: "status-signals",
        description: "Cultural markers of status, taste, and social positioning in the modern economy.",
        priority: 4,
      },
      {
        name: "E-commerce",
        slug: "ecommerce",
        description: "Online retail trends, DTC brands, marketplace dynamics, and digital commerce.",
        priority: 5,
      },
      {
        name: "Future Markets",
        slug: "future-markets",
        description: "Emerging industries, speculative markets, and early-stage opportunity identification.",
        priority: 6,
      },
    ],
  },
];

/** Flatten categories into a simple lookup map: slug → name */
export function getCategoryMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    map[cat.slug] = cat.name;
    for (const child of cat.children) {
      map[child.slug] = child.name;
    }
  }
  return map;
}

/** Get all top-level category slugs */
export function getTopLevelSlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}
