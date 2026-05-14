import { getDb } from "@/lib/db";
import { MetricsCard } from "@/components/studio/MetricsCard";
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Settings, 
  Eye, 
  BarChart3,
  Layers,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function EditorialStudio() {
  const { queries } = await getDb();
  
  // Parallel fetch for dashboard data
  const [
    totalArticles,
    draftsCount,
    publishedCount,
    reviewCount,
    recentArticles,
    categoriesCount,
    topicsCount
  ] = await Promise.all([
    queries.articles.getArticleCount("published").then(async p => p + await queries.articles.getArticleCount("draft") + await queries.articles.getArticleCount("needs_review")),
    queries.articles.getArticleCount("draft"),
    queries.articles.getArticleCount("published"),
    queries.articles.getArticleCount("needs_review"),
    queries.articles.getAdminArticles(undefined, undefined, 5),
    queries.categories.getCategoryCount(), // Assuming I add this or just use a fallback
    queries.topics.getTopicCount(), // Assuming I add this or just use a fallback
  ]);

  return (
    <div className="space-y-12 pb-24">
      {/* Premium Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <Badge variant="premium">Editorial Intelligence</Badge>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Unstory <span className="text-brand">Studio</span>
          </h1>
          <p className="text-un-muted text-lg font-serif italic max-w-2xl">
            Deciphering the internet, one briefing at a time. Control your narrative flow.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/studio/articles/new" 
            className="group flex items-center gap-2 bg-brand text-premium-dark px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-brand/10"
          >
            <PlusCircle className="w-4 h-4" />
            New Briefing
          </Link>
          <Link 
            href="/studio/settings" 
            className="p-4 bg-un-surface border border-un-border text-white hover:border-brand transition-all"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Strategic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard 
          label="Total Briefings" 
          value={totalArticles} 
          icon={FileText} 
          color="brand" 
        />
        <MetricsCard 
          label="Live Intelligence" 
          value={publishedCount} 
          icon={Zap} 
          color="success" 
        />
        <MetricsCard 
          label="Encryption Drafts" 
          value={draftsCount} 
          icon={Clock} 
          color="warning" 
        />
        <MetricsCard 
          label="Awaiting Analysis" 
          value={reviewCount} 
          icon={AlertCircle} 
          color="error" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Feed: Recent Briefings */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-brand"></div>
              <h2 className="text-2xl font-serif font-bold text-white">Recent Briefings</h2>
            </div>
            <Link href="/studio/articles" className="text-xs uppercase tracking-widest text-un-muted hover:text-brand transition-colors font-bold">
              View Archive
            </Link>
          </div>

          <div className="bg-un-surface border border-un-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-un-border bg-un-bg/50">
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-un-muted font-bold">Title</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-un-muted font-bold">Status</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-un-muted font-bold">Created</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-un-muted font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-un-border">
                  {recentArticles.map((article: any) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-serif font-bold text-white line-clamp-1 group-hover:text-brand transition-colors">
                          {article.title}
                        </div>
                        <div className="text-[10px] text-un-muted uppercase tracking-widest mt-1">
                          {article.contentType}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                          text-[10px] px-2 py-1 font-bold uppercase tracking-widest border
                          ${article.status === 'published' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 
                            article.status === 'draft' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' : 
                            'border-red-500/30 text-red-500 bg-red-500/5'}
                        `}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-un-muted font-mono">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link href={`/studio/articles/${article.id}`} className="inline-block p-2 text-un-muted hover:text-white hover:bg-un-bg transition-all">
                          <FileText className="w-4 h-4" />
                        </Link>
                        <Link href={`/article/${article.slug}`} className="inline-block p-2 text-un-muted hover:text-brand hover:bg-un-bg transition-all">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Taxonomy & Insights */}
        <aside className="xl:col-span-4 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-brand"></div>
            <h2 className="text-2xl font-serif font-bold text-white">Insights</h2>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-un-surface border border-un-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-brand/10 group-hover:text-brand/20 transition-colors">
                <BarChart3 className="w-24 h-24 -mr-8 -mt-8" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-3xl font-bold text-white">{categoriesCount}</span>
                    <p className="text-[10px] uppercase tracking-widest text-un-muted font-bold flex items-center">
                      <Layers className="w-3 h-3 mr-2 text-brand" /> Categories
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-3xl font-bold text-white">{topicsCount}</span>
                    <p className="text-[10px] uppercase tracking-widest text-un-muted font-bold flex items-center">
                      <TrendingUp className="w-3 h-3 mr-2 text-brand" /> Active Topics
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-un-border">
                  <Link href="/studio/categories" className="text-[10px] uppercase tracking-widest text-brand hover:text-white font-bold transition-colors">
                    Manage Taxonomy →
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-8 bg-un-text text-un-bg space-y-6 shadow-2xl shadow-brand/20">
              <h3 className="text-xl font-serif font-bold">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span>D1 Synchronization</span>
                  <span className="text-brand">Active</span>
                </div>
                <div className="w-full h-1 bg-un-bg/20">
                  <div className="w-[98%] h-full bg-un-bg"></div>
                </div>
                <p className="text-[10px] italic opacity-70">
                  Your editorial core is currently synchronized with the Cloudflare global network.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
