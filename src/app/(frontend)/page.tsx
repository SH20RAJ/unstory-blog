import { getDb } from "@/lib/db";
import { HeroGrid } from "@/components/article/HeroGrid";
import { CategorySection } from "@/components/category/CategorySection";
import { TrendingList } from "@/components/category/TrendingList";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@unstoryapp",
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { queries } = await getDb();
  
  // Fetch data in parallel
  const [
    publishedArticles,
    trendingTopics,
    wealthArticles,
    aiArticles,
    businessArticles,
    powerArticles,
    lifestyleArticles,
    skillsArticles,
    trendsArticles,
  ] = await Promise.all([
    queries.articles.getPublishedArticles(10),
    queries.topics.getTrendingTopics(6),
    queries.articles.getArticlesByCategory("wealth", 4),
    queries.articles.getArticlesByCategory("ai", 4),
    queries.articles.getArticlesByCategory("business", 4),
    queries.articles.getArticlesByCategory("power", 4),
    queries.articles.getArticlesByCategory("lifestyle", 4),
    queries.articles.getArticlesByCategory("skills", 4),
    queries.articles.getArticlesByCategory("trends", 4),
  ]);

  const featured = publishedArticles[0];
  const latestOthers = publishedArticles.slice(1, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Brand Manifesto Section */}
      <section className="pt-8 pb-16 border-b border-un-border text-center space-y-6 max-w-4xl mx-auto">
        <Badge variant="premium" className="mb-4">Operational Intelligence</Badge>
        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-un-text tracking-tighter leading-tight">
          Strategic intelligence for <span className="text-brand">founders, investors, and operators</span> tracking AI, markets, and power shifts.
        </h1>
        <p className="text-xl lg:text-2xl text-un-muted font-serif italic max-w-3xl mx-auto">
          Every briefing is sourced, scored, and updated for high-agency professionals deciphering the new world order.
        </p>
      </section>

      {/* Hero Section */}
      <section>
        <HeroGrid 
          featured={featured} 
          others={latestOthers} 
        />
      </section>

      {/* Middle Sections with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-20">
          <CategorySection 
            title="Artificial Intelligence" 
            slug="ai" 
            articles={aiArticles} 
          />
          <CategorySection 
            title="Wealth & Markets" 
            slug="wealth" 
            articles={wealthArticles} 
          />
        </div>
        
        <aside className="lg:col-span-4">
          <div className="sticky top-32">
            <TrendingList topics={trendingTopics} />
          </div>
        </aside>
      </div>



      {/* Bottom Categories */}
      <div className="space-y-20">
        <CategorySection 
          title="Business & Operations" 
          slug="business" 
          articles={businessArticles} 
        />
        <CategorySection
          title="Power & Geopolitics"
          slug="power"
          articles={powerArticles}
        />
        <CategorySection
          title="Lifestyle & Luxury"
          slug="lifestyle"
          articles={lifestyleArticles}
        />
        <CategorySection
          title="High-Income Skills"
          slug="skills"
          articles={skillsArticles}
        />
        <CategorySection
          title="Trends & Signals"
          slug="trends"
          articles={trendsArticles}
        />
      </div>

      {/* Archive Link */}
      <div className="flex justify-center pb-12">
        <Link 
          href="/blogs" 
          className="group flex flex-col items-center space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-un-muted group-hover:text-brand transition-colors font-bold">
            Continue Gathering Intelligence
          </span>
          <span className="text-2xl lg:text-3xl font-serif font-bold text-un-text border-b-2 border-brand/20 group-hover:border-brand transition-all pb-2">
            View the Full Archive
          </span>
        </Link>
      </div>
    </div>
  );
}
