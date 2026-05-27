import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Advertise — Reach Founders, Investors & Operators | Unstory",
  description: "Partner with Unstory to reach a high-intent audience of founders, investors, and technologists. Sponsored briefings, newsletter sponsorship, and custom intelligence.",
  alternates: { canonical: `${SITE_CONFIG.url}/advertise` },
  openGraph: {
    title: "Advertise with Unstory",
    description: "Reach a high-intent audience of founders, investors, and technologists.",
    url: `${SITE_CONFIG.url}/advertise`,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export default function AdvertisePage() {
  return (
    <StaticPageLayout 
      title="Advertise" 
      tagline="Partnerships"
    >
      <p className="text-xl text-un-muted font-serif italic mb-12 text-center">
        Reach a high-intent audience of founders, investors, and technologists.
      </p>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl text-un-text font-serif font-bold mb-6">Our Audience</h2>
          <p>
            Unstory readers are wealth-minded professionals who value deep analysis over superficial headlines. They are decision-makers in the fields of AI, finance, and technology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-un-text font-serif font-bold mb-6">Partnership Opportunities</h2>
          <ul className="space-y-4">
            <li><strong className="text-brand">Sponsored Briefings:</strong> High-impact placements in our most-read articles.</li>
            <li><strong className="text-brand">Custom Intelligence:</strong> Collaborative deep-dives into specific market trends.</li>
            <li><strong className="text-brand">Newsletter Sponsorship:</strong> Direct access to our subscribers' inboxes.</li>
          </ul>
        </section>

        <div className="premium-card p-12 text-center bg-un-bg border-brand/20">
          <h3 className="text-2xl font-serif text-un-text mb-6">Ready to collaborate?</h3>
          <p className="text-un-muted mb-8">Download our media kit or request a consultation.</p>
          <a href="mailto:advertise@unstory.app" className="inline-block px-12 py-4 bg-brand text-premium-dark font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-brand/90 transition-all">
            Contact Partnerships
          </a>
        </div>
      </div>
    </StaticPageLayout>
  );
}
