"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  format?: string;
  className?: string;
  label?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ slot, format = "auto", className = "", label = true }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1828915420581549";

  useEffect(() => {
    if (pushed.current || !adRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // AdSense script not loaded yet — safe to ignore
    }
  }, []);

  if (!slot) return null;

  return (
    <div className={`ad-container ${className}`}>
      {label && (
        <p className="text-[9px] uppercase tracking-widest text-un-muted/50 mb-2 text-center">
          Advertisement
        </p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: format === "auto" ? "250px" : undefined }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
