import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Corrections Policy — Unstory",
  description: "How Unstory handles errors and ensures historical accuracy in its intelligence briefings.",
  alternates: { canonical: `${SITE_CONFIG.url}/corrections-policy` },
  openGraph: {
    title: "Corrections Policy",
    description: "How Unstory handles errors and ensures historical accuracy.",
    url: `${SITE_CONFIG.url}/corrections-policy`,
    siteName: SITE_CONFIG.name,
  },
};

export default function CorrectionsPolicy() {
  return (
    <StaticPageLayout 
      title="Corrections Policy" 
      tagline="Commitment to Accuracy"
    >
      <p className="text-xl text-un-muted font-serif italic mb-12 leading-relaxed border-l-2 border-brand pl-6">
        Accuracy is the bedrock of intelligence. When we fail to meet our standards, we correct the record promptly and transparently.
      </p>

      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">Reporting an Error</h2>
          <p>
            If you believe a briefing contains a factual error or a significant omission, please contact us immediately at <span className="text-brand">corrections@unstory.app</span>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">Correction Procedure</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Verification:</strong> Our editorial team will review the claim against primary sources.</li>
            <li><strong>Update:</strong> If an error is found, we will update the article body immediately.</li>
            <li><strong>Notice:</strong> We will append a visible correction notice to the top or bottom of the article, detailing what was changed and why.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-un-text font-serif font-bold">Historical Integrity</h2>
          <p>
            For intelligence briefings that are updated as a situation evolves (e.g., market shifts), we maintain an "Update Log" at the bottom of the page to show how the analysis has progressed over time.
          </p>
        </div>
      </section>
    </StaticPageLayout>
  );
}
