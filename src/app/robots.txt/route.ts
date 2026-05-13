export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /studio
Disallow: /api/

Sitemap: https://unstory.app/sitemap.xml
`;
  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" },
  });
}
