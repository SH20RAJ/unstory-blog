import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Research Methodology",
  description: "How Unstory sources, verifies, and analyzes intelligence for our briefings.",
  alternates: { canonical: `${SITE_CONFIG.url}/methodology` },
  robots: { index: true, follow: true },
};

export default function MethodologyPage() {
  return (
    <StaticPageLayout 
      title="Research Methodology" 
      tagline="How We Decipher the World"
    >
      <p className="text-xl text-un-muted font-serif italic mb-12 leading-relaxed border-l-2 border-brand pl-6">
        Unstory intelligence is built on a "Layered Verification" framework. We don't just report data; we stress-test it against historical patterns, technical realities, and geopolitical shifts.
      </p>

      <section className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl text-un-text font-serif font-bold">The Three Layers of Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 rounded-[6px] border border-un-border bg-un-paper p-6">
              <div className="text-brand font-bold">01</div>
              <h3 className="text-lg font-bold">Quantitative Hard-Data</h3>
              <p className="text-sm text-un-muted">We start with raw figures: SEC filings, treasury yields, chip shipment volumes, and tokenomics data.</p>
            </div>
            <div className="space-y-4 rounded-[6px] border border-un-border bg-un-paper p-6">
              <div className="text-brand font-bold">02</div>
              <h3 className="text-lg font-bold">Inertial Context</h3>
              <p className="text-sm text-un-muted">Data without history is noise. We map current signals against 5-10 year historical cycles and structural shifts.</p>
            </div>
            <div className="space-y-4 rounded-[6px] border border-un-border bg-un-paper p-6">
              <div className="text-brand font-bold">03</div>
              <h3 className="text-lg font-bold">Predictive Pressure</h3>
              <p className="text-sm text-un-muted">We apply scenario modeling to determine the most likely outcome of current power shifts and AI developments.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl text-un-text font-serif font-bold">Sourcing Excellence</h2>
          <p>
            Our analysts are prohibited from relying solely on secondary news aggregators. A briefing is only considered "intelligence-grade" if it contains insights derived from at least two primary datasets.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl text-un-text font-serif font-bold">Updating & Lifespan</h2>
          <p>
            Intelligence is perishable. Every briefing on Unstory has an "Intelligence Lifespan." We regularly update briefings as new data emerges, ensuring that our archive remains a living map of the internet's most critical shifts.
          </p>
        </div>
      </section>
    </StaticPageLayout>
  );
}
