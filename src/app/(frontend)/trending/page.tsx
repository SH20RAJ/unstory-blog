import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { TrendingList } from "@/components/category/TrendingList";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Trending Intelligence — Unstory",
  description: "The stories and topics currently shaping the global landscape. Trending intelligence on AI, markets, business, and geopolitics.",
  alternates: { canonical: `${SITE_CONFIG.url}/trending` },
  openGraph: {
    title: "Trending Intelligence",
    description: "The stories and topics currently shaping the global landscape.",
    url: `${SITE_CONFIG.url}/trending`,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const { queries } = await getDb();
  
  const [trendingArticles, trendingTopics] = await Promise.all([
    queries.articles.getTrendingArticles(20),
    queries.topics.getTrendingTopics(10),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="mb-16 lg:mb-24 max-w-4xl">
        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
            Real-time Intelligence
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-un-text tracking-tight">
            Trending Now
          </h1>
          <p className="text-xl lg:text-2xl text-un-muted font-serif leading-relaxed italic">
            The stories and topics currently shaping the global landscape.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {trendingArticles.map((result: any) => (
              <ArticleCard 
                key={result.slug} 
                article={result} 
              />
            ))}
          </div>
          
          {trendingArticles.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-un-border rounded-2xl">
              <p className="text-un-muted font-serif italic text-lg">
                No trending stories at the moment. Check back soon.
              </p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-32">
            <TrendingList topics={trendingTopics} />
          </div>
        </aside>
      </div>
    </div>
  );
}
