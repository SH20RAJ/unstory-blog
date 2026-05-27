import { getDb } from "@/lib/db";
import { HeroGrid } from "@/components/article/HeroGrid";
import { ArticleCard } from "@/components/article/ArticleCard";
import { CategorySection } from "@/components/category/CategorySection";
import { TrendingList } from "@/components/category/TrendingList";
import { NewsletterBlock } from "@/components/ui/NewsletterBlock";
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
  const dispatches = publishedArticles.slice(4, 10);
  const issueDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div>
      <section className="bg-un-paper">
        <div className="editorial-container py-8 lg:py-12">
          <div className="magazine-rule mb-8 flex flex-col gap-3 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-un-muted sm:flex-row sm:items-center sm:justify-between">
            <span>{issueDate}</span>
            <span className="text-un-text">Daily Edition</span>
            <span>AI / Capital / Power / Operators</span>
          </div>

          <HeroGrid featured={featured} others={latestOthers} />
        </div>
      </section>

      <section className="editorial-container grid grid-cols-1 gap-12 border-b border-un-border py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-un-border pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker">Dispatches</span>
              <h2 className="mt-2 font-serif text-3xl font-black leading-none text-un-text lg:text-5xl">
                Latest Intelligence
              </h2>
            </div>
            <Link href="/latest" className="premium-link text-[10px] font-black uppercase tracking-[0.22em] text-un-muted">
              View Latest
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {dispatches.map((article: any) => (
              <ArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-48 space-y-8">
            <TrendingList topics={trendingTopics} />
            <div className="rounded-[6px] border border-un-border bg-un-paper p-6">
              <span className="section-kicker">The Ledger</span>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Wealth", "/category/wealth"],
                  ["AI", "/category/ai"],
                  ["Business", "/category/business"],
                  ["Power", "/category/power"],
                  ["Lifestyle", "/category/lifestyle"],
                  ["Trends", "/category/trends"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="border-t border-un-border pt-3 font-serif text-lg font-semibold text-un-text transition-colors hover:text-brand">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="editorial-container space-y-2 py-8 lg:py-12">
        <CategorySection title="Artificial Intelligence" slug="ai" articles={aiArticles} />
        <CategorySection title="Wealth & Markets" slug="wealth" articles={wealthArticles} />
        <CategorySection title="Business & Operations" slug="business" articles={businessArticles} />
        <CategorySection title="Power & Geopolitics" slug="power" articles={powerArticles} />
        <CategorySection title="Lifestyle & Luxury" slug="lifestyle" articles={lifestyleArticles} />
        <CategorySection title="High-Income Skills" slug="skills" articles={skillsArticles} />
        <CategorySection title="Trends & Signals" slug="trends" articles={trendsArticles} />
      </div>

      <section className="editorial-container pb-16 lg:pb-24">
        <NewsletterBlock />
        <div className="mt-12 flex justify-center">
          <Link href="/blogs" className="group flex flex-col items-center gap-3 text-center">
            <span className="section-kicker text-un-muted group-hover:text-brand">Archive</span>
            <span className="border-b border-brand pb-2 font-serif text-2xl font-black text-un-text transition-colors group-hover:text-brand lg:text-4xl">
              Browse every story
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
