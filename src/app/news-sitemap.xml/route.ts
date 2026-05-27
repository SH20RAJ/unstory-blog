import { getDb } from "@/lib/db";
import { articles } from "@/db/schema";
import { eq, and, desc, sql, notLike, gt } from "drizzle-orm";
import { SITE_CONFIG } from "@config";

/** Escape special XML characters */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const { db } = await getDb();

    // News sitemap: only articles from the last 48 hours
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const recentArticles = await db
      .select({
        title: articles.title,
        slug: articles.slug,
        publishedAt: articles.publishedAt,
        contentType: articles.contentType,
        trustScore: articles.trustScore,
        factCheckStatus: articles.factCheckStatus,
      })
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          sql`${articles.publishedAt} >= ${twoDaysAgo.getTime()}`,
          notLike(articles.slug, "%test%"),
          notLike(articles.title, "%Test%"),
          gt(articles.trustScore, 69),
        )
      )
      .orderBy(desc(articles.publishedAt));

    // Only include real news articles (not guides, opinion, listicles)
    const newsTypes = ["news", "analysis", "fact_check"];
    const newsArticles = recentArticles.filter(
      (a) => newsTypes.includes(a.contentType || "news") && a.factCheckStatus !== "unverified"
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsArticles
    .map((article) => `
    <url>
      <loc>${SITE_CONFIG.url}/article/${escapeXml(article.slug)}</loc>
      <news:news>
        <news:publication>
          <news:name>${escapeXml(SITE_CONFIG.name)}</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${article.publishedAt?.toISOString()}</news:publication_date>
        <news:title>${escapeXml(article.title)}</news:title>
      </news:news>
    </url>
  `)
    .join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Return empty valid news sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
    return new Response(emptySitemap, {
      headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=60" },
    });
  }
}
