import { getDb } from "@/lib/db";
import { SITE_CONFIG } from "@config";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { queries } = await getDb();
    const allArticles = await queries.articles.getPublishedArticles(50);

    // Filter out test/draft/low-quality
    const articles = allArticles.filter((a: any) => {
      if (a.slug?.includes("test") || a.title?.includes("Test")) return false;
      if (a.slug?.includes("demo") || a.slug?.includes("sample")) return false;
      return true;
    });

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(SITE_CONFIG.name)}</title>
  <link>${SITE_CONFIG.url}</link>
  <description>${escapeXml(SITE_CONFIG.description)}</description>
  <language>${SITE_CONFIG.locale}</language>
  <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
${articles
  .map(
    (article: any) => `  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${SITE_CONFIG.url}/article/${escapeXml(article.slug)}</link>
    <guid isPermaLink="true">${SITE_CONFIG.url}/article/${escapeXml(article.slug)}</guid>
    <pubDate>${new Date(article.publishedAt || "").toUTCString()}</pubDate>
    <description><![CDATA[${article.excerpt || ""}]]></description>
  </item>`
  )
  .join("\n")}
</channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Return valid empty RSS on error
    const emptyRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${SITE_CONFIG.name}</title>
  <link>${SITE_CONFIG.url}</link>
  <description>${SITE_CONFIG.description}</description>
  <language>${SITE_CONFIG.locale}</language>
  <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
</channel>
</rss>`;

    return new Response(emptyRss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }
}
