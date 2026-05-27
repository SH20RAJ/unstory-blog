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
  const [lead, ...rest] = articles;

  return (
    <section className="border-t border-un-border py-12 first:border-t-0 lg:py-16">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="section-kicker">Section</span>
          <h2 className="font-serif text-3xl font-black leading-none text-un-text lg:text-5xl">{title}</h2>
        </div>
        <Link 
          href={`/category/${slug}`} 
          className="group inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.22em] text-un-muted transition-colors hover:text-brand"
        >
          <span>All Stories</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <ArticleCard article={lead} className="lg:col-span-5" />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:col-span-7">
          {rest.slice(0, 3).map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
