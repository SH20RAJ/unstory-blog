# Google Indexing & Monetization Fix Report

Generated: 2026-05-27

## Root Cause Analysis

### Why Google barely indexes Unstory

1. **Conflicting robots.txt**: Two sources of truth (public/robots.txt and src/app/robots.txt/route.ts) with different rules. The static file was less restrictive.
2. **Test/sample content in sitemap**: Sitemap included draft/test articles with low trust scores, diluting crawl budget.
3. **Missing metadata**: Most pages (blogs, latest, trending, about, contact, privacy, advertise) had no metadata exports — Google couldn't generate proper snippets.
4. **No canonical URLs on static pages**: Only article and category pages had canonicals.
5. **Low-quality content indexed**: Articles with trust scores < 70 and "unverified" fact-check status were publicly accessible and indexable.
6. **Missing Google verification**: No google-site-verification meta tag mechanism.
7. **Sitemap returned 500 on DB errors**: No error handling meant broken sitemap during DB issues.
8. **Fake source claims**: "Verified primary sources including SEC filings" shown even when no sources existed — damages E-E-A-T.

## What Was Fixed

### Phase 1: Indexability
- Consolidated robots.txt to single source (route.ts)
- Added proper Disallow rules for /api/, /studio/, /admin/, /search, /graphql/
- Added news-sitemap.xml reference to robots.txt
- Removed conflicting public/robots.txt

### Phase 2: Sitemap Quality
- Sitemap filters out test articles (slug/title matching)
- Sitemap filters out articles with trustScore < 70
- Sitemap filters out articles with body < 4500 chars (~900 words)
- URL deduplication added
- XML character escaping added
- Try/catch with valid fallback XML
- News sitemap filters by contentType and factCheckStatus
- RSS filters out test articles

### Phase 3: Article Access Control
- New `getPublicArticleBySlug()` method that only returns published, non-test articles
- All public queries filter out test/sample content
- Article page uses public-only query

### Phase 4: Metadata
- Added metadata to: homepage, blogs, latest, trending, about, contact, privacy, advertise, terms, editorial-policy, corrections-policy, fact-checking-policy, methodology
- All pages have canonical URLs
- Search page has noindex
- Low-trust articles get noindex via robots meta

### Phase 5: E-E-A-T / Trust
- Fixed trust score display (shows "Pending Review" for null/low scores)
- Fixed verification status display (shows "Under Review" for null)
- Changed misleading source claim to honest "sources being compiled"
- Added universal disclaimer for informational content
- JSON-LD schema type changed: NewsArticle only for news/fact_check, Article for others
- Added Google site verification meta tag support

### Phase 6: AdSense
- AdSlot component with client-side rendering, CLS prevention, and label
- AdPlacement component with trust-score gating
- Ads only show on articles with trustScore >= 70
- ads.txt verified correct
- Env-based slot configuration

### Phase 7: Monetization Infrastructure
- monetization.ts config with categories, disclosure, topic mapping
- AffiliateDisclosure component
- Money keyword plan with 30 target articles

### Phase 8: Internal Linking
- internal-links.ts utility
- Homepage expanded with lifestyle and skills sections

### Phase 9: Build Quality
- Security headers added to next.config.ts
- Cache headers for sitemap, robots, RSS
- /indexnow redirect to / (was a public-facing debug page)
- SEO audit script added

## Files Changed

| File | Change |
|------|--------|
| `src/app/robots.txt/route.ts` | Rewritten with proper disallow rules |
| `public/robots.txt` | Deleted (duplicate) |
| `src/app/sitemap.xml/route.ts` | Quality filters, error handling, dedup |
| `src/app/news-sitemap.xml/route.ts` | Content type filtering, trust filtering, XML escaping |
| `src/app/rss.xml/route.ts` | Test article filtering, CDATA escaping, error handling |
| `src/db/queries/articles.ts` | Added getPublicArticleBySlug, test filtering |
| `src/app/(frontend)/article/[slug]/page.tsx` | Public query, noindex low-trust, schema type fix |
| `src/app/(frontend)/page.tsx` | Metadata + homepage sections |
| `src/app/(frontend)/layout.tsx` | Google verification meta tag |
| `src/app/(frontend)/blogs/page.tsx` | Added metadata |
| `src/app/(frontend)/latest/page.tsx` | Added metadata |
| `src/app/(frontend)/trending/page.tsx` | Added metadata |
| `src/app/(frontend)/about/page.tsx` | Added metadata |
| `src/app/(frontend)/contact/page.tsx` | Added metadata |
| `src/app/(frontend)/privacy/page.tsx` | Added metadata |
| `src/app/(frontend)/advertise/page.tsx` | Added metadata |
| `src/app/(frontend)/terms/page.tsx` | Added metadata |
| `src/app/(frontend)/editorial-policy/page.tsx` | Enhanced metadata |
| `src/app/(frontend)/corrections-policy/page.tsx` | Added metadata |
| `src/app/(frontend)/fact-checking-policy/page.tsx` | Added metadata |
| `src/app/(frontend)/methodology/page.tsx` | Added metadata |
| `src/components/article/IntelligenceFooter.tsx` | Trust display fixes, disclaimer, honest sourcing |
| `src/config/monetization.ts` | New: monetization config |
| `src/components/monetization/AffiliateDisclosure.tsx` | New: disclosure component |
| `src/components/ads/AdSlot.tsx` | New: AdSense slot component |
| `src/components/ads/AdPlacement.tsx` | New: Ad placement with trust gating |
| `src/lib/internal-links.ts` | New: internal linking utility |
| `next.config.ts` | Security headers, cache headers, redirects |
| `scripts/seo-audit.mjs` | New: local SEO audit script |
| `docs/GOOGLE-SEARCH-CONSOLE-CHECKLIST.md` | New: GSC setup checklist |
| `docs/content/money-keyword-plan.md` | New: 30 money keyword targets |
| `docs/internal/google-indexing-money-fix-report.md` | This report |

## Remaining Manual Steps

### Google Search Console
1. Add unstory.app property in GSC
2. Verify via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var
3. Submit sitemap.xml
4. Inspect and request indexing for top pages
5. Monitor coverage reports weekly

### AdSense
1. Create AdSense ad units for each slot (top, mid-article, after-article, sidebar, archive)
2. Set slot IDs in env vars (NEXT_PUBLIC_ADSENSE_SLOT_*)
3. Wait for AdSense approval on new pages
4. Monitor policy center

### Content
1. Write 10 money articles from the keyword plan
2. Ensure each has 1500+ words, sources, and editorial review
3. Add affiliate links only to relevant, reviewed content
4. Build newsletter subscriber base
