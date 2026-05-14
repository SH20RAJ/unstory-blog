import { getDb } from "@/lib/db";
import { articles, categories } from "@/db/schema";
import { eq, desc, notLike, and } from "drizzle-orm";
import { SITE_CONFIG } from "@config";

export async function GET() {
  const { db } = await getDb();

  const allArticles = await db
    .select({ 
      title: articles.title,
      slug: articles.slug, 
      updatedAt: articles.updatedAt, 
      publishedAt: articles.publishedAt 
    })
    .from(articles)
    .where(
      and(
        eq(articles.status, "published"),
        notLike(articles.slug, "%test%"),
        notLike(articles.title, "%Test%")
      )
    )
    .orderBy(desc(articles.publishedAt));

  const allCategories = await db.select({ slug: categories.slug }).from(categories).where(eq(categories.isActive, true));

  const staticPages = [
    "", 
    "/blogs", 
    "/trending", 
    "/about", 
    "/contact", 
    "/advertise", 
    "/privacy", 
    "/terms",
    "/editorial-policy",
    "/corrections-policy",
    "/fact-checking-policy",
    "/methodology"
  ];

  const urls = [
    ...staticPages.map((path) => `
  <url>
    <loc>${SITE_CONFIG.url}${path}</loc>
    <changefreq>${path === "" ? "hourly" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.5"}</priority>
  </url>`),
    ...allCategories.map((cat) => `
  <url>
    <loc>${SITE_CONFIG.url}/category/${cat.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`),
    ...allArticles.map((a) => `
  <url>
    <loc>${SITE_CONFIG.url}/article/${a.slug}</loc>
    <lastmod>${(a.updatedAt || a.publishedAt || new Date()).toISOString?.() || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
