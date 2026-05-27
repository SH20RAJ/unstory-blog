import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ArticleCardProps {
  article: {
    title: string;
    slug: string;
    excerpt?: string | null;
    publishedAt: Date | null;
    category?: {
      name: string;
      slug: string;
    } | null;
    heroImageUrl?: string | null;
    author?: {
      name: string;
    } | null;
  };
  variant?: "default" | "minimal" | "compact";
  className?: string;
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const { title, slug, excerpt, publishedAt, category, heroImageUrl, author } = article;
  const showImage = variant !== "minimal";

  return (
    <article className={cn(
      "group border-t border-un-border pt-5",
      variant === "compact" ? "space-y-3" : "space-y-4",
      className
    )}>
      {showImage && (
        <Link href={`/article/${slug}`} className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-un-surface">
          {heroImageUrl ? (
            <img
              src={heroImageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </Link>
      )}

      <div className="space-y-3">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="section-kicker inline-flex hover:text-un-accent"
          >
            {category.name}
          </Link>
        )}
        
        <Link href={`/article/${slug}`} className="block">
          <h3 className={cn(
            "headline-balance font-serif font-bold leading-[1.05] text-un-text transition-colors group-hover:text-brand",
            variant === "compact" ? "text-xl" : "text-2xl lg:text-[1.72rem]"
          )}>
            {title}
          </h3>
        </Link>

        {excerpt && variant !== "compact" && (
          <p className="line-clamp-3 text-sm leading-6 text-un-muted">
            {excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
          {author?.name && (
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-un-text/70">
              {author.name}
            </span>
          )}
          <ArticleMeta date={publishedAt} />
        </div>
      </div>
    </article>
  );
}
