"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <Badge variant="premium" className="bg-brand/10 text-brand border-brand/20">
          Intelligence Interrupted
        </Badge>
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-un-text tracking-tight">
          A server-side anomaly has occurred.
        </h1>
        <p className="text-un-muted text-lg font-serif italic">
          Our systems encountered an unexpected exception while decrypting this briefing.
        </p>
        {error.digest && (
          <p className="text-[10px] uppercase tracking-widest text-un-muted/50 font-mono">
            Exception Digest: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-un-text text-un-bg px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-brand transition-all"
        >
          Retry Briefing
        </button>
        <Link
          href="/"
          className="border border-un-border text-un-text px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-un-surface transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
