import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
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
  };
  variant?: "default" | "minimal" | "compact";
  className?: string;
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const { title, slug, excerpt, publishedAt, category, heroImageUrl } = article;

  return (
    <article className={cn("group flex flex-col space-y-4", className)}>
      {/* Hero Image */}
      {variant !== "minimal" && (
        <Link href={`/article/${slug}`} className="block relative aspect-video overflow-hidden rounded-lg premium-border">
          {heroImageUrl ? (
            <img
              src={heroImageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder />
          )}
          {category && (
            <div className="absolute top-4 left-4">
              <Badge variant="premium">{category.name}</Badge>
            </div>
          )}
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-col space-y-3">
        {variant === "minimal" && category && (
          <span className="text-[10px] uppercase tracking-widest text-brand font-semibold">
            {category.name}
          </span>
        )}
        
        <Link href={`/article/${slug}`} className="block">
          <h3 className={cn(
            "font-serif text-un-text group-hover:text-brand transition-colors leading-tight",
            variant === "compact" ? "text-lg" : "text-2xl"
          )}>
            {title}
          </h3>
        </Link>

        {variant === "default" && excerpt && (
          <p className="text-un-muted text-sm line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        )}

        <ArticleMeta date={publishedAt} className="pt-2" />
      </div>
    </article>
  );
}
