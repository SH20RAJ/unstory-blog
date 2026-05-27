import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ArticleCard } from "@/components/article/ArticleCard";
import { TrendingList } from "@/components/category/TrendingList";
import { TopicPill } from "@/components/category/TopicPill";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";

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
    <div className="editorial-container py-12 lg:py-20">
      <header className="magazine-rule mb-12 max-w-5xl py-8 lg:mb-16">
        <Badge variant="premium">Intelligence Category</Badge>
        <div className="mt-6 space-y-5">
          <h1 className="font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
            {categoryResult.name}
          </h1>
          <p className="max-w-3xl font-serif text-xl leading-8 text-un-accent lg:text-2xl">
            {categoryResult.description}
          </p>
        </div>

        {categoryResult.children.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-10">
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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {articlesResult.map((article: any) => (
              <ArticleCard 
                key={article.slug} 
                article={article} 
              />
            ))}
          </div>
          
          {articlesResult.length === 0 && (
            <div className="rounded-[6px] border border-dashed border-un-border py-20 text-center">
              <p className="font-serif text-lg italic text-un-muted">
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
