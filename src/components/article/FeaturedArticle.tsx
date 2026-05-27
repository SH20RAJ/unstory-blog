import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ArticleMeta } from "./ArticleMeta";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface FeaturedArticleProps {
  article: {
    title: string;
    slug: string;
    subtitle?: string | null;
    excerpt?: string | null;
    publishedAt: Date | null;
    category?: {
      name: string;
      slug: string;
    } | null;
    heroImageUrl?: string | null;
    author?: {
      name: string;
      avatarUrl?: string | null;
    } | null;
  };
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { title, slug, subtitle, excerpt, publishedAt, category, heroImageUrl, author } = article;

  return (
    <article className="group grid grid-cols-1 gap-8 border-y border-un-border py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
      <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5">
        <div className="space-y-6">
            {category && (
              <Link href={`/category/${category.slug}`}>
                <Badge variant="premium">{category.name}</Badge>
              </Link>
            )}
            
            <Link href={`/article/${slug}`} className="block">
              <h2 className="headline-balance font-serif text-4xl font-black leading-[0.98] text-un-text transition-colors group-hover:text-brand sm:text-5xl xl:text-6xl">
                {title}
              </h2>
            </Link>

            {subtitle && (
              <p className="border-l-2 border-brand pl-5 font-serif text-xl leading-8 text-un-accent lg:text-2xl">
                {subtitle}
              </p>
            )}

            {excerpt && (
              <p className="max-w-xl text-base leading-7 text-un-muted lg:text-lg">
                {excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 pt-2">
              {author && (
                <div className="flex items-center gap-3">
                  {author.avatarUrl ? (
                    <Image src={author.avatarUrl} alt={author.name} width={36} height={36} className="rounded-full" />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-un-surface text-xs font-black text-un-muted">
                      {author.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-un-text">{author.name}</span>
                </div>
              )}
              <ArticleMeta date={publishedAt} />
            </div>
        </div>
      </div>

      <Link href={`/article/${slug}`} className="relative order-1 aspect-[16/10] overflow-hidden rounded-[6px] bg-un-surface lg:order-2 lg:col-span-7 lg:aspect-[16/9]">
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder text="UNSTORY" />
        )}
      </Link>

      <div className="order-3 hidden border-t border-un-border pt-5 lg:col-span-12 lg:grid lg:grid-cols-3 lg:gap-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-un-muted">The Lead Story</p>
        <p className="col-span-2 text-sm leading-6 text-un-muted">
          A high-signal briefing selected for its impact across capital, technology, and operating strategy.
        </p>
      </div>
    </article>
  );
}
