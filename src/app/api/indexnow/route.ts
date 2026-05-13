import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { SITE_CONFIG } from "@config";

async function fetchSitemapUrls(): Promise<string[]> {
  const sitemapUrl = `${SITE_CONFIG.url}/sitemap.xml`;
  const res = await fetch(sitemapUrl, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const text = await res.text();
  const locMatches = text.match(/<loc>(.*?)<\/loc>/g);
  return locMatches?.map((m) => m.replace(/<loc>|<\/loc>/g, "")) ?? [];
}

export async function GET() {
  try {
    const urls = await fetchSitemapUrls();
    const payload = {
      host: new URL(SITE_CONFIG.url).hostname,
      key: "9c8deca6ff57443ca4cb47b831eba565",
      keyLocation: `${SITE_CONFIG.url}/9c8deca6ff57443ca4cb47b831eba565.txt`,
      urlList: urls,
    };

    const response = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `IndexNow API error: ${text}` }, { status: response.status });
    }

    return NextResponse.json({ success: true, count: urls.length, urls });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { urls } = (await req.json()) as any;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Invalid URL list" }, { status: 400 });
    }

    const payload = {
      host: new URL(SITE_CONFIG.url).hostname,
      key: "9c8deca6ff57443ca4cb47b831eba565",
      keyLocation: `${SITE_CONFIG.url}/9c8deca6ff57443ca4cb47b831eba565.txt`,
      urlList: urls,
    };

    const response = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `IndexNow API error: ${text}` }, { status: response.status });
    }

    return NextResponse.json({ success: true, count: urls.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
