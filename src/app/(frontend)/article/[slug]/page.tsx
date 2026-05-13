import { notFound } from "next/navigation";
import Image from "next/image";
import { getDb } from "@/lib/db";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { AuthorByline } from "@/components/article/AuthorByline";
import { ArticleBody } from "@/components/article/ArticleBody";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { queries } = await getDb();
  const result = await queries.articles.getArticleBySlug(slug);
  
  if (!result) return {};

  const { articles: article } = result;
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt || SITE_CONFIG.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/article/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/article/${slug}`,
      siteName: SITE_CONFIG.name,
      publishedTime: article.publishedAt?.toISOString?.() || undefined,
      modifiedTime: article.updatedAt?.toISOString?.() || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { queries } = await getDb();
  const result = await queries.articles.getArticleBySlug(slug);

  if (!result) {
    notFound();
  }

  const { articles: article, categories: category, authors: author } = result;

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: article.heroImageUrl ? [article.heroImageUrl] : [],
    datePublished: article.publishedAt?.toISOString?.() || article.createdAt?.toISOString?.(),
    dateModified: article.updatedAt?.toISOString?.() || article.createdAt?.toISOString?.(),
    author: author ? [{ "@type": "Person", name: author.name, url: `${SITE_CONFIG.url}/author/${author.slug}` }] : [],
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/article/${slug}`,
    },
    articleSection: category?.name || undefined,
  };

  return (
    <article className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Section */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-20 max-w-4xl text-center">
        <div className="flex flex-col items-center space-y-6">
          {category && (
            <Badge variant="premium" className="px-4 py-1">
              {category.name}
            </Badge>
          )}
          
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-serif font-bold text-un-text leading-[1.1] tracking-tight">
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
      {article.heroImageUrl && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl premium-border shadow-2xl">
            <img
              src={article.heroImageUrl}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3 space-y-12">
            <ArticleBody content={article.body} />
            
            <div className="pt-16 border-t border-un-border">
              {author && <AuthorByline author={author} />}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
