import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || "";
  return {
    title: query ? `Search: ${query}` : "Search Intelligence",
    description: `Search results for ${query || 'intelligence briefings'} on Unstory.`,
    robots: {
      index: false, // Search results shouldn't usually be indexed
      follow: true,
    }
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";

  const { queries } = await getDb();
  const articles = query ? await queries.articles.searchArticles(query, 50) : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <header className="mb-16 space-y-6">
        <Badge variant="premium">Intelligence Discovery</Badge>
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-un-text tracking-tight">
          {query ? `Search results for "${query}"` : "Search Intelligence"}
        </h1>
        <p className="text-un-muted text-lg font-serif italic max-w-2xl">
          {articles.length > 0 
            ? `Found ${articles.length} briefings matching your inquiry.`
            : query 
              ? "No briefings found matching your specific query. Try broader keywords."
              : "Enter a query in the search bar above to begin your intelligence gathering."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
