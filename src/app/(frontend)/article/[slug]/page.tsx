import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { AuthorByline } from "@/components/article/AuthorByline";
import { ArticleBody } from "@/components/article/ArticleBody";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrevNextNavigation } from "@/components/article/PrevNextNavigation";
import { IntelligenceFooter } from "@/components/article/IntelligenceFooter";
import { TrendingUp, ShieldCheck, FileSearch } from "lucide-react";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { queries } = await getDb();
  const result = await queries.articles.getPublicArticleBySlug(slug);

  if (!result) return {};

  const { articles: article } = result;
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt || SITE_CONFIG.description;
  const isLowTrust = (article.trustScore ?? 100) < 70;
  const isUnverifiedYMYL = article.factCheckStatus === "unverified";
  const shouldNoindex = isLowTrust || isUnverifiedYMYL;

  return {
    robots: shouldNoindex ? { index: false, follow: true } : { index: true, follow: true },
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
      images: article.heroImageUrl ? [{ url: article.heroImageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.heroImageUrl ? [article.heroImageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { queries } = await getDb();
  const result = await queries.articles.getPublicArticleBySlug(slug);

  if (!result) {
    notFound();
  }

  const { articles: article, categories: category, authors: author, sources: articleSourcesList } = result;

  // Block low-trust articles from public view
  if ((article.trustScore ?? 100) < 50) {
    notFound();
  }
  
  // Fetch prev/next articles in parallel
  const { prev, next } = await queries.articles.getPrevNextArticles(article.publishedAt || article.createdAt);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.contentType === "news" || article.contentType === "fact_check" ? "NewsArticle" : "Article",
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: article.heroImageUrl ? [article.heroImageUrl] : [],
    datePublished: article.publishedAt?.toISOString?.() || article.createdAt?.toISOString?.(),
    dateModified: article.updatedAt?.toISOString?.() || article.createdAt?.toISOString?.(),
    author: author ? [{ "@type": "Person", name: author.name, url: `${SITE_CONFIG.url}/author/${author.slug}` }] : [],
    publisher: {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/favicon.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/article/${slug}`,
    },
    articleSection: category?.name || undefined,
  };

  // Breadcrumb structured data
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Dashboard",
        "item": SITE_CONFIG.url
      },
      ...(category ? [{
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `${SITE_CONFIG.url}/category/${category.slug}`
      }] : []),
      {
        "@type": "ListItem",
        "position": category ? 3 : 2,
        "name": article.title,
        "item": `${SITE_CONFIG.url}/article/${article.slug}`
      }
    ]
  };

  return (
    <article className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header Section */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-20 max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-6">
          <Breadcrumbs 
            items={[
              ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
              { label: article.title, href: `/article/${article.slug}` }
            ]} 
          />

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
            
            {/* Audit Suggestion: Executive Summary / Why This Matters */}
            <section className="p-8 lg:p-12 bg-un-surface border border-un-border rounded-2xl space-y-8 shadow-2xl shadow-brand/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 text-brand/10 group-hover:text-brand/20 transition-colors">
                <ShieldCheck className="w-24 h-24 -mr-8 -mt-8" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-brand"></div>
                  <h2 className="text-2xl font-serif font-bold text-white">Executive Intelligence</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-un-muted font-bold flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-brand" /> Why This Matters
                    </h3>
                    <p className="text-lg text-un-text font-serif italic leading-relaxed">
                      {article.excerpt || "This briefing deciphers critical shifts in the market hierarchy that directly impact strategic decision-making for investors and operators."}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-un-muted font-bold flex items-center gap-2">
                      <FileSearch className="w-3 h-3 text-brand" /> Analysis Scope
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Primary data verification",
                        "Strategic market implications",
                        "Predictive risk assessment"
                      ].map((item, i) => (
                        <li key={i} className="text-xs text-un-muted flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand"></span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <ArticleBody content={article.body} />
            
            <IntelligenceFooter 
              article={article} 
              author={author} 
              sources={articleSourcesList} 
            />
            
            <div className="pt-16 border-t border-un-border space-y-12">
              <PrevNextNavigation prev={prev} next={next} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <RelatedArticlesSection 
        currentSlug={slug} 
        categoryId={article.categoryId} 
        categoryName={category?.name || "Intelligence"} 
      />
    </article>
  );
}

async function RelatedArticlesSection({ 
  currentSlug, 
  categoryId, 
  categoryName 
}: { 
  currentSlug: string; 
  categoryId: string | null;
  categoryName: string;
}) {
  const { queries } = await getDb();
  let related = await queries.articles.getRelatedArticles(currentSlug, categoryId, 3);
  
  // SEO Fallback: If no related articles in same category, show latest published articles
  const isFallback = related.length === 0;
  if (isFallback) {
    const latest = await queries.articles.getPublishedArticles(4);
    related = latest.filter((a: any) => a.slug !== currentSlug).slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="bg-un-surface border-y border-un-border py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <Badge variant="premium">
              {isFallback ? "Fresh Intelligence" : "Strategic Intelligence"}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-un-text">
              {isFallback ? (
                <>Latest <span className="text-brand">Briefings</span></>
              ) : (
                <>Related Briefings in <span className="text-brand">{categoryName}</span></>
              )}
            </h2>
          </div>
          
          <Link 
            href="/blogs" 
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-un-muted hover:text-brand transition-colors border-b border-un-border pb-1"
          >
            Explore Full Archive
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {related.map((article: any) => (
            <Link 
              key={article.id} 
              href={`/article/${article.slug}`}
              className="group space-y-4"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg premium-border">
                <img 
                  src={article.heroImageUrl || "/placeholder.png"} 
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-un-text group-hover:text-brand transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center text-[10px] uppercase tracking-widest text-un-muted font-bold">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
