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
  const fallbackTopics = [
    { name: "AI Infrastructure", slug: "ai", trendingScore: 94 },
    { name: "Markets & Wealth", slug: "wealth", trendingScore: 88 },
    { name: "Power Shifts", slug: "power", trendingScore: 82 },
    { name: "Operator Playbooks", slug: "business", trendingScore: 76 },
  ];
  const items = topics.length > 0 ? topics : fallbackTopics;

  return (
    <div className="rounded-[6px] border border-un-border bg-un-paper p-6">
      <div className="mb-7 flex items-center gap-3 border-b border-un-border pb-4">
        <TrendingUp className="h-4 w-4 text-brand" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.24em] text-un-text">
          Most Watched
        </h3>
      </div>
      <div className="space-y-6">
        {items.map((topic, index) => (
          <div key={topic.slug} className="group flex items-start gap-4">
            <span className="font-serif text-3xl font-black leading-none text-un-border transition-colors group-hover:text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <Link href={topics.length > 0 ? `/topic/${topic.slug}` : `/category/${topic.slug}`}>
                <h4 className="font-serif text-xl font-bold leading-tight text-un-text transition-colors hover:text-brand">
                  {topic.name}
                </h4>
              </Link>
              {topic.trendingScore !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="h-1 w-14 overflow-hidden rounded-full bg-un-surface">
                    <div 
                      className="h-full bg-brand"
                      style={{ width: `${Math.min(topic.trendingScore, 100)}%` }} 
                    />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-un-muted">High</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link 
        href="/trending" 
        className="mt-8 block border-t border-un-border pt-5 text-center text-[10px] font-black uppercase tracking-[0.24em] text-un-muted transition-colors hover:text-brand"
      >
        View All Trends
      </Link>
    </div>
  );
}
