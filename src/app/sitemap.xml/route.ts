import { getDb } from "@/lib/db";
import { articles, categories } from "@/db/schema";
import { eq, and, desc, notLike, gt } from "drizzle-orm";
import { SITE_CONFIG } from "@config";

/** Escape XML special characters */
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

    const allArticles = await db
      .select({
        title: articles.title,
        slug: articles.slug,
        updatedAt: articles.updatedAt,
        publishedAt: articles.publishedAt,
        trustScore: articles.trustScore,
        body: articles.body,
      })
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          notLike(articles.slug, "%test%"),
          notLike(articles.title, "%Test%"),
          gt(articles.trustScore, 69),
        )
      )
      .orderBy(desc(articles.publishedAt));

    // Filter out articles with body under ~900 words (roughly 4500 chars)
    const qualityArticles = allArticles.filter(
      (a) => a.body && a.body.length >= 4500
    );

    const allCategories = await db
      .select({ slug: categories.slug })
      .from(categories)
      .where(eq(categories.isActive, true));

    const staticPages = [
      "",
      "/blogs",
      "/latest",
      "/trending",
      "/about",
      "/contact",
      "/advertise",
      "/privacy",
      "/terms",
      "/editorial-policy",
      "/corrections-policy",
      "/fact-checking-policy",
      "/methodology",
    ];

    // Deduplicate
    const seen = new Set<string>();
    const urls: string[] = [];

    for (const path of staticPages) {
      const url = `${SITE_CONFIG.url}${path}`;
      if (!seen.has(url)) {
        seen.add(url);
        urls.push(`
  <url>
    <loc>${url}</loc>
    <changefreq>${path === "" ? "hourly" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.5"}</priority>
  </url>`);
      }
    }

    for (const cat of allCategories) {
      const url = `${SITE_CONFIG.url}/category/${cat.slug}`;
      if (!seen.has(url)) {
        seen.add(url);
        urls.push(`
  <url>
    <loc>${escapeXml(url)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
      }
    }

    for (const a of qualityArticles) {
      const url = `${SITE_CONFIG.url}/article/${a.slug}`;
      if (!seen.has(url)) {
        seen.add(url);
        const lastmod = (a.updatedAt || a.publishedAt || new Date()).toISOString?.() || new Date().toISOString();
        urls.push(`
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Return minimal valid sitemap on error
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_CONFIG.url}</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    return new Response(fallback, {
      headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=60" },
    });
  }
}
