import { getDb } from "@/lib/db";
import { SITE_CONFIG } from "@config";

export const dynamic = "force-dynamic";

/** Escape CDATA-end sequence in content */
function escapeCdata(str: string): string {
  return str.replace(/\]\]>/g, "]]]]><![CDATA[>");
}

export async function GET() {
  try {
    const { queries } = await getDb();
    const articles = await queries.articles.getPublishedArticles(50);

    // Filter out test articles
    const filtered = articles.filter(
      (a: any) =>
        !a.slug?.includes("test") &&
        !a.title?.toLowerCase().includes("test") &&
        a.excerpt
    );

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${SITE_CONFIG.name}</title>
  <link>${SITE_CONFIG.url}</link>
  <description>${SITE_CONFIG.description}</description>
  <language>${SITE_CONFIG.locale}</language>
  <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
  ${filtered
    .map((article: any) => `
    <item>
      <title><![CDATA[${escapeCdata(article.title)}]]></title>
      <link>${SITE_CONFIG.url}/article/${article.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/article/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt || "").toUTCString()}</pubDate>
      <description><![CDATA[${escapeCdata(article.excerpt || "")}]]></description>
    </item>`)
    .join("")}
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
</channel>
</rss>`;
    return new Response(emptyRss, {
      headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=60" },
    });
  }
}
