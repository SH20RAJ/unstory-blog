# Google Search Console — Setup & Submission Checklist

## Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" and enter: `https://unstory.app`
4. Verify ownership using one of:
   - **Meta tag** (recommended): Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<your-code>` in your environment
   - HTML file upload to public/
   - DNS TXT record

## Step 2: Submit Sitemaps

1. Go to Sitemaps in the left menu
2. Submit these sitemaps:
   - `https://unstory.app/sitemap.xml`
   - `https://unstory.app/news-sitemap.xml`
3. Check for errors after 24-48 hours

## Step 3: Inspect Key URLs

Use the URL Inspection tool to check and request indexing for:

### Priority URLs (request indexing):
- [ ] `https://unstory.app/` (homepage)
- [ ] `https://unstory.app/blogs` (archive)
- [ ] `https://unstory.app/about` (about page)
- [ ] `https://unstory.app/category/ai`
- [ ] `https://unstory.app/category/wealth`
- [ ] `https://unstory.app/category/business`

### Check these article URLs (pick 5 best):
- [ ] Your highest-quality article
- [ ] Your most recent news article
- [ ] An AI category article
- [ ] A wealth/finance article
- [ ] A business article

## Step 4: Monitor Pages Report

Go to "Pages" (under Indexing) and check for:

- [ ] **Crawled — currently not indexed**: These pages were crawled but Google chose not to index them. Fix content quality or consolidate.
- [ ] **Discovered — currently not indexed**: Google found these but hasn't crawled them yet. Improve internal linking.
- [ ] **Duplicate without user-selected canonical**: Two pages have the same content. Fix canonical tags.
- [ ] **Soft 404**: Pages that return 200 but look like 404. Check for empty/thin pages.
- [ ] **Page with redirect**: Not usually a problem, but verify redirects are correct.
- [ ] **Not found (404)**: Fix broken links pointing to these.
- [ ] **Blocked by robots.txt**: Make sure you're not blocking important pages.

## Step 5: Check for Manual Actions

Go to "Security & Manual Actions" > "Manual Actions":
- [ ] No manual actions present
- If any, fix the issue and submit a reconsideration request

## Step 6: Verify Ads.txt

Go to "Monetization" (if available) or check:
- [ ] `https://unstory.app/ads.txt` is accessible
- [ ] Contains: `google.com, pub-1828915420581549, DIRECT, f08c47fec0942fa0`

## Step 7: Monitor Performance

After 1-2 weeks, check:
- [ ] Impressions are growing
- [ ] Click-through rate is reasonable (>1% for informational, >3% for commercial)
- [ ] Average position is improving
- [ ] No sudden drops (algorithm update or penalty)

## Step 8: Ongoing Actions

- [ ] Submit new articles to IndexNow after publishing
- [ ] Resubmit sitemap after major content changes
- [ ] Check for new crawl errors weekly
- [ ] Monitor Core Web Vitals
- [ ] Review search queries for content ideas

## Environment Variables

Add to your `.env` or Cloudflare environment:

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<your-verification-code>
NEXT_PUBLIC_SITE_URL=https://unstory.app
```

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Crawled — not indexed" | Improve content quality, add internal links, ensure unique content |
| "Discovered — not indexed" | Improve site authority, add more internal links, submit to IndexNow |
| "Duplicate canonical" | Add proper canonical tags, consolidate similar pages |
| "Soft 404" | Ensure pages have real content, not empty states |
| Low impressions | Create more content, improve keyword targeting, build backlinks |
| Low CTR | Improve title tags and meta descriptions |
