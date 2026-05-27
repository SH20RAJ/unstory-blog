import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { TrendingList } from "@/components/category/TrendingList";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Trending Intelligence",
  description: "Stories and topics currently shaping the global landscape for founders and investors.",
  alternates: { canonical: `${SITE_CONFIG.url}/trending` },
  openGraph: {
    title: `Trending Intelligence | ${SITE_CONFIG.name}`,
    description: "Stories and topics currently shaping the global landscape for founders and investors.",
    url: `${SITE_CONFIG.url}/trending`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Trending Intelligence | ${SITE_CONFIG.name}`,
    description: "Stories and topics currently shaping the global landscape for founders and investors.",
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
    <div className="editorial-container py-12 lg:py-20">
      <header className="magazine-rule mb-12 max-w-5xl py-8 lg:mb-16">
        <Badge variant="premium">Real-time Intelligence</Badge>
        <div className="mt-6 space-y-5">
          <h1 className="font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
            Trending Now
          </h1>
          <p className="max-w-3xl font-serif text-xl leading-8 text-un-accent lg:text-2xl">
            The stories and topics currently shaping the global landscape.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {trendingArticles.map((result: any) => (
              <ArticleCard 
                key={result.slug} 
                article={result} 
              />
            ))}
          </div>
          
          {trendingArticles.length === 0 && (
            <div className="rounded-[6px] border border-dashed border-un-border py-20 text-center">
              <p className="font-serif text-lg italic text-un-muted">
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
