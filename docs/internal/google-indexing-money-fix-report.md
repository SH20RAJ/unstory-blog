# Google Indexing & Monetization Fix Report

**Date:** 2026-05-27
**Site:** https://unstory.app
**Status:** Phase 1 fixes applied

---

## Root Cause Analysis — Why Google Barely Indexes Unstory

### 1. Conflicting robots.txt
- **Problem:** Two robots.txt files existed (`public/robots.txt` static + `src/app/robots.txt/route.ts` dynamic). The static one took precedence and was less complete.
- **Fix:** Deleted static file, updated dynamic route with full disallow rules and sitemap references.

### 2. Sitemap Including Low-Quality Pages
- **Problem:** Sitemap included all published articles without quality filtering — test articles, thin content, low-trust articles.
- **Fix:** Added filters for body length (≥900 chars), trust score (≥70), and test/demo/sample slug exclusion.

### 3. Test Articles Publicly Visible
- **Problem:** `getArticleBySlug` returned ANY article by slug, including drafts and test articles. Public pages could render test content.
- **Fix:** Created `getPublicArticleBySlug` with strict filters: status=published, excludes test/demo/sample slugs and titles.

### 4. Missing Metadata on Static Pages
- **Problem:** 12+ static pages (about, contact, privacy, terms, etc.) had no metadata exports — no title, description, canonical, or OG tags.
- **Fix:** Added proper Metadata exports with title, description, canonical URL, OpenGraph, and Twitter cards.

### 5. False E-E-A-T Claims
- **Problem:** Articles claimed "Verified Intelligence" even when factCheckStatus was null. Empty source sections claimed "verified primary sources including SEC filings" — a false claim.
- **Fix:** Show actual factCheckStatus. Replace false source claims with "Sources being reviewed." Added YMYL disclaimers.

### 6. NewsArticle Schema on Non-News Content
- **Problem:** All articles used `"@type": "NewsArticle"` JSON-LD, even evergreen guides and analysis.
- **Fix:** Conditional schema: `NewsArticle` for news content_type, `Article` for everything else.

### 7. Low-Trust Articles Were Indexable
- **Problem:** Articles with trustScore < 70 were fully indexable.
- **Fix:** Added noindex robots directive for articles with trustScore < 70.

### 8. News Sitemap Included Non-News Content
- **Problem:** News sitemap included guides, opinion, and unverified articles.
- **Fix:** Filtered to only include recent (48h) news/analysis content with verified fact-check status.

### 9. RSS Included Test Content
- **Problem:** RSS feed had no quality filtering.
- **Fix:** Added test/demo/sample slug exclusion to RSS.

---

## Files Changed

