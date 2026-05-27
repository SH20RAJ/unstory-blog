import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Advertise with Unstory",
  description: "Reach a high-intent audience of founders, investors, and technologists through Unstory's premium advertising platform.",
  alternates: { canonical: `${SITE_CONFIG.url}/advertise` },
  openGraph: {
    title: `Advertise | ${SITE_CONFIG.name}`,
    description: "Reach a high-intent audience of founders, investors, and technologists.",
    url: `${SITE_CONFIG.url}/advertise`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Advertise | ${SITE_CONFIG.name}`,
    description: "Reach a high-intent audience of founders, investors, and technologists.",
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

        <div className="premium-card border-brand/30 bg-un-paper p-10 text-center">
          <h3 className="text-2xl font-serif text-un-text mb-6">Ready to collaborate?</h3>
          <p className="text-un-muted mb-8">Download our media kit or request a consultation.</p>
          <a href="mailto:advertise@unstory.app" className="inline-block rounded-[4px] bg-brand px-10 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-white transition-colors hover:bg-un-accent">
            Contact Partnerships
          </a>
        </div>
      </div>
    </StaticPageLayout>
  );
}
