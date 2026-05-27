#!/usr/bin/env node

/**
 * Unstory.app — IndexNow Submission Script
 * Submits URLs to IndexNow for faster indexing.
 */

const SITE_URL = process.env.SITE_URL || "https://unstory.app";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";

const PRIORITY_URLS = [
  "/",
  "/blogs",
  "/latest",
  "/trending",
  "/about",
  "/advertise",
  "/category/ai",
  "/category/wealth",
  "/category/business",
  "/category/power",
  "/category/lifestyle",
  "/category/skills",
  "/category/trends",
];

async function submitIndexNow(urls) {
  if (!INDEXNOW_KEY) {
    console.error("Error: INDEXNOW_KEY environment variable is required.");
    console.log("Get a key from https://www.bing.com/indexnow");
    process.exit(1);
  }

  const fullUrls = urls.map((url) => `${SITE_URL}${url}`);

  console.log(`Submitting ${fullUrls.length} URLs to IndexNow...`);

  try {
    const response = await fetch(`https://api.indexnow.org/indexnow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "unstory.app",
        key: INDEXNOW_KEY,
        urlList: fullUrls,
      }),
    });

    if (response.ok) {
      console.log(`✅ Successfully submitted ${fullUrls.length} URLs.`);
    } else {
      console.error(`❌ IndexNow returned status ${response.status}`);
      const text = await response.text();
      console.error(text);
    }
  } catch (error) {
    console.error("❌ Failed to submit to IndexNow:", error.message);
  }
}

const args = process.argv.slice(2);

if (args.includes("--priority")) {
  submitIndexNow(PRIORITY_URLS);
} else if (args.length > 0) {
  submitIndexNow(args);
} else {
  console.log("Usage:");
  console.log("  node scripts/submit-indexnow.mjs --priority    Submit priority pages");
  console.log("  node scripts/submit-indexnow.mjs /path1 /path2  Submit specific paths");
}
