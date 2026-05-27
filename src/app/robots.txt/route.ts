export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /studio/
Disallow: /admin/
Disallow: /my-route/
Disallow: /graphql/
Disallow: /graphql-playground/
Disallow: /search
Disallow: /indexnow

Sitemap: https://unstory.app/sitemap.xml
Sitemap: https://unstory.app/news-sitemap.xml
`;
  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400" },
  });
}
