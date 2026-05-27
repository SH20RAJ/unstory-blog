import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Contact Us — Unstory",
  description: "Get in touch with the Unstory team. Editorial inquiries, tips, and partnership proposals.",
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
  openGraph: {
    title: "Contact Us",
    description: "Get in touch with the Unstory team.",
    url: `${SITE_CONFIG.url}/contact`,
    siteName: SITE_CONFIG.name,
  },
};

export default function ContactPage() {
  return (
    <StaticPageLayout 
      title="Contact Us" 
      tagline="Get in Touch"
    >
      <p className="text-center text-un-muted mb-12">
        Have a tip, a question, or a proposal? We prioritize high-value communication.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="premium-card p-8 text-center">
          <h3 className="text-brand font-bold uppercase tracking-widest text-xs mb-4">Editorial</h3>
          <p className="text-un-text text-lg">tips@unstory.app</p>
        </div>
        <div className="premium-card p-8 text-center">
          <h3 className="text-brand font-bold uppercase tracking-widest text-xs mb-4">General</h3>
          <p className="text-un-text text-lg">hello@unstory.app</p>
        </div>
      </div>

      <div className="mt-16 pt-16 border-t border-un-border text-center">
        <p className="text-un-muted">
          Based in the cloud. Operating at the edge.
        </p>
      </div>
    </StaticPageLayout>
  );
}
