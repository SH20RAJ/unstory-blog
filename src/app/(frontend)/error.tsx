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
    <div className="editorial-container flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <Badge variant="premium">Intelligence Interrupted</Badge>
        <h1 className="font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
          A server-side anomaly has occurred.
        </h1>
        <p className="mx-auto max-w-2xl font-serif text-xl leading-8 text-un-accent">
          Our systems encountered an unexpected exception while decrypting this briefing.
        </p>
        {error.digest && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-un-muted/50">
            Exception Digest: {error.digest}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => reset()}
          className="rounded-[4px] bg-un-text px-8 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-un-bg transition-colors hover:bg-brand"
        >
          Retry Briefing
        </button>
        <Link
          href="/"
          className="rounded-[4px] border border-un-border px-8 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-un-text transition-colors hover:bg-un-surface"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
