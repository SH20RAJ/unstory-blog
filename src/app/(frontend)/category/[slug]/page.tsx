import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { TrendingList } from "@/components/category/TrendingList";
import { TopicPill } from "@/components/category/TopicPill";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";
import { Pagination } from "@/components/ui/Pagination";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { queries } = await getDb();
  const cat = await queries.categories.getCategoryBySlug(slug);
  if (!cat) return {};
  const title = cat.seoTitle || `${cat.name} Intelligence`;
  const description = cat.seoDescription || cat.description || `${cat.name} coverage from ${SITE_CONFIG.name}`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_CONFIG.url}/category/${slug}` },
    openGraph: { title, description, url: `${SITE_CONFIG.url}/category/${slug}`, siteName: SITE_CONFIG.name },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const { queries } = await getDb();
  
  const categoryResult = await queries.categories.getCategoryWithChildren(slug);
  if (!categoryResult) {
    notFound();
  }

  const [articlesResult, trendingTopics, totalCount] = await Promise.all([
    queries.articles.getArticlesByCategory(slug, limit, offset),
    queries.topics.getTrendingTopics(5),
    queries.articles.getArticleCount("published", slug),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Category Header */}
      <header className="mb-16 lg:mb-24 max-w-4xl">
        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
            Intelligence Category
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-un-text tracking-tight">
            {categoryResult.name}
          </h1>
          <p className="text-xl lg:text-2xl text-un-muted font-serif leading-relaxed italic">
            {categoryResult.description}
          </p>
        </div>

        {/* Subcategories / Topics */}
        {categoryResult.children.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-12">
            {categoryResult.children.map((child: any) => (
              <TopicPill 
                key={child.slug} 
                name={child.name} 
                slug={child.slug} 
              />
            ))}
          </div>
        )}
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {articlesResult.map((article: any) => (
              <ArticleCard 
                key={article.slug} 
                article={article} 
              />
            ))}
          </div>
          
          {articlesResult.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-un-border rounded-2xl">
              <p className="text-un-muted font-serif italic text-lg">
                Intelligence briefings are being prepared for this category.
              </p>
            </div>
          )}

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            baseUrl={`/category/${slug}`} 
          />
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-32">
            <TrendingList topics={trendingTopics} />
          </div>
        </aside>
      </div>
    </div>
  );
}
