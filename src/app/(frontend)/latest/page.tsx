import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Pagination } from "@/components/ui/Pagination";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Latest Intelligence Briefings — Unstory",
  description: "The latest strategic intelligence briefings covering AI, markets, business, and power shifts for founders and investors.",
  alternates: { canonical: `${SITE_CONFIG.url}/latest` },
  openGraph: {
    title: "Latest Intelligence Briefings",
    description: "The latest strategic intelligence briefings from Unstory.",
    url: `${SITE_CONFIG.url}/latest`,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

interface LatestPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function LatestPage({ searchParams }: LatestPageProps) {
  const { page: pageParam } = await searchParams;
  const { queries } = await getDb();
  const page = parseInt(pageParam || "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  const articles = await queries.articles.getPublishedArticles(limit, offset);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="mb-16 lg:mb-24 text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
          Intelligence Archive
        </span>
        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-un-text tracking-tight mt-4">
          Latest Briefings
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
        {articles.map((article: any) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <Pagination 
          currentPage={page} 
          totalPages={5} // Placeholder; calculate from total count in real app
          baseUrl="/latest" 
        />
      </div>
    </div>
  );
}
