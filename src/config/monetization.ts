// ============================================
// Unstory.app — Monetization Configuration
// ============================================

/** Categories that support affiliate monetization */
export const MONETIZABLE_CATEGORIES = [
  "ai",
  "business",
  "wealth",
  "cybersecurity",
  "startups",
  "insurance",
  "investing",
  "personal-finance",
  "real-estate",
  "lifestyle",
  "luxury",
  "travel",
  "gadgets",
  "health",
  "tech-reviews",
] as const;

/** Categories where affiliate links should NOT appear (sensitive/risky) */
export const BLOCKED_AFFILIATE_CATEGORIES = [
  "politics",
  "geopolitics",
  "regulation",
] as const;

/** Standard affiliate disclosure text */
export const AFFILIATE_DISCLOSURE =
  "Unstory may earn a commission when readers choose products or services through our links. We only include products relevant to the article. This does not influence our editorial independence.";

/** Sponsored content disclosure */
export const SPONSORED_DISCLOSURE =
  "This content was produced in partnership with the sponsor. Our editorial team reviewed this content to ensure it meets our standards. See our Editorial Policy for details.";

/** High-intent topic map for commercial content */
export const HIGH_INTENT_TOPIC_MAP: Record<string, string[]> = {
  "ai-tools": ["best ai tools", "ai software comparison", "ai for business"],
  "crm-software": ["best crm", "crm comparison", "small business crm"],
  "cybersecurity": ["best cybersecurity tools", "business security software", "password manager"],
  "business-insurance": ["startup insurance", "business liability insurance", "founder insurance"],
  "credit-cards": ["best business credit cards", "founder credit cards", "premium credit cards"],
  "productivity": ["productivity tools", "founder tools", "business automation"],
  "cloud-hosting": ["best cloud hosting", "startup hosting", "web hosting comparison"],
  "legal-tools": ["legal software", "startup legal", "business contracts"],
  "accounting": ["accounting software", "small business accounting", "bookkeeping tools"],
  "password-managers": ["business password manager", "team password manager", "enterprise security"],
};

/** AdSense configuration */
export const ADSENSE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1828915420581549",
  slots: {
    top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "",
    midArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID_ARTICLE || "",
    afterArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_ARTICLE || "",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
    archive: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARCHIVE || "",
  },
} as const;
