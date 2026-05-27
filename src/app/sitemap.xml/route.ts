import { getDb } from "@/lib/db";
import { articles, categories } from "@/db/schema";
import { eq, desc, notLike, and, gt, sql } from "drizzle-orm";
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

    // Fetch published articles, excluding test/sample content and low-quality articles
    const allArticles = await db
      .select({
        title: articles.title,
        slug: articles.slug,
        updatedAt: articles.updatedAt,
        publishedAt: articles.publishedAt,
        body: articles.body,
        trustScore: articles.trustScore,
        factCheckStatus: articles.factCheckStatus,
        categoryId: articles.categoryId,
      })
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          notLike(articles.slug, "%test%"),
          notLike(articles.slug, "%demo%"),
          notLike(articles.slug, "%sample%"),
          notLike(articles.title, "%Test%"),
          notLike(articles.title, "%test%"),
          gt(articles.trustScore, 69),
        )
      )
      .orderBy(desc(articles.publishedAt));

    const allCategories = await db
      .select({ slug: categories.slug })
      .from(categories)
      .where(eq(categories.isActive, true));

    // YMYL category slugs that require fact-checking
    const YMYL_CATEGORIES = [
      "investing", "personal-finance", "insurance", "banking",
      "real-estate", "politics", "geopolitics", "regulation", "longevity",
      "wealth", "power",
    ];

    // Filter articles: exclude thin content and unverified YMYL
    const filteredArticles = allArticles.filter((a) => {
      const wordCount = (a.body || "").split(/\s+/).filter(Boolean).length;
      if (wordCount < 150) return false;
      if (YMYL_CATEGORIES.includes(a.categoryId || "") && a.factCheckStatus === "unverified") return false;
      return true;
    });

    const staticPages = [
      { path: "", changefreq: "hourly", priority: "1.0" },
      { path: "/blogs", changefreq: "daily", priority: "0.8" },
      { path: "/latest", changefreq: "daily", priority: "0.8" },
      { path: "/trending", changefreq: "daily", priority: "0.7" },
      { path: "/about", changefreq: "monthly", priority: "0.5" },
      { path: "/contact", changefreq: "monthly", priority: "0.3" },
      { path: "/advertise", changefreq: "monthly", priority: "0.4" },
      { path: "/privacy", changefreq: "yearly", priority: "0.2" },
      { path: "/terms", changefreq: "yearly", priority: "0.2" },
      { path: "/editorial-policy", changefreq: "monthly", priority: "0.3" },
      { path: "/corrections-policy", changefreq: "monthly", priority: "0.3" },
      { path: "/fact-checking-policy", changefreq: "monthly", priority: "0.3" },
      { path: "/methodology", changefreq: "monthly", priority: "0.3" },
    ];

    const urls = [
      ...staticPages.map((p) => `
  <url>
    <loc>${SITE_CONFIG.url}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
      ...allCategories.map((cat) => `
  <url>
    <loc>${SITE_CONFIG.url}/category/${escapeXml(cat.slug)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`),
      ...filteredArticles.map((a) => {
        const lastmod = (a.updatedAt || a.publishedAt || new Date());
        const lastmodStr = lastmod instanceof Date ? lastmod.toISOString() : new Date(lastmod).toISOString();
        return `
  <url>
    <loc>${SITE_CONFIG.url}/article/${escapeXml(a.slug)}</loc>
    <lastmod>${lastmodStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      }),
    ];

    // Deduplicate URLs
    const uniqueUrls = [...new Set(urls)];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Always return valid XML, never 500
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    return new Response(emptySitemap, {
      headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=60" },
    });
  }
}
