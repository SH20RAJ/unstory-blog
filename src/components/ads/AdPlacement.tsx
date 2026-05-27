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

const YMYL_CATEGORIES = [
  "investing", "personal-finance", "insurance", "banking", "real-estate",
  "politics", "geopolitics", "regulation", "longevity", "wealth", "power",
];

function getSlotId(placement: string): string {
  const envMap: Record<string, string | undefined> = {
    "after-hero": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
    "mid-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID_ARTICLE,
    "after-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_ARTICLE,
    "sidebar": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    "archive-inline": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARCHIVE,
  };
  return envMap[placement] || "";
}

export function AdPlacement({
  placement,
  pageType,
  categorySlug,
  trustScore,
  factCheckStatus,
}: AdPlacementProps) {
  // Do not render ads on low-trust pages
  if (trustScore !== undefined && trustScore < 70) return null;

  // Do not render ads on unverified YMYL content
  if (
    categorySlug &&
    YMYL_CATEGORIES.includes(categorySlug) &&
    factCheckStatus === "unverified"
  ) {
    return null;
  }

  // Do not render ads on admin/studio/search pages
  if (pageType === "archive" && placement === "archive-inline") {
    // OK to show
  }

  const slot = getSlotId(placement);
  if (!slot) return null;

  const formatMap: Record<string, string> = {
    "after-hero": "auto",
    "mid-article": "auto",
    "after-article": "auto",
    "sidebar": "auto",
    "archive-inline": "auto",
  };

  return (
    <div className={`ad-placement ad-${placement} my-8`}>
      <AdSlot slot={slot} format={formatMap[placement] || "auto"} />
    </div>
  );
}
