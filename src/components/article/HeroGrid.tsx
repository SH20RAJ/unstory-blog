import { ArticleCard } from "./ArticleCard";
import { FeaturedArticle } from "./FeaturedArticle";

interface HeroGridProps {
  featured: any;
  others: any[];
}

export function HeroGrid({ featured, others }: HeroGridProps) {
  return (
    <div className="space-y-12">
      {/* Primary Featured Story */}
      {featured && <FeaturedArticle article={featured} />}

      {/* Secondary Stories Grid */}
      {others.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {others.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
