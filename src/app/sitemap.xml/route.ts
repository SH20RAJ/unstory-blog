import { getDb } from "@/lib/db";
import { articles, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const SITE_URL = "https://unstory.app";

export async function GET() {
  const { db } = await getDb();

  const allArticles = await db
    .select({ slug: articles.slug, updatedAt: articles.updatedAt, publishedAt: articles.publishedAt })
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt));

  const allCategories = await db.select({ slug: categories.slug }).from(categories).where(eq(categories.isActive, true));

  const staticPages = ["", "/blogs", "/trending", "/about", "/contact", "/advertise", "/privacy", "/terms"];

  const urls = [
    ...staticPages.map((path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${path === "" ? "hourly" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.5"}</priority>
  </url>`),
    ...allCategories.map((cat) => `
  <url>
    <loc>${SITE_URL}/category/${cat.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`),
    ...allArticles.map((a) => `
  <url>
    <loc>${SITE_URL}/article/${a.slug}</loc>
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
