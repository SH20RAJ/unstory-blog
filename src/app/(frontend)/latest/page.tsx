import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Latest Briefings",
  description: "The most recent strategic intelligence briefings from Unstory.",
  alternates: { canonical: `${SITE_CONFIG.url}/latest` },
  openGraph: {
    title: `Latest Briefings | ${SITE_CONFIG.name}`,
    description: "The most recent strategic intelligence briefings from Unstory.",
    url: `${SITE_CONFIG.url}/latest`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Latest Briefings | ${SITE_CONFIG.name}`,
    description: "The most recent strategic intelligence briefings from Unstory.",
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
    <div className="editorial-container py-12 lg:py-20">
      <header className="magazine-rule mb-12 py-8 text-center lg:mb-16">
        <Badge variant="premium">Intelligence Archive</Badge>
        <h1 className="mt-6 font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
          Latest Briefings
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-serif text-xl leading-8 text-un-accent">
          Fresh reporting and analysis from the Unstory desk.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article: any) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Pagination 
          currentPage={page} 
          totalPages={5} // Placeholder; calculate from total count in real app
          baseUrl="/latest" 
        />
      </div>
    </div>
  );
}
