#!/usr/bin/env node

/**
 * Unstory.app — SEO Audit Script
 * Checks basic SEO health indicators locally.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const SITE_URL = "https://unstory.app";

let passed = 0;
let failed = 0;
let warnings = 0;

function check(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.log(`  ❌ ${label}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

function warn(label, detail = "") {
  console.log(`  ⚠️  ${label}${detail ? ` — ${detail}` : ""}`);
  warnings++;
}

console.log("\n🔍 Unstory.app SEO Audit\n");

// 1. robots.txt route
console.log("📄 robots.txt");
const robotsRoute = join(ROOT, "src/app/robots.txt/route.ts");
check("Dynamic robots.txt route exists", existsSync(robotsRoute));

const staticRobots = join(ROOT, "public/robots.txt");
check("No conflicting static robots.txt", !existsSync(staticRobots), "Delete public/robots.txt");

if (existsSync(robotsRoute)) {
  const robotsContent = readFileSync(robotsRoute, "utf-8");
  check("References sitemap.xml", robotsContent.includes("sitemap.xml"));
  check("References news-sitemap.xml", robotsContent.includes("news-sitemap.xml"));
  check("Disallows /api/", robotsContent.includes("/api/"));
  check("Disallows /studio/", robotsContent.includes("/studio/"));
}

// 2. sitemap route
console.log("\n🗺️  Sitemap");
const sitemapRoute = join(ROOT, "src/app/sitemap.xml/route.ts");
check("Sitemap route exists", existsSync(sitemapRoute));

if (existsSync(sitemapRoute)) {
  const sitemapContent = readFileSync(sitemapRoute, "utf-8");
  check("Has try/catch for error handling", sitemapContent.includes("try"));
  check("Excludes test articles", sitemapContent.includes("test"));
  check("Includes static pages", sitemapContent.includes("/about"));
  check("Includes categories", sitemapContent.includes("categories"));
  check("Has cache headers", sitemapContent.includes("Cache-Control"));
}

// 3. ads.txt
console.log("\n💰 Ads.txt");
const adsTxt = join(ROOT, "public/ads.txt");
check("ads.txt exists", existsSync(adsTxt));

if (existsSync(adsTxt)) {
  const adsContent = readFileSync(adsTxt, "utf-8");
  check("Contains publisher ID", adsContent.includes("pub-1828915420581549"));
  check("Correct format", adsContent.includes("google.com"));
}

// 4. AdSense components
console.log("\n📢 AdSense");
check("AdSlot component exists", existsSync(join(ROOT, "src/components/ads/AdSlot.tsx")));
check("AdPlacement component exists", existsSync(join(ROOT, "src/components/ads/AdPlacement.tsx")));

// 5. Monetization
console.log("\n💸 Monetization");
check("Monetization config exists", existsSync(join(ROOT, "src/config/monetization.ts")));
check("AffiliateDisclosure exists", existsSync(join(ROOT, "src/components/monetization/AffiliateDisclosure.tsx")));

// 6. Content plan
console.log("\n📝 Content Plan");
check("Money keyword plan exists", existsSync(join(ROOT, "docs/content/money-keyword-plan.md")));

// 7. Documentation
console.log("\n📚 Documentation");
check("Google Search Console checklist exists", existsSync(join(ROOT, "docs/GOOGLE-SEARCH-CONSOLE-CHECKLIST.md")));

// Summary
console.log(`\n${"─".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${warnings} warnings`);
console.log(`${"─".repeat(50)}\n`);

if (failed > 0) {
  process.exit(1);
}
