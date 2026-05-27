import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Intelligence Archive",
  description: "Browse all strategic intelligence briefings on AI, markets, business, and power shifts.",
  alternates: { canonical: `${SITE_CONFIG.url}/blogs` },
  openGraph: {
    title: `Intelligence Archive | ${SITE_CONFIG.name}`,
    description: "Browse all strategic intelligence briefings on AI, markets, business, and power shifts.",
    url: `${SITE_CONFIG.url}/blogs`,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Intelligence Archive | ${SITE_CONFIG.name}`,
    description: "Browse all strategic intelligence briefings on AI, markets, business, and power shifts.",
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

interface BlogsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const { queries } = await getDb();
  const [articles, totalCount] = await Promise.all([
    queries.articles.getPublishedArticles(limit, offset),
    queries.articles.getArticleCount("published"),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="editorial-container py-12 lg:py-20">
      <header className="magazine-rule mb-12 py-8 lg:mb-16">
        <Badge variant="premium">Intelligence Archive</Badge>
        <h1 className="mt-6 font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
          All Briefings
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-8 text-un-accent lg:text-2xl">
          A comprehensive repository of decrypted internet intelligence, sorted by strategic relevance.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-xl italic text-un-muted">
            No intelligence briefings found in this sector.
          </p>
        </div>
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        baseUrl="/blogs" 
      />
    </div>
  );
}
