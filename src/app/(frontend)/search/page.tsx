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
    <div className="editorial-container py-12 lg:py-20">
      <header className="magazine-rule mb-12 py-8 lg:mb-16">
        <Badge variant="premium">Intelligence Discovery</Badge>
        <h1 className="mt-6 font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
          {query ? `Search results for "${query}"` : "Search Intelligence"}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-8 text-un-accent">
          {articles.length > 0 
            ? `Found ${articles.length} briefings matching your inquiry.`
            : query 
              ? "No briefings found matching your specific query. Try broader keywords."
              : "Enter a query in the search bar above to begin your intelligence gathering."}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
