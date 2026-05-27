import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { FileSearch, ShieldCheck, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@config";
import { getDb } from "@/lib/db";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { AuthorByline } from "@/components/article/AuthorByline";
import { IntelligenceFooter } from "@/components/article/IntelligenceFooter";
import { PrevNextNavigation } from "@/components/article/PrevNextNavigation";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

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
  const shouldNoindex = (article.trustScore !== null && article.trustScore < 70);

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

  if ((article.trustScore ?? 100) < 50) {
    notFound();
  }

  const { prev, next } = await queries.articles.getPrevNextArticles(article.publishedAt || article.createdAt);
  const readTime = `${Math.max(4, Math.ceil(String(article.body || "").split(/\s+/).filter(Boolean).length / 220))} min read`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.contentType === "news" ? "NewsArticle" : "Article",
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
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/article/${slug}`,
    },
    articleSection: category?.name || undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      ...(category ? [{
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${SITE_CONFIG.url}/category/${category.slug}`,
      }] : []),
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: article.title,
        item: `${SITE_CONFIG.url}/article/${article.slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <header className="border-b border-un-border bg-un-paper">
        <div className="editorial-container py-10 lg:py-14">
          <Breadcrumbs
            items={[
              ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
              { label: article.title, href: `/article/${article.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {category && (
                  <Link href={`/category/${category.slug}`}>
                    <Badge variant="premium">{category.name}</Badge>
                  </Link>
                )}
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-un-muted">
                  {article.contentType}
                </span>
              </div>

              <h1 className="headline-balance max-w-5xl font-serif text-5xl font-black leading-[0.96] text-un-text sm:text-6xl lg:text-7xl">
                {article.title}
              </h1>

              {(article.subtitle || article.excerpt) && (
                <p className="mt-7 max-w-3xl border-l-2 border-brand pl-5 font-serif text-2xl leading-9 text-un-accent">
                  {article.subtitle || article.excerpt}
                </p>
              )}

              <div className="mt-8">
                <ArticleMeta date={article.publishedAt} readTime={readTime} />
              </div>
            </div>

            <aside className="space-y-5 lg:col-span-4">
              {author && <AuthorByline author={author} />}
              <div className="rounded-[6px] border border-un-border bg-un-bg p-5">
                <span className="section-kicker">Issue Notes</span>
                <dl className="mt-5 grid grid-cols-2 gap-5">
                  <div>
                    <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-un-muted">Trust</dt>
                    <dd className="mt-2 font-serif text-3xl font-black text-un-text">
                      {article.trustScore ?? 100}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-un-muted">Read</dt>
                    <dd className="mt-2 font-serif text-3xl font-black text-un-text">
                      {readTime.replace(" min read", "")}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <div className="editorial-container py-8 lg:py-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] bg-un-surface lg:aspect-[21/9]">
          {article.heroImageUrl ? (
            <img
              src={article.heroImageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder text="UNSTORY" />
          )}
        </div>
      </div>

      <div className="editorial-container grid grid-cols-1 gap-10 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-48 space-y-5 border-t border-un-border pt-5">
            <span className="section-kicker">In This Story</span>
            <div className="space-y-4 text-sm leading-6 text-un-muted">
              <p>{category?.name || "Unstory"} coverage for founders, investors, and operators.</p>
              {article.sourceUrl && (
                <Link href={article.sourceUrl} className="premium-link inline-flex text-un-accent">
                  Primary source
                </Link>
              )}
            </div>
          </div>
        </aside>

        <main className="space-y-12 lg:col-span-6">
          <section className="rounded-[6px] border border-un-border bg-un-paper p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <h2 className="section-kicker text-un-text">Executive Intelligence</h2>
            </div>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-un-muted">
                  <TrendingUp className="h-3.5 w-3.5 text-brand" /> Why It Matters
                </h3>
                <p className="font-serif text-xl leading-8 text-un-text">
                  {article.excerpt || "A concise read on the shift, the incentives underneath it, and what changes next."}
                </p>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-un-muted">
                  <FileSearch className="h-3.5 w-3.5 text-brand" /> Analysis Scope
                </h3>
                <ul className="space-y-2 text-sm leading-6 text-un-muted">
                  <li>Primary signal and market context</li>
                  <li>Operator, investor, and platform implications</li>
                  <li>Risks, incentives, and next checkpoints</li>
                </ul>
              </div>
            </div>
          </section>

          <ArticleBody content={article.body} />

          <IntelligenceFooter
            article={article}
            author={author}
            sources={articleSourcesList}
          />

          <div className="pt-8">
            <PrevNextNavigation prev={prev} next={next} />
          </div>
        </main>

        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-48 rounded-[6px] border border-un-border bg-un-paper p-5">
            <span className="section-kicker">Publication Standard</span>
            <p className="mt-4 text-sm leading-6 text-un-muted">
              Unstory briefings are written for signal density: what happened, why it travels, and what operators should watch next.
            </p>
            <Link href="/editorial-policy" className="mt-5 inline-flex text-[10px] font-black uppercase tracking-[0.22em] text-brand hover:text-un-accent">
              Editorial Policy
            </Link>
          </div>
        </aside>
      </div>

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
  categoryName,
}: {
  currentSlug: string;
  categoryId: string | null;
  categoryName: string;
}) {
  const { queries } = await getDb();
  let related = await queries.articles.getRelatedArticles(currentSlug, categoryId, 3);

  const isFallback = related.length === 0;
  if (isFallback) {
    const latest = await queries.articles.getPublishedArticles(4);
    related = latest.filter((a: any) => a.slug !== currentSlug).slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="border-y border-un-border bg-un-paper py-16 lg:py-20">
      <div className="editorial-container">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">
              {isFallback ? "Fresh Intelligence" : categoryName}
            </span>
            <h2 className="mt-3 font-serif text-3xl font-black leading-none text-un-text lg:text-5xl">
              Read next
            </h2>
          </div>

          <Link
            href="/blogs"
            className="premium-link text-[10px] font-black uppercase tracking-[0.24em] text-un-muted"
          >
            Full Archive
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {related.map((article: any) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group border-t border-un-border pt-5"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-un-surface">
                {article.heroImageUrl ? (
                  <img
                    src={article.heroImageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              <h3 className="headline-balance mt-4 font-serif text-2xl font-bold leading-tight text-un-text transition-colors group-hover:text-brand">
                {article.title}
              </h3>
              <div className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-un-muted">
                {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
