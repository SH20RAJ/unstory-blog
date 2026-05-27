"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  format?: string;
  className?: string;
  label?: boolean;
}

/**
 * Safe Google AdSense ad slot component.
 * - Client-only rendering (no SSR crash)
 * - Requires a valid slot ID to render
 * - Reserves minHeight to prevent CLS
 * - Shows small "Advertisement" label
 */
export function AdSlot({ slot, format = "auto", className = "", label = true }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense script not loaded — safe to ignore
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`ad-container my-6 ${className}`}>
      {label && (
        <p className="text-[10px] uppercase tracking-widest text-un-muted/50 mb-2 text-center">
          Advertisement
        </p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "250px" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1828915420581549"}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
