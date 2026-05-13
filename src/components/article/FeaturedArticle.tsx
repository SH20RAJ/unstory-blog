import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ArticleMeta } from "./ArticleMeta";

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
    heroImage?: {
      publicUrl: string;
      altText?: string | null;
    } | null;
    author?: {
      name: string;
      avatarUrl?: string | null;
    } | null;
  };
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { title, slug, subtitle, excerpt, publishedAt, category, heroImage, author } = article;

  return (
    <div className="relative group overflow-hidden rounded-xl premium-border bg-premium-gray">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="space-y-6">
            {category && (
              <Link href={`/category/${category.slug}`}>
                <Badge variant="premium">{category.name}</Badge>
              </Link>
            )}
            
            <Link href={`/article/${slug}`} className="block">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-[1.1] group-hover:text-brand transition-colors">
                {title}
              </h2>
            </Link>

            {subtitle && (
              <p className="text-xl lg:text-2xl font-serif text-brand/90 italic">
                {subtitle}
              </p>
            )}

            {excerpt && (
              <p className="text-premium-muted text-lg leading-relaxed max-w-xl">
                {excerpt}
              </p>
            )}

            <div className="pt-4 flex items-center space-x-6">
              {author && (
                <div className="flex items-center space-x-3">
                  {author.avatarUrl ? (
                    <Image src={author.avatarUrl} alt={author.name} width={40} height={40} className="rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-premium-border flex items-center justify-center text-xs font-bold text-premium-muted">
                      {author.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-white">{author.name}</span>
                </div>
              )}
              <ArticleMeta date={publishedAt} className="text-base" />
            </div>
          </div>
        </div>

        {/* Image Side */}
        <Link href={`/article/${slug}`} className="relative aspect-square lg:aspect-auto h-full overflow-hidden order-1 lg:order-2">
          {heroImage?.publicUrl ? (
            <Image
              src={heroImage.publicUrl}
              alt={heroImage.altText || title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-premium-dark flex items-center justify-center">
              <span className="text-premium-border font-serif text-8xl font-bold tracking-tighter opacity-10">UNSTORY</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-premium-dark/60 to-transparent lg:hidden" />
        </Link>
      </div>
    </div>
  );
}
