// ============================================
// Unstory.app — Monetization Configuration
// ============================================

/** Categories that are safe for affiliate content */
export const MONETIZABLE_CATEGORIES = [
  "ai",
  "business",
  "wealth",
  "cybersecurity",
  "startups",
  "tools",
  "lifestyle",
  "travel",
  "gadgets",
] as const;

/** Standard affiliate disclosure text */
export const AFFILIATE_DISCLOSURE =
  "Unstory may earn a commission when readers choose products or services through our links. We only include products relevant to the article topic and our editorial judgment is never influenced by partnerships.";

/** Categories where monetization should be extra careful */
export const SENSITIVE_MONETIZATION_CATEGORIES = [
  "investing",
  "insurance",
  "banking",
  "politics",
  "geopolitics",
  "health",
  "longevity",
] as const;

/** High-intent topic mapping for commercial content */
export const HIGH_INTENT_TOPICS: Record<string, string[]> = {
  "ai": ["best ai tools", "ai software comparison", "ai for business", "chatgpt alternatives"],
  "business": ["best crm", "business software", "saas tools", "startup tools"],
  "wealth": ["credit cards", "investment platforms", "wealth management", "budgeting tools"],
  "cybersecurity": ["vpn", "password manager", "security tools", "antivirus"],
  "startups": ["founding tools", "startup legal", "business insurance", "incorporation"],
} as const;

/** AdSense configuration */
export const ADSENSE_CONFIG = {
  clientId: "ca-pub-1828915420581549",
  slots: {
    top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "",
    midArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID_ARTICLE || "",
    afterArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_ARTICLE || "",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
    archive: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARCHIVE || "",
  },
} as const;
