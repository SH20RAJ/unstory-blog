"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  format?: string;
  className?: string;
  label?: boolean;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ slot, format = "auto", className = "", label = true, minHeight = 100 }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1828915420581549";

  useEffect(() => {
    if (pushed.current || !adRef.current || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // AdSense script not loaded yet
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`ad-slot-wrapper ${className}`}>
      {label && (
        <p className="text-[10px] uppercase tracking-widest text-un-muted mb-2 text-center">
          Advertisement
        </p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: `${minHeight}px` }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
