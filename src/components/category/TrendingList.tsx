import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface TrendingListProps {
  topics: {
    name: string;
    slug: string;
    trendingScore?: number;
  }[];
}

export function TrendingList({ topics }: TrendingListProps) {
  return (
    <div className="bg-premium-gray rounded-xl p-8 border border-premium-border">
      <div className="flex items-center space-x-3 mb-8">
        <TrendingUp className="w-5 h-5 text-brand" />
        <h3 className="text-sm font-serif font-bold uppercase tracking-[0.2em] text-white">
          Trending Intelligence
        </h3>
      </div>
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={topic.slug} className="flex items-start space-x-4 group">
            <span className="text-2xl font-serif font-bold text-premium-border group-hover:text-brand/30 transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col space-y-1">
              <Link href={`/topic/${topic.slug}`}>
                <h4 className="text-lg font-serif font-medium text-white hover:text-brand transition-colors leading-tight">
                  {topic.name}
                </h4>
              </Link>
              {topic.trendingScore !== undefined && (
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-12 bg-premium-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand" 
                      style={{ width: `${Math.min(topic.trendingScore, 100)}%` }} 
                    />
                  </div>
                  <span className="text-[10px] text-premium-muted uppercase font-bold">Trending High</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link 
        href="/trending" 
        className="block mt-10 pt-6 border-t border-premium-border text-center text-xs font-bold uppercase tracking-widest text-premium-muted hover:text-brand transition-colors"
      >
        View All Trends
      </Link>
    </div>
  );
}
