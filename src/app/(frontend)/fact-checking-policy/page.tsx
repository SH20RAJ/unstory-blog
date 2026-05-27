import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Fact-Checking Policy — Unstory",
  description: "Our rigorous methodology for verifying claims, data, and intelligence sources.",
  alternates: { canonical: `${SITE_CONFIG.url}/fact-checking-policy` },
  openGraph: {
    title: "Fact-Checking Policy",
    description: "Our rigorous methodology for verifying claims, data, and intelligence sources.",
    url: `${SITE_CONFIG.url}/fact-checking-policy`,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export default function FactCheckingPolicy() {
  return (
    <StaticPageLayout 
      title="Fact-Checking Policy" 
      tagline="Verification Protocol"
    >
      <p className="text-xl text-un-muted font-serif italic mb-12 leading-relaxed border-l-2 border-brand pl-6">
        In the age of misinformation, verification is the difference between intelligence and speculation. Unstory follows a rigorous multi-stage fact-checking protocol.
      </p>

      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">1. Primary Source Verification</h2>
          <p>
            We prioritize primary sources including SEC filings, official government reports, scientific papers, and direct statements from key stakeholders. Secondary reporting is only used for context and must be verified against primary data.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">2. Data Cross-Reference</h2>
          <p>
            Economic data and market statistics are cross-referenced across multiple platforms (e.g., Bloomberg, Reuters, PitchBook) to ensure we are reporting the most accurate and up-to-date figures.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">3. Technical Review</h2>
          <p>
            Briefings involving complex technology (AI, semiconductors, biotech) are reviewed by specialists in the field to ensure that technical claims are scientifically grounded and not overhyped.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">4. Zero-Tolerance for Fabrications</h2>
          <p>
            Unstory has a zero-tolerance policy for fabricated data or AI-generated hallucinations. Any such occurrence results in an immediate internal investigation and a prominent public correction.
          </p>
        </div>
      </section>
    </StaticPageLayout>
  );
}
