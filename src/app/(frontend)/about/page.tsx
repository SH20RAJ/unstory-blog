import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export default function AboutPage() {
  return (
    <StaticPageLayout 
      title="About Unstory" 
      tagline="Our Mission"
    >
      <p className="text-xl text-premium-muted font-serif italic mb-12 leading-relaxed">
        Unstory is a premium internet intelligence publication dedicated to the wealth-minded. We strip away the noise of the traditional news cycle to provide deep insights into the forces shaping our world.
      </p>
      
      <h2 className="text-2xl text-black font-serif font-bold mt-12 mb-6">Intelligence, Not News</h2>
      <p>
        In an era of information overload, clarity is the ultimate luxury. We don't report on every headline; we analyze the underlying trends in money, AI, business, power, and high-income skills that actually matter for your future.
      </p>

      <h2 className="text-2xl text-black font-serif font-bold mt-12 mb-6">Our Editorial Philosophy</h2>
      <ul className="space-y-4 text-premium-muted">
        <li><strong className="text-brand">Precision:</strong> We value accuracy over speed.</li>
        <li><strong className="text-brand">Perspective:</strong> We look for the "unstory" — the narrative others are missing.</li>
        <li><strong className="text-brand">Power:</strong> We analyze who has it, who wants it, and how it's being used.</li>
      </ul>
    </StaticPageLayout>
  );
}
