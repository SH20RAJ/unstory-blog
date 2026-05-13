"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@config";

export default function IndexNowPage() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (urlList: string[]) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        setMessage({ type: "success", text: `Successfully submitted ${data.count} URLs to IndexNow.` });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to submit URLs." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while submitting." });
    } finally {
      setLoading(false);
    }
  };

  const submitManual = () => {
    const list = urls.split("\n").map(u => u.trim()).filter(u => u.startsWith("http"));
    if (list.length === 0) {
      setMessage({ type: "error", text: "Please enter at least one valid URL." });
      return;
    }
    handleSubmit(list);
  };

  const submitAll = async () => {
    setLoading(true);
    try {
      // We'll fetch all article slugs from a temporary client-side check or just assume 
      // the user wants us to fetch them via an API.
      // For now, let's just fetch them from a new internal API or use a provided list.
      const res = await fetch("/api/mcp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("ADMIN_PASSWORD") || ""}` 
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "1",
          method: "tools/call",
          params: { name: "list_articles", arguments: { status: "published", limit: 1000 } }
        }),
      });
      const data = (await res.json()) as any;
      const articles = JSON.parse(data.result.content[0].text);
      const articleUrls = articles.map((a: any) => `${SITE_CONFIG.url}/article/${a.slug}`);
      handleSubmit(articleUrls);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to fetch articles. Make sure you are authenticated." });
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl space-y-12">
      <div className="space-y-4 text-center">
        <Badge variant="premium">IndexNow Management</Badge>
        <h1 className="text-5xl font-serif font-bold text-un-text">Instant Indexing</h1>
        <p className="text-un-muted text-lg">
          Submit your content directly to search engines for immediate crawling and indexing.
        </p>
      </div>

      <div className="premium-card p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-un-text">Manual Submission</label>
          <textarea
            className="w-full h-48 p-4 bg-un-surface border border-un-border rounded-none focus:border-brand outline-none transition-colors font-mono text-sm"
            placeholder="https://unstory.app/article/example-1&#10;https://unstory.app/article/example-2"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={submitManual}
            disabled={loading}
            className="bg-black text-white px-6 py-4 font-bold hover:bg-brand transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Manual URLs"}
          </button>
          <button
            onClick={submitAll}
            disabled={loading}
            className="border-2 border-un-text text-un-text px-6 py-4 font-bold hover:bg-un-text hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Submit All Articles"}
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              setMessage(null);
              try {
                const res = await fetch("/api/indexnow");
                const data = await res.json();
                if (data.success) {
                  setMessage({ type: "success", text: `Successfully submitted ${data.count} URLs from sitemap.` });
                } else {
                  setMessage({ type: "error", text: data.error || "Failed to sync sitemap." });
                }
              } catch (err) {
                setMessage({ type: "error", text: "Failed to fetch sitemap." });
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="sm:col-span-2 border-2 border-brand text-brand px-6 py-4 font-bold hover:bg-brand hover:text-white transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
          >
            {loading ? "Syncing..." : "Fetch & Submit from Sitemap.xml"}
          </button>
        </div>

        {message && (
          <div className={`p-4 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} font-medium`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-un-muted uppercase tracking-[0.2em]">
          IndexNow Key: 9c8deca6ff57443ca4cb47b831eba565
        </p>
      </div>
    </div>
  );
}
