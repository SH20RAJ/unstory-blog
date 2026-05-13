import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { SITE_CONFIG } from "@config";

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Invalid URL list" }, { status: 400 });
    }

    const payload = {
      host: new URL(SITE_CONFIG.url).hostname,
      key: "9c8deca6ff57443ca4cb47b831eba565",
      keyLocation: `${SITE_CONFIG.url}/9c8deca6ff57443ca4cb47b831eba565.txt`,
      urlList: urls,
    };

    // Submit to Bing (which shares with other engines)
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
