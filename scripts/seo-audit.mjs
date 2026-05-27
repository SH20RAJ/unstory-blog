#!/usr/bin/env node

/**
 * Basic SEO audit script for Unstory.app
 * Checks key SEO signals locally before deploying.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
let passed = 0;
let failed = 0;
let warnings = 0;

function check(name, ok, detail) {
  if (ok) {
    console.log(`  ✅ ${name}`);
    passed++;
  } else {
    console.log(`  ❌ ${name}${detail ? ': ' + detail : ''}`);
    failed++;
  }
}

function warn(name, detail) {
  console.log(`  ⚠️  ${name}${detail ? ': ' + detail : ''}`);
  warnings++;
}

console.log('\n🔍 Unstory SEO Audit\n');

// 1. Check robots.txt route exists
console.log('--- robots.txt ---');
const robotsRoute = join(ROOT, 'src/app/robots.txt/route.ts');
check('robots.txt route exists', existsSync(robotsRoute));

const publicRobots = join(ROOT, 'public/robots.txt');
if (existsSync(publicRobots)) {
  warn('public/robots.txt still exists', 'May conflict with route.ts');
}

// 2. Check sitemap
console.log('\n--- sitemap.xml ---');
const sitemapRoute = join(ROOT, 'src/app/sitemap.xml/route.ts');
check('sitemap.xml route exists', existsSync(sitemapRoute));

// 3. Check ads.txt
console.log('\n--- ads.txt ---');
const adsTxt = join(ROOT, 'public/ads.txt');
if (existsSync(adsTxt)) {
  const content = readFileSync(adsTxt, 'utf-8');
  check('ads.txt contains publisher ID', content.includes('pub-1828915420581549'));
} else {
  check('ads.txt exists', false);
}

// 4. Check key components
console.log('\n--- Components ---');
check('AdSlot component exists', existsSync(join(ROOT, 'src/components/ads/AdSlot.tsx')));
check('AdPlacement component exists', existsSync(join(ROOT, 'src/components/ads/AdPlacement.tsx')));
check('AffiliateDisclosure component exists', existsSync(join(ROOT, 'src/components/monetization/AffiliateDisclosure.tsx')));

// 5. Check config files
console.log('\n--- Config ---');
check('monetization config exists', existsSync(join(ROOT, 'src/config/monetization.ts')));

// 6. Check page metadata
console.log('\n--- Page Metadata ---');
const pages = [
  'src/app/(frontend)/page.tsx',
  'src/app/(frontend)/blogs/page.tsx',
  'src/app/(frontend)/latest/page.tsx',
  'src/app/(frontend)/trending/page.tsx',
  'src/app/(frontend)/about/page.tsx',
  'src/app/(frontend)/contact/page.tsx',
  'src/app/(frontend)/privacy/page.tsx',
  'src/app/(frontend)/advertise/page.tsx',
];

for (const page of pages) {
  const fullPath = join(ROOT, page);
  if (existsSync(fullPath)) {
    const content = readFileSync(fullPath, 'utf-8');
    const hasMetadata = content.includes('metadata') || content.includes('generateMetadata');
    check(`${page} has metadata`, hasMetadata);
  }
}

// 7. Check docs
console.log('\n--- Documentation ---');
check('Search Console checklist exists', existsSync(join(ROOT, 'docs/GOOGLE-SEARCH-CONSOLE-CHECKLIST.md')));
check('Indexing report exists', existsSync(join(ROOT, 'docs/internal/google-indexing-money-fix-report.md')));

console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${warnings} warnings\n`);
process.exit(failed > 0 ? 1 : 0);
