import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Editorial Policy — Unstory",
  description: "Our standards for strategic intelligence, sourcing, and reporting integrity.",
  alternates: { canonical: `${SITE_CONFIG.url}/editorial-policy` },
  alternates: { canonical: `${SITE_CONFIG.url}/editorial-policy` },
  openGraph: {
    title: "Editorial Policy",
    description: "Our standards for strategic intelligence, sourcing, and reporting integrity.",
    url: `${SITE_CONFIG.url}/editorial-policy`,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export default function EditorialPolicy() {
  return (
    <StaticPageLayout 
      title="Editorial Policy" 
      tagline="Integrity & Standards"
    >
      <p className="text-xl text-un-muted font-serif italic mb-12 leading-relaxed border-l-2 border-brand pl-6">
        Unstory operates on a foundation of precision, perspective, and absolute transparency. Our editorial policy ensures that every briefing meets the highest standards of intelligence reporting.
      </p>

      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">1. Intelligence vs. News</h2>
          <p>
            Traditional news focus on the "what." Unstory focuses on the "why" and the "what next." We do not chase breaking news unless it signals a fundamental shift in AI, markets, or power structures.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">2. Sourcing Requirements</h2>
          <p>
            Every briefing must cite primary sources where possible. We do not publish rumors or unverified social media speculation. Our analysts are required to cross-reference multiple data points before an article is cleared for publication.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">3. Use of AI</h2>
          <p>
            While we use AI tools for data processing and initial research, every word published on Unstory is reviewed, edited, and verified by a human expert. We explicitly label AI-assisted analysis when it constitutes the primary value of the briefing.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">4. Independence</h2>
          <p>
            Unstory is fully independent. We do not accept payment for favorable coverage. Any sponsored content is explicitly labeled and kept separate from our core intelligence briefings.
          </p>
        </div>
      </section>
    </StaticPageLayout>
  );
}
