# Google Indexing & Monetization Fix Report

## Executive Summary

This report documents the SEO and monetization improvements made to Unstory.app to fix Google indexing issues and implement safe AdSense monetization.

## Root Cause Analysis

### Why Google Was Only Finding/Ranking the Homepage

1. **Missing page metadata** — Most static pages (about, contact, privacy, latest, trending, blogs, advertise) had no `metadata` export, meaning no title/description for Google
2. **Test articles publicly visible** — The `getArticleBySlug` query returned ANY article by slug, including test/sample content
3. **No quality filtering in sitemap** — Sitemap included all published articles regardless of quality, trust score, or verification status
4. **Duplicate robots.txt** — Both `public/robots.txt` and `src/app/robots.txt/route.ts` existed with slightly different content
5. **No error handling in sitemap routes** — DB errors would cause 500 responses instead of valid XML
6. **Missing canonical URLs on static pages** — No `alternates.canonical` on most pages
7. **Low-trust content publicly indexable** — Articles with trustScore < 70 were served publicly
8. **Unverified YMYL content indexable** — Finance/health/politics articles with `factCheckStatus: "unverified"` were indexable

### Sitemap/Robots Status

**Before:**
- `public/robots.txt` and route handler both existed (conflict)
- Sitemap included all published articles without quality checks
- No try/catch in sitemap/news-sitemap routes
- RSS had no error handling

**After:**
- Single source of truth via route handler
- Sitemap filters: trust score > 69, body > 150 words, excludes test/demo/sample, excludes unverified YMYL
- All feed routes have try/catch with graceful fallbacks
- Proper Cache-Control headers

### AdSense Status

**Before:**
- AdSense script loaded in layout but no ad slot components
- ads.txt correctly configured
- No safe placement system

**After:**
- `AdSlot` component with CLS prevention, safety checks, and proper initialization
- `AdPlacement` component that blocks ads on low-trust/unverified content
- Slot IDs configurable via environment variables
- No ads on admin/studio/search pages

## Files Changed

### Phase 1 — Indexability
| File | Change |
|------|--------|
| `src/app/robots.txt/route.ts` | Updated disallow rules, added news-sitemap reference |
| `public/robots.txt` | Updated to match route handler |
| `src/app/sitemap.xml/route.ts` | Added quality filters, try/catch, XML escaping, proper cache headers |
| `src/app/news-sitemap.xml/route.ts` | Added test filtering, trust checks, try/catch, XML escaping |
| `src/app/rss.xml/route.ts` | Added test filtering, error handling, CDATA escaping |

### Phase 2 — Article Access Control
| File | Change |
|------|--------|
| `src/db/queries/articles.ts` | Added `getPublicArticleBySlug`, test filtering to all public queries |

### Phase 3 — Metadata
| File | Change |
|------|--------|
| `src/app/(frontend)/about/page.tsx` | Added metadata export with canonical |
| `src/app/(frontend)/contact/page.tsx` | Added metadata export with canonical |
| `src/app/(frontend)/privacy/page.tsx` | Added metadata export with canonical |
| `src/app/(frontend)/advertise/page.tsx` | Added metadata export with canonical |
| `src/app/(frontend)/latest/page.tsx` | Added metadata export with canonical |
| `src/app/(frontend)/trending/page.tsx` | Added metadata export with canonical |
| `src/app/(frontend)/blogs/page.tsx` | Added metadata export with canonical |

### Phase 4 — Trust/E-E-A-T
| File | Change |
|------|--------|
| `src/components/article/IntelligenceFooter.tsx` | Improved source display, added YMYL disclaimers |
| `src/db/queries/articles.ts` | Trust score filtering in all public queries |

### Phase 5 — AdSense
| File | Change |
|------|--------|
| `src/components/ads/AdSlot.tsx` | New: Client-safe ad slot component |
| `src/components/ads/AdPlacement.tsx` | New: Smart placement with safety checks |

### Phase 6 — Monetization
| File | Change |
|------|--------|
| `src/config/monetization.ts` | New: Monetization configuration |
| `src/components/monetization/AffiliateDisclosure.tsx` | New: FTC-compliant disclosure component |

### Phase 9 — Internal Linking
| File | Change |
|------|--------|
| `src/lib/internal-links.ts` | New: Internal linking utility |

### Phase 10 — Build Quality
| File | Change |
|------|--------|
| `next.config.ts` | Security headers, cache headers, Google verification support |

### Phase 11 — Scripts & Docs
| File | Change |
|------|--------|
| `scripts/seo-audit.mjs` | New: SEO health check script |
| `scripts/submit-indexnow.mjs` | New: IndexNow submission script |
| `docs/GOOGLE-SEARCH-CONSOLE-CHECKLIST.md` | New: GSC setup checklist |
| `docs/content/money-keyword-plan.md` | New: 50 high-CPC keyword targets |

## Manual Steps Still Required

1. **Google Search Console** — Add property, verify, submit sitemaps
2. **Google Verification** — Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env variable
3. **AdSense Slots** — Create ad units in AdSense dashboard and set env variables:
   - `NEXT_PUBLIC_ADSENSE_SLOT_TOP`
   - `NEXT_PUBLIC_ADSENSE_SLOT_MID_ARTICLE`
   - `NEXT_PUBLIC_ADSENSE_SLOT_AFTER_ARTICLE`
   - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`
   - `NEXT_PUBLIC_ADSENSE_SLOT_ARCHIVE`
4. **IndexNow Key** — Generate and set `INDEXNOW_KEY` env variable
5. **Content Review** — Review all published articles for quality, remove/archive test content
6. **YMYL Review** — Verify all finance/health/politics articles have proper fact-checking
7. **Deploy** — Push changes and verify on production

## Commands Run

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm run lint
pnpm run build
```

## Acceptance Criteria Status

- [x] Build passes
- [x] Sitemap returns valid XML and excludes test/draft/low-quality articles
- [x] Public pages have metadata and canonicals
- [x] "Test Article" is not visible publicly
- [x] Low-trust/unverified YMYL articles are not indexable
- [x] AdSense slot system exists and is safely integrated
- [x] ads.txt remains correct
- [x] Robots references sitemap
- [x] Homepage/category/archive pages distribute internal links
- [x] Report and Search Console checklist are added
