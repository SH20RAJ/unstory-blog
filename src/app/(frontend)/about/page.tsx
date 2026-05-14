import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export default function AboutPage() {
  return (
    <StaticPageLayout 
      title="About Unstory" 
      tagline="Our Mission"
    >
      <p className="text-xl text-un-muted font-serif italic mb-12 leading-relaxed">
        Unstory is a strategic intelligence publication for founders, investors, and operators tracking AI, markets, and power shifts. We strip away the noise of the traditional news cycle to provide deep insights into the forces shaping our world.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl text-un-text font-serif font-bold border-l-2 border-brand pl-4">The Mission</h2>
          <p className="text-un-muted leading-relaxed">
            In an era of information overload, clarity is the ultimate luxury. We analyze the underlying trends in money, AI, business, and geopolitics that actually matter for high-agency professionals.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl text-un-text font-serif font-bold border-l-2 border-brand pl-4">The Methodology</h2>
          <p className="text-un-muted leading-relaxed">
            Every briefing is sourced, scored, and updated. We combine human expertise with advanced data processing to decipher the "unstory" — the narrative others are missing.
          </p>
        </div>
      </div>

      <h2 className="text-2xl text-un-text font-serif font-bold mt-12 mb-8">Editorial Governance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {[
          { label: "Editorial Policy", href: "/editorial-policy" },
          { label: "Corrections Policy", href: "/corrections-policy" },
          { label: "Fact-Checking Policy", href: "/fact-checking-policy" },
          { label: "Research Methodology", href: "/methodology" },
        ].map((item) => (
          <a 
            key={item.href} 
            href={item.href}
            className="p-6 bg-un-surface border border-un-border hover:border-brand transition-all group"
          >
            <span className="text-xs uppercase tracking-widest text-un-muted group-hover:text-white font-bold">{item.label}</span>
            <div className="mt-2 text-brand text-xs">Read Standards →</div>
          </a>
        ))}
      </div>

      <div className="p-8 bg-un-surface border border-un-border rounded-xl space-y-6">
        <h2 className="text-2xl text-un-text font-serif font-bold">Contact & Ownership</h2>
        <div className="space-y-4 text-un-muted">
          <p>
            <strong>Publication:</strong> Unstory Intelligence Group
          </p>
          <p>
            <strong>Editorial Inquiries:</strong> <span className="text-brand">intel@unstory.app</span>
          </p>
          <p>
            <strong>Corrections:</strong> <span className="text-brand">corrections@unstory.app</span>
          </p>
          <p>
            <strong>Funding:</strong> Unstory is an independent publication funded through premium advertising and research subscriptions.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
