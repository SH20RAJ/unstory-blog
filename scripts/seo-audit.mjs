#!/usr/bin/env node

/**
 * Unstory SEO Audit Script
 * Checks key SEO and monetization health signals.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const SITE_URL = "https://unstory.app";

let passed = 0;
let failed = 0;
let warnings = 0;

function check(name, condition, detail = "") {
  if (condition) {
    console.log(`  ✅ ${name}`);
    passed++;
  } else {
    console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

function warn(name, detail = "") {
  console.log(`  ⚠️  ${name}${detail ? ` — ${detail}` : ""}`);
  warnings++;
}

console.log("\n🔍 Unstory SEO Audit\n");

// 1. robots.txt route exists
console.log("📁 robots.txt");
const robotsRoute = resolve(ROOT, "src/app/robots.txt/route.ts");
check("Route handler exists", existsSync(robotsRoute));

if (existsSync(robotsRoute)) {
  const robotsContent = readFileSync(robotsRoute, "utf-8");
  check("References sitemap.xml", robotsContent.includes("sitemap.xml"));
  check("References news-sitemap.xml", robotsContent.includes("news-sitemap.xml"));
  check("Blocks /api/", robotsContent.includes("/api/"));
  check("Blocks /studio/", robotsContent.includes("/studio/"));
}

// 2. public/robots.txt
const publicRobots = resolve(ROOT, "public/robots.txt");
if (existsSync(publicRobots)) {
  const pubContent = readFileSync(publicRobots, "utf-8");
  warn("public/robots.txt exists", "Ensure it matches route.ts (or remove to avoid conflicts)");
}

// 3. sitemap route exists
console.log("\n📁 Sitemap");
const sitemapRoute = resolve(ROOT, "src/app/sitemap.xml/route.ts");
check("Sitemap route handler exists", existsSync(sitemapRoute));

if (existsSync(sitemapRoute)) {
  const sitemapContent = readFileSync(sitemapRoute, "utf-8");
  check("Excludes test articles", sitemapContent.includes("test"));
  check("Has try/catch", sitemapContent.includes("try"));
  check("Has Cache-Control", sitemapContent.includes("Cache-Control"));
  check("Has XML escaping", sitemapContent.includes("escapeXml") || sitemapContent.includes("escape"));
}

// 4. ads.txt
console.log("\n💰 AdSense");
const adsTxt = resolve(ROOT, "public/ads.txt");
check("ads.txt exists", existsSync(adsTxt));

if (existsSync(adsTxt)) {
  const adsContent = readFileSync(adsTxt, "utf-8");
  check("Contains publisher ID", adsContent.includes("pub-1828915420581549"));
  check("Contains google.com", adsContent.includes("google.com"));
  check("Contains DIRECT", adsContent.includes("DIRECT"));
}

// 5. AdSlot component
console.log("\n💰 Ad Components");
const adSlot = resolve(ROOT, "src/components/ads/AdSlot.tsx");
check("AdSlot component exists", existsSync(adSlot));

const adPlacement = resolve(ROOT, "src/components/ads/AdPlacement.tsx");
check("AdPlacement component exists", existsSync(adPlacement));

if (existsSync(adPlacement)) {
  const placementContent = readFileSync(adPlacement, "utf-8");
  check("Blocks low-trust articles", placementContent.includes("trustScore") && placementContent.includes("70"));
  check("Blocks unverified YMYL", placementContent.includes("unverified"));
}

// 6. Monetization config
console.log("\n💰 Monetization");
const monetizationConfig = resolve(ROOT, "src/config/monetization.ts");
check("Monetization config exists", existsSync(monetizationConfig));

const affiliateDisclosure = resolve(ROOT, "src/components/monetization/AffiliateDisclosure.tsx");
check("AffiliateDisclosure component exists", existsSync(affiliateDisclosure));

// 7. Article queries
console.log("\n📄 Article Queries");
const queriesFile = resolve(ROOT, "src/db/queries/articles.ts");
check("Articles queries file exists", existsSync(queriesFile));

if (existsSync(queriesFile)) {
  const queriesContent = readFileSync(queriesFile, "utf-8");
  check("Has getPublicArticleBySlug", queriesContent.includes("getPublicArticleBySlug"));
  check("Excludes test slugs in published queries", queriesContent.includes("notLike") && queriesContent.includes("test"));
}

// 8. Layout metadata
console.log("\n📄 Metadata");
const layoutFile = resolve(ROOT, "src/app/(frontend)/layout.tsx");
check("Frontend layout exists", existsSync(layoutFile));

// 9. Static page metadata
const staticPages = [
  "about", "contact", "privacy", "advertise", "latest", "trending", "blogs",
];

for (const page of staticPages) {
  const pagePath = resolve(ROOT, `src/app/(frontend)/${page}/page.tsx`);
  if (existsSync(pagePath)) {
    const content = readFileSync(pagePath, "utf-8");
    check(`${page} has metadata`, content.includes("metadata") || content.includes("generateMetadata"));
  }
}

// 10. News sitemap
console.log("\n📁 News Sitemap");
const newsSitemap = resolve(ROOT, "src/app/news-sitemap.xml/route.ts");
check("News sitemap route exists", existsSync(newsSitemap));

if (existsSync(newsSitemap)) {
  const newsContent = readFileSync(newsSitemap, "utf-8");
  check("Has try/catch", newsContent.includes("try"));
  check("Filters test articles", newsContent.includes("test"));
}

// 11. RSS
console.log("\n📁 RSS");
const rssRoute = resolve(ROOT, "src/app/rss.xml/route.ts");
check("RSS route exists", existsSync(rssRoute));

if (existsSync(rssRoute)) {
  const rssContent = readFileSync(rssRoute, "utf-8");
  check("Has try/catch", rssContent.includes("try"));
  check("Filters test articles", rssContent.includes("test"));
}

// 12. Internal links utility
console.log("\n🔗 Internal Linking");
const internalLinks = resolve(ROOT, "src/lib/internal-links.ts");
check("Internal links utility exists", existsSync(internalLinks));

// Summary
console.log(`\n${"═".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${warnings} warnings`);
console.log(`${"═".repeat(50)}\n`);

if (failed > 0) {
  process.exit(1);
}
