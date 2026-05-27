import { ArticleCard } from "./ArticleCard";
import { FeaturedArticle } from "./FeaturedArticle";

interface HeroGridProps {
  featured: any;
  others: any[];
}

export function HeroGrid({ featured, others }: HeroGridProps) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        {featured && <FeaturedArticle article={featured} />}
      </div>

      {others.length > 0 && (
        <aside className="border-t border-un-border pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="mb-5 flex items-center justify-between border-b border-un-border pb-3">
            <h2 className="section-kicker">Editor&apos;s Picks</h2>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-un-muted">
              Latest
            </span>
          </div>
          <div className="space-y-6">
            {others.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="minimal" />
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
