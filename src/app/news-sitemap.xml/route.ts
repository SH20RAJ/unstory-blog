import { getDb } from "@/lib/db";
import { articles, categories } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { SITE_CONFIG } from "@config";

export async function GET() {
  const { db } = await getDb();

  // News sitemap should only contain articles from the last 2 days (48 hours)
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const recentArticles = await db
    .select({
      title: articles.title,
      slug: articles.slug,
      publishedAt: articles.publishedAt,
    })
    .from(articles)
    .where(
      and(
        eq(articles.status, "published"),
        sql`${articles.publishedAt} >= ${twoDaysAgo.getTime()}`
      )
    )
    .orderBy(desc(articles.publishedAt));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${recentArticles
    .map((article) => `
    <url>
      <loc>${SITE_CONFIG.url}/article/${article.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>${SITE_CONFIG.name}</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${article.publishedAt?.toISOString()}</news:publication_date>
        <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      </news:news>
    </url>
  `).join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
