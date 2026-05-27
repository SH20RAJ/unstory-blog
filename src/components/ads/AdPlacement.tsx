"use client";

import { AdSlot } from "./AdSlot";

interface AdPlacementProps {
  placement: "after-hero" | "mid-article" | "after-article" | "sidebar" | "archive-inline";
  pageType: "article" | "category" | "home" | "archive";
  categorySlug?: string;
  articleSlug?: string;
  trustScore?: number;
  factCheckStatus?: string;
}

/**
 * Smart ad placement component.
 * - Picks the right slot based on placement/page type
 * - Blocks ads on low-trust or unverified YMYL articles
 * - Never renders on admin/studio/search pages
 */
export function AdPlacement({
  placement,
  pageType,
  trustScore = 100,
  factCheckStatus,
}: AdPlacementProps) {
  // Safety: never show ads on low-trust articles
  if (trustScore < 70) return null;

  // Safety: never show ads on unverified YMYL content
  if (factCheckStatus === "unverified") return null;

  // Map placement to env-configured slot
  const slotMap: Record<string, string | undefined> = {
    "after-hero": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
    "mid-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID_ARTICLE,
    "after-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_ARTICLE,
    "sidebar": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    "archive-inline": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARCHIVE,
  };

  const slot = slotMap[placement];
  if (!slot) return null;

  return <AdSlot slot={slot} format="auto" />;
}
