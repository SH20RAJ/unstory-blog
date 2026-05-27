# Google Search Console Setup Checklist for Unstory.app

## Initial Setup
1. [ ] Add `unstory.app` property in Google Search Console
2. [ ] Verify ownership using HTML meta tag (set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var)
3. [ ] Verify ownership is confirmed

## Sitemap Submission
4. [ ] Submit `https://unstory.app/sitemap.xml`
5. [ ] Submit `https://unstory.app/news-sitemap.xml` (for Google News)
6. [ ] Verify sitemaps are processed without errors

## URL Inspection
7. [ ] Inspect homepage: `https://unstory.app/`
8. [ ] Request indexing for homepage
9. [ ] Inspect 5 best article URLs
10. [ ] Request indexing for each

## Coverage Report (Pages)
11. [ ] Check "Crawled - currently not indexed"
12. [ ] Check "Discovered - currently not indexed"
13. [ ] Check "Duplicate without user-selected canonical"
14. [ ] Check "Soft 404"
15. [ ] Fix any issues found, validate fixes

## Manual Actions
16. [ ] Check Manual Actions report
17. [ ] If any actions exist, fix and submit reconsideration request

## Enhancements
18. [ ] Check Core Web Vitals report
19. [ ] Check Mobile Usability report
20. [ ] Verify structured data (Article, Organization, WebSite schemas)

## Ongoing Monitoring
- [ ] Weekly: Review impressions/clicks trends
- [ ] Weekly: Check for new coverage issues
- [ ] Monthly: Review top queries and pages
- [ ] Monthly: Submit new article URLs for indexing

## AdSense Integration
21. [ ] Verify ads.txt is accessible at `https://unstory.app/ads.txt`
22. [ ] Confirm AdSense account status in Google AdSense dashboard
23. [ ] Check policy center for any violations
