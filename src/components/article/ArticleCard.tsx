import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import { ArticleMeta } from "./ArticleMeta";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
    heroImage?: {
      publicUrl: string;
      altText?: string | null;
    } | null;
  };
  variant?: "default" | "minimal" | "compact";
  className?: string;
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const { title, slug, excerpt, publishedAt, category, heroImage } = article;

  return (
    <article className={cn("group flex flex-col space-y-4", className)}>
      {/* Hero Image */}
      {variant !== "minimal" && (
        <Link href={`/article/${slug}`} className="block relative aspect-video overflow-hidden rounded-lg premium-border">
          {heroImage?.publicUrl ? (
            <Image
              src={heroImage.publicUrl}
              alt={heroImage.altText || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-premium-gray flex items-center justify-center">
              <span className="text-premium-border font-serif text-4xl font-bold tracking-tighter opacity-20">UNSTORY</span>
            </div>
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
            "font-serif text-white group-hover:text-brand transition-colors leading-tight",
            variant === "compact" ? "text-lg" : "text-2xl"
          )}>
            {title}
          </h3>
        </Link>

        {variant === "default" && excerpt && (
          <p className="text-premium-muted text-sm line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        )}

        <ArticleMeta date={publishedAt} className="pt-2" />
      </div>
    </article>
  );
}
