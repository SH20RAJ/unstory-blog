import { getDb } from "@/lib/db";
import { articles, categories } from "@/db/schema";
import { eq, and, desc, sql, notLike } from "drizzle-orm";
import { SITE_CONFIG } from "@config";

const YMYL_CATEGORIES = [
  "investing", "personal-finance", "insurance", "banking", "real-estate",
  "politics", "geopolitics", "regulation", "longevity", "wealth", "power",
];

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

    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const recentArticles = await db
      .select({
        title: articles.title,
        slug: articles.slug,
        publishedAt: articles.publishedAt,
        contentType: articles.contentType,
        factCheckStatus: articles.factCheckStatus,
      })
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          sql`${articles.publishedAt} >= ${twoDaysAgo.getTime()}`,
          notLike(articles.slug, "%test%"),
          notLike(articles.title, "%Test%"),
        )
      )
      .orderBy(desc(articles.publishedAt));

    // Only include real news articles, not evergreen guides/opinion
    const newsArticles = recentArticles.filter((a) => {
      if (a.contentType === "guide" || a.contentType === "opinion") return false;
      if (a.factCheckStatus === "unverified") return false;
      return true;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsArticles
  .map(
    (article) => `  <url>
    <loc>${SITE_CONFIG.url}/article/${escapeXml(article.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_CONFIG.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.publishedAt?.toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Return valid empty news sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;

    return new Response(emptySitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }
}
