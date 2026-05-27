# Google Search Console Checklist for Unstory.app

## Initial Setup

1. **Add Property** — Go to [Google Search Console](https://search.google.com/search-console) and add `unstory.app` as a property
2. **Verify Ownership** — Use one of these methods:
   - **Meta tag** — Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env variable with the verification code
   - **HTML file** — Upload the verification HTML file to `public/`
   - **DNS** — Add TXT record to DNS (recommended for domain-level verification)
3. **Set Preferred Domain** — Ensure `https://unstory.app` (not www) is the canonical

## Sitemap Submission

4. **Submit Sitemap** — In GSC, go to Sitemaps and submit:
   - `https://unstory.app/sitemap.xml`
   - `https://unstory.app/news-sitemap.xml`
5. **Verify Sitemap** — Check that both sitemaps return valid XML with no errors

## URL Inspection

6. **Inspect Homepage** — Use URL Inspection tool on `https://unstory.app`
7. **Request Indexing** — If not indexed, click "Request Indexing"
8. **Inspect Top Articles** — Check 5-10 best article URLs:
   - Each should show "URL is on Google"
   - Check for canonical issues
   - Check for mobile usability issues

## Coverage Report

9. **Check Pages Report** — Look for these issues:
   - **Crawled — currently not indexed**: Pages Google found but chose not to index
   - **Discovered — currently not indexed**: Pages in sitemap but not yet crawled
   - **Duplicate without user-selected canonical**: Canonical conflicts
   - **Soft 404**: Pages returning 200 but with thin/error content
   - **Excluded by noindex tag**: Pages with noindex meta
10. **Fix Issues** — For each category:
    - Thin content → Add more content or noindex
    - Duplicate canonicals → Fix canonical tags
    - Soft 404s → Ensure pages have real content

## Rich Results

11. **Check Structured Data** — Verify JSON-LD on:
    - Articles have `Article` or `NewsArticle` schema
    - Breadcrumbs are present
    - Organization schema on homepage
12. **Test Rich Results** — Use [Rich Results Test](https://search.google.com/test/rich-results) on article URLs

## Performance Monitoring

13. **Track Weekly** — Monitor:
    - Total impressions
    - Total clicks
    - Average CTR
    - Average position
14. **Identify Opportunities** — Look for:
    - High impressions, low CTR → Improve titles/descriptions
    - High position, low clicks → Improve snippets
    - Pages dropping in position → Check for content freshness

## AdSense Verification

15. **ads.txt** — Verify `https://unstory.app/ads.txt` returns correct content
16. **Ad Review** — Check AdSense dashboard for policy violations
17. **Page Experience** — Ensure Core Web Vitals pass

## Ongoing Maintenance

- [ ] Submit new articles to IndexNow after publishing
- [ ] Check GSC weekly for crawl errors
- [ ] Update sitemap when adding new page types
- [ ] Monitor for manual actions
- [ ] Review and fix coverage issues monthly
