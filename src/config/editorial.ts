// ============================================
// Unstory.app — Editorial Rules & Constants
// ============================================
// Defines article workflow statuses, content types, fact-check levels,
// risk classifications, and publish validation rules.

/** Article workflow status — tracks editorial pipeline stage */
export const ARTICLE_STATUSES = {
  idea: { label: "Idea", description: "Initial concept or pitch", color: "#95A5A6" },
  draft: { label: "Draft", description: "Work in progress by the writer", color: "#3498DB" },
  needs_review: { label: "Needs Review", description: "Submitted for editorial review", color: "#F39C12" },
  fact_checking: { label: "Fact Checking", description: "Under fact verification", color: "#E67E22" },
  seo_review: { label: "SEO Review", description: "SEO optimization pass", color: "#9B59B6" },
  ready: { label: "Ready", description: "Approved and ready to publish", color: "#2ECC71" },
  scheduled: { label: "Scheduled", description: "Queued for future publication", color: "#1ABC9C" },
  published: { label: "Published", description: "Live on the site", color: "#27AE60" },
  archived: { label: "Archived", description: "Removed from active display", color: "#7F8C8D" },
  rejected: { label: "Rejected", description: "Did not pass editorial review", color: "#E74C3C" },
} as const;

export type ArticleStatus = keyof typeof ARTICLE_STATUSES;
export const ARTICLE_STATUS_VALUES = Object.keys(ARTICLE_STATUSES) as ArticleStatus[];

/** Content type — determines the article format and reader expectation */
export const CONTENT_TYPES = {
  news: { label: "News", description: "Breaking or timely news reporting" },
  analysis: { label: "Analysis", description: "Deep dive into a topic with original insight" },
  explainer: { label: "Explainer", description: "Educational breakdown of a complex topic" },
  opinion: { label: "Opinion", description: "Authored perspective or editorial" },
  roundup: { label: "Roundup", description: "Curated collection of related items" },
  fact_check: { label: "Fact Check", description: "Verification of claims or data" },
  interview: { label: "Interview", description: "Conversation with a notable person" },
  review: { label: "Review", description: "Product, service, or tool evaluation" },
  guide: { label: "Guide", description: "Step-by-step practical guide" },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;
export const CONTENT_TYPE_VALUES = Object.keys(CONTENT_TYPES) as ContentType[];

/** Fact-check status — editorial verification level */
export const FACT_CHECK_STATUSES = {
  unverified: { label: "Unverified", description: "No fact-checking performed", color: "#95A5A6" },
  in_progress: { label: "In Progress", description: "Currently being verified", color: "#F39C12" },
  reviewed: { label: "Reviewed", description: "Reviewed by editor, not fully verified", color: "#3498DB" },
  verified: { label: "Verified", description: "Facts confirmed by editorial team", color: "#27AE60" },
  disputed: { label: "Disputed", description: "Contains contested claims", color: "#E74C3C" },
} as const;

export type FactCheckStatus = keyof typeof FACT_CHECK_STATUSES;
export const FACT_CHECK_VALUES = Object.keys(FACT_CHECK_STATUSES) as FactCheckStatus[];

/** Risk level — content sensitivity classification */
export const RISK_LEVELS = {
  low: { label: "Low", description: "General content with minimal legal/compliance risk" },
  medium: { label: "Medium", description: "Contains financial or business claims" },
  high: { label: "High", description: "Involves regulated topics or strong claims" },
  sensitive: { label: "Sensitive", description: "Requires human review before publication" },
} as const;

export type RiskLevel = keyof typeof RISK_LEVELS;

/**
 * Sensitive categories that require elevated editorial standards.
 * Content in these categories should be flagged for human review.
 * Avoid giving personalized financial, legal, or medical advice.
 * Use clear disclaimers and cite qualified sources.
 */
export const SENSITIVE_CATEGORIES = [
  "investing",
  "personal-finance",
  "insurance",
  "banking",
  "real-estate",
  "politics",
  "geopolitics",
  "regulation",
  "longevity",
] as const;

/** Monetization intent — how the content supports revenue */
export const MONETIZATION_INTENTS = {
  none: { label: "None", description: "No direct monetization" },
  affiliate: { label: "Affiliate", description: "Contains affiliate links or recommendations" },
  sponsored: { label: "Sponsored", description: "Sponsored content or partnership" },
  lead_gen: { label: "Lead Generation", description: "Generates leads for partners" },
  newsletter: { label: "Newsletter", description: "Drives newsletter signups" },
  premium: { label: "Premium", description: "Gated content for paying subscribers" },
} as const;

export type MonetizationIntent = keyof typeof MONETIZATION_INTENTS;

/**
 * Publish Validation Rules
 * ========================
 * These rules determine the minimum requirements before an article
 * can transition from "ready" to "published" or "scheduled" status.
 */
export const PUBLISH_RULES = {
  /** Fields required for ALL articles to be published */
  requiredFields: [
    "title",
    "slug",
    "body",
    "categoryId",
    "authorId",
    "seoTitle",
    "seoDescription",
  ] as const,

  /**
   * Stricter rules for Power/Politics category articles.
   * These articles deal with politically sensitive content and
   * require additional sourcing and verification.
   */
  powerCategoryRules: {
    requireSourceUrl: true,
    requireFactCheckStatus: ["verified", "reviewed"] as FactCheckStatus[],
    description:
      "Power & Politics articles require a source URL and must have fact-check status of 'verified' or 'reviewed' before publishing.",
  },

  /** Maximum title length for SEO */
  maxTitleLength: 120,

  /** Maximum SEO description length */
  maxSeoDescriptionLength: 160,

  /** Minimum body length in characters */
  minBodyLength: 200,
} as const;

/**
 * Determines the risk level for an article based on its category slug.
 * Sensitive categories are flagged for elevated editorial review.
 */
export function getRiskLevel(categorySlug: string): RiskLevel {
  if (SENSITIVE_CATEGORIES.includes(categorySlug as (typeof SENSITIVE_CATEGORIES)[number])) {
    return "sensitive";
  }
  return "low";
}

/**
 * Checks if a category requires stricter publish validation
 * (source URL + fact-check status).
 */
export function requiresStrictValidation(categorySlug: string): boolean {
  const strictSlugs = ["politics", "policy", "geopolitics", "regulation", "power"];
  return strictSlugs.includes(categorySlug);
}
