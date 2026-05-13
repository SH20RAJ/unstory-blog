import { getDb } from "@/lib/db";
import { SITE_CONFIG } from "@config";

export const dynamic = "force-dynamic";

export async function GET() {
  const { queries } = await getDb();
  const articles = await queries.articles.getPublishedArticles(50);

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${SITE_CONFIG.name}</title>
  <link>${SITE_CONFIG.url}</link>
  <description>${SITE_CONFIG.description}</description>
  <language>${SITE_CONFIG.locale}</language>
  <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
  ${articles
    .map((article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_CONFIG.url}/article/${article.slug}</link>
      <guid>${SITE_CONFIG.url}/article/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt || "").toUTCString()}</pubDate>
      <description><![CDATA[${article.excerpt || ""}]]></description>
    </item>`)
    .join("")}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
