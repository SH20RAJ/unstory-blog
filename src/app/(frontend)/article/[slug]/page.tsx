import { notFound } from "next/navigation";
import Image from "next/image";
import { getDb } from "@/lib/db";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { AuthorByline } from "@/components/article/AuthorByline";
import { ArticleBody } from "@/components/article/ArticleBody";
import { NewsletterBlock } from "@/components/ui/NewsletterBlock";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { queries } = await getDb();
  const result = await queries.articles.getArticleBySlug(params.slug);
  
  if (!result) return {};

  const { articles: article } = result;
  return {
    title: article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { queries } = await getDb();
  const result = await queries.articles.getArticleBySlug(params.slug);

  if (!result) {
    notFound();
  }

  const { articles: article, categories: category, authors: author, media_assets: heroImage } = result;

  return (
    <article className="min-h-screen">
      {/* Header Section */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-20 max-w-4xl text-center">
        <div className="flex flex-col items-center space-y-6">
          {category && (
            <Badge variant="premium" className="px-4 py-1">
              {category.name}
            </Badge>
          )}
          
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl lg:text-2xl font-serif text-brand italic max-w-2xl">
              {article.subtitle}
            </p>
          )}

          <div className="pt-8 flex flex-col items-center space-y-4">
            <ArticleMeta 
              date={article.publishedAt} 
              readTime="8 min read" 
              className="text-sm"
            />
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {heroImage?.publicUrl && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl premium-border shadow-2xl">
            <Image
              src={heroImage.publicUrl}
              alt={heroImage.altText || article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          {heroImage.credit && (
            <p className="text-[10px] text-premium-muted uppercase tracking-widest mt-4 text-right">
              Photo by {heroImage.credit}
            </p>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3 space-y-12">
            <ArticleBody content={article.body} />
            
            <div className="pt-16 border-t border-premium-border">
              {author && <AuthorByline author={author} />}
            </div>

            <div className="pt-12">
              <NewsletterBlock />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
