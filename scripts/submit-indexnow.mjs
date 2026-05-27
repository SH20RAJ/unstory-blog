#!/usr/bin/env node

/**
 * IndexNow Submission Script
 * Submits high-priority URLs to IndexNow for faster indexing.
 */

const SITE_URL = process.env.SITE_URL || "https://unstory.app";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.log("⚠️  INDEXNOW_KEY not set. Skipping IndexNow submission.");
  console.log("Set INDEXNOW_KEY env var to enable.");
  process.exit(0);
}

async function submitUrls(urls) {
  const endpoint = "https://api.indexnow.org/IndexNow";
  const body = {
    host: "unstory.app",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log(`✅ Submitted ${urls.length} URLs to IndexNow`);
    } else {
      console.log(`❌ IndexNow returned ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ IndexNow submission failed: ${error.message}`);
  }
}

// Only submit homepage and key pages (don't spam)
const priorityUrls = [
  SITE_URL,
  `${SITE_URL}/blogs`,
  `${SITE_URL}/latest`,
  `${SITE_URL}/trending`,
  `${SITE_URL}/about`,
];

submitUrls(priorityUrls);
