import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <header className="mb-16 space-y-6">
        <Badge variant="premium">Intelligence Archive</Badge>
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-un-text tracking-tight">
          All Briefings
        </h1>
        <p className="text-un-muted text-lg font-serif italic max-w-2xl">
          A comprehensive repository of decrypted internet intelligence, sorted by strategic relevance.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-un-muted font-serif italic text-xl">
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
