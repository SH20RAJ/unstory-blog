import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SearchInput } from "@/components/ui/SearchInput";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const { queries } = await getDb();
  
  const results = query 
    ? await queries.articles.searchArticles(query) 
    : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="mb-16 lg:mb-24 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-black tracking-tight mb-8">
          {query ? `Search: "${query}"` : "Search Intelligence"}
        </h1>
        <SearchInput className="max-w-xl mx-auto" />
      </header>

      {query && (
        <div className="space-y-12">
          <p className="text-premium-muted uppercase tracking-widest text-xs font-bold">
            {results.length} results found for intelligence query
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {results.map((result: any) => (
              <ArticleCard key={result.slug} article={result} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-premium-border rounded-2xl">
              <p className="text-premium-muted font-serif italic text-lg">
                No intelligence briefings match your current parameters.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
