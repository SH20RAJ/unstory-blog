// ============================================
// Unstory.app — Monetization Configuration
// ============================================

/** Affiliate disclosure text shown on commercial articles */
export const AFFILIATE_DISCLOSURE =
  "Unstory may earn a commission when readers choose products or services through our links. We only include products relevant to the article. This does not influence our editorial independence.";

/** Categories that support affiliate monetization */
export const AFFILIATABLE_CATEGORIES = [
  "ai",
  "business",
  "wealth",
  "cybersecurity",
  "skills",
  "lifestyle",
  "trends",
] as const;

/** Categories where affiliate links should NOT appear (YMYL sensitive) */
export const BLOCKED_AFFILIATE_CATEGORIES = [
  "politics",
  "geopolitics",
  "regulation",
] as const;

/** High-intent topic to monetization model mapping */
export const HIGH_INTENT_TOPIC_MAP: Record<string, string[]> = {
  "ai-tools": ["affiliate", "sponsored"],
  "saas": ["affiliate", "sponsored"],
  "cybersecurity": ["affiliate", "lead_gen"],
  "credit-cards": ["affiliate"],
  "insurance": ["affiliate", "lead_gen"],
  "investing": ["newsletter"],
  "real-estate": ["lead_gen"],
  "hosting": ["affiliate"],
  "productivity": ["affiliate"],
  "accounting": ["affiliate"],
  "legal-tools": ["affiliate", "lead_gen"],
  "crm": ["affiliate"],
  "password-managers": ["affiliate"],
} as const;

/** High-CPC keyword targets for content planning */
export const HIGH_CPC_KEYWORDS = [
  "best business insurance for startups",
  "best CRM software for small business",
  "best cybersecurity tools for founders",
  "best premium credit cards for entrepreneurs",
  "best accounting software for small business",
  "best AI tools for startup founders",
  "best cloud hosting for startups",
  "best password managers for business",
  "best legal tools for startups",
  "best productivity tools for founders",
  "business credit card comparison",
  "startup insurance guide",
  "founder financial planning",
  "enterprise SaaS reviews",
  "B2B software comparison",
] as const;
