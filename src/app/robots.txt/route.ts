export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /studio/
Disallow: /admin/
Disallow: /my-route/
Disallow: /graphql/
Disallow: /graphql-playground/

Sitemap: https://unstory.app/sitemap.xml
Sitemap: https://unstory.app/news-sitemap.xml
`;
  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400, s-maxage=86400" },
  });
}
