import { getDb } from "@/lib/db";
import { MetricsCard } from "@/components/studio/MetricsCard";
import { FileText, TrendingUp, Clock, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { db, schema } = await getDb();
  
  // Fetch metrics (simulated with counts for now)
  // In a real app, you'd use sql.count() or similar
  const articlesCount = await db.select().from(schema.articles);
  const categoriesCount = await db.select().from(schema.categories);
  const topicsCount = await db.select().from(schema.topics);
  
  const drafts = articlesCount.filter((a: any) => a.status === "draft").length;
  const published = articlesCount.filter((a: any) => a.status === "published").length;
  const needsReview = articlesCount.filter((a: any) => a.status === "needs_review").length;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Editorial Dashboard</h1>
        <p className="text-un-muted mt-2">Welcome to the Unstory newsroom management system.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard 
          label="Total Articles" 
          value={articlesCount.length} 
          icon={FileText} 
          color="brand" 
        />
        <MetricsCard 
          label="Published" 
          value={published} 
          icon={TrendingUp} 
          color="success" 
        />
        <MetricsCard 
          label="Drafts" 
          value={drafts} 
          icon={Clock} 
          color="warning" 
        />
        <MetricsCard 
          label="Needs Review" 
          value={needsReview} 
          icon={AlertCircle} 
          color="error" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity / Quick Actions Placeholder */}
        <div className="p-8 rounded-xl bg-un-surface border border-un-border">
          <h3 className="text-lg font-serif font-bold text-white mb-6">Taxonomy Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-un-bg border border-un-border">
              <span className="text-2xl font-bold text-white">{categoriesCount.length}</span>
              <p className="text-xs text-un-muted uppercase tracking-widest mt-1">Categories</p>
            </div>
            <div className="p-4 rounded-lg bg-un-bg border border-un-border">
              <span className="text-2xl font-bold text-white">{topicsCount.length}</span>
              <p className="text-xs text-un-muted uppercase tracking-widest mt-1">Topics</p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-xl bg-un-surface border border-un-border flex flex-col justify-center items-center text-center space-y-4">
          <h3 className="text-lg font-serif font-bold text-white">Quick Actions</h3>
          <div className="flex gap-4">
            <a href="/studio/articles/new" className="px-6 py-3 bg-brand text-premium-dark rounded-lg text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all">
              New Article
            </a>
            <a href="/studio/media" className="px-6 py-3 bg-un-bg text-white border border-un-border rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-premium-border transition-all">
              Upload Media
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
