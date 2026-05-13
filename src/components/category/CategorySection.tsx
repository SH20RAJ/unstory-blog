import Link from "next/link";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: any[];
}

export function CategorySection({ title, slug, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 border-t border-un-border first:border-t-0">
      <div className="flex items-end justify-between mb-10">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-bold">Category</span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-un-text tracking-tight">{title}</h2>
        </div>
        <Link 
          href={`/category/${slug}`} 
          className="flex items-center space-x-1 text-sm font-semibold text-un-muted hover:text-brand transition-colors group"
        >
          <span>View All Intelligence</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {articles.map((article) => (
          <ArticleCard 
            key={article.slug} 
            article={article} 
            variant="compact" 
          />
        ))}
      </div>
    </section>
  );
}