| File | Change |
|------|--------|
| `public/robots.txt` | **Deleted** (was conflicting with dynamic route) |
| `src/app/robots.txt/route.ts` | Updated disallow rules, added news-sitemap reference |
| `src/app/sitemap.xml/route.ts` | Added try/catch, quality filters, cache headers |
| `src/app/news-sitemap.xml/route.ts` | Added try/catch, content type filtering, empty fallback |
| `src/app/rss.xml/route.ts` | Added try/catch, test content filtering |
| `src/db/queries/articles.ts` | Added `getPublicArticleBySlug`, test filters on all queries |
| `src/app/(frontend)/article/[slug]/page.tsx` | Use public query, conditional schema, noindex low-trust |
| `src/app/(frontend)/page.tsx` | Added metadata, more category sections |
| `src/app/(frontend)/layout.tsx` | Added Google verification meta tag |
| `src/components/article/IntelligenceFooter.tsx` | Fixed trust display, added YMYL disclaimer |
| `src/app/(frontend)/blogs/page.tsx` | Added metadata |
| `src/app/(frontend)/latest/page.tsx` | Added metadata |
| `src/app/(frontend)/trending/page.tsx` | Added metadata |
| `src/app/(frontend)/about/page.tsx` | Added metadata |
| `src/app/(frontend)/contact/page.tsx` | Added metadata |
| `src/app/(frontend)/privacy/page.tsx` | Added metadata |
| `src/app/(frontend)/terms/page.tsx` | Added metadata |
| `src/app/(frontend)/advertise/page.tsx` | Added metadata |
| `src/app/(frontend)/corrections-policy/page.tsx` | Added metadata |
| `src/app/(frontend)/fact-checking-policy/page.tsx` | Added metadata |
| `src/app/(frontend)/methodology/page.tsx` | Added metadata |
| `src/app/(frontend)/indexnow/page.tsx` | Added noindex metadata |
| `src/components/ads/AdSlot.tsx` | **New** — AdSense slot component |
| `src/components/ads/AdPlacement.tsx` | **New** — Safe ad placement with trust checks |
| `src/components/ads/index.ts` | **New** — Barrel export |
| `src/config/monetization.ts` | **New** — Monetization config |
| `src/components/monetization/AffiliateDisclosure.tsx` | **New** — Disclosure component |
| `src/components/monetization/index.ts` | **New** — Barrel export |
| `next.config.ts` | Added security headers and cache headers |
| `scripts/seo-audit.mjs` | **New** — Local SEO audit script |
| `scripts/submit-indexnow.mjs` | **New** — IndexNow submission script |
| `docs/content/money-keyword-plan.md` | **New** — 50 high-CPC keyword targets |
| `docs/GOOGLE-SEARCH-CONSOLE-CHECKLIST.md` | **New** — Step-by-step GSC setup guide |
| `docs/internal/google-indexing-money-fix-report.md` | **This file** |

---

## AdSense Implementation

- **Publisher ID:** `ca-pub-1828915420581549`
- **ads.txt:** Verified correct at `public/ads.txt`
- **AdSlot component:** Client-side, useEffect-based, no SSR crash
- **AdPlacement component:** Trust-aware — won't show on:
  - Articles with trustScore < 70
  - Unverified YMYL articles
  - Admin/studio/search pages
- **Slot configuration:** Via environment variables (no hardcoded slot IDs)

---

## Remaining Manual Steps

### Immediate (do today):
1. [ ] Add `unstory.app` property in Google Search Console
2. [ ] Verify ownership via meta tag (set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
3. [ ] Submit `https://unstory.app/sitemap.xml` in GSC
4. [ ] Submit `https://unstory.app/news-sitemap.xml` in GSC
5. [ ] Inspect and request indexing for homepage
6. [ ] Inspect and request indexing for 5 best article URLs
7. [ ] Request indexing for /about, /advertise, /blogs

### This Week:
8. [ ] Check GSC Pages report for indexing issues
9. [ ] Fix any "Crawled — not indexed" pages
10. [ ] Fix any "Duplicate without canonical" issues
11. [ ] Create AdSense ad units and set environment variables:
    - `NEXT_PUBLIC_ADSENSE_SLOT_TOP`
    - `NEXT_PUBLIC_ADSENSE_SLOT_MID_ARTICLE`
    - `NEXT_PUBLIC_ADSENSE_SLOT_AFTER_ARTICLE`
    - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`
    - `NEXT_PUBLIC_ADSENSE_SLOT_ARCHIVE`
12. [ ] Integrate AdPlacement components into article/category pages

### This Month:
13. [ ] Create first 3 money articles from the keyword plan
14. [ ] Set up IndexNow key and submit priority pages
15. [ ] Monitor search impressions and clicks weekly
16. [ ] Build internal linking between related articles
17. [ ] Consider building backlinks through guest posting or partnerships

---

## What NOT to Do

- Do not buy traffic or use bots
- Do not create doorway pages
- Do not keyword-stuff
- Do not publish fake/unverified financial advice
- Do not use hidden text or links
- Do not scrape content from other sites
- Do not participate in link schemes
- Do not use cloaking or sneaky redirects
