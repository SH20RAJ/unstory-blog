"use client";

import { AdSlot } from "./AdSlot";
import { ADSENSE_CONFIG } from "@/config/monetization";

interface AdPlacementProps {
  placement: "after-hero" | "mid-article" | "after-article" | "sidebar" | "archive-inline";
  pageType: "article" | "category" | "home" | "archive";
  trustScore?: number;
  className?: string;
}

export function AdPlacement({ placement, pageType, trustScore, className = "" }: AdPlacementProps) {
  // Don't show ads on low-trust articles
  if (trustScore !== undefined && trustScore < 70) return null;

  const slotMap: Record<string, string> = {
    "after-hero": ADSENSE_CONFIG.slots.top,
    "mid-article": ADSENSE_CONFIG.slots.midArticle,
    "after-article": ADSENSE_CONFIG.slots.afterArticle,
    "sidebar": ADSENSE_CONFIG.slots.sidebar,
    "archive-inline": ADSENSE_CONFIG.slots.archive,
  };

  const slot = slotMap[placement];
  if (!slot) return null;

  return (
    <div className={`ad-placement ad-${placement} ${className}`}>
      <AdSlot
        slot={slot}
        format={placement === "sidebar" ? "vertical" : "auto"}
        label={true}
        minHeight={placement === "sidebar" ? 250 : 100}
      />
    </div>
  );
}
