import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleLink {
  title: string;
  slug: string;
}

interface PrevNextNavigationProps {
  prev: ArticleLink | null;
  next: ArticleLink | null;
}

export function PrevNextNavigation({ prev, next }: PrevNextNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-un-border">
      <div className="flex flex-col items-start">
        {prev && (
          <Link 
            href={`/article/${prev.slug}`}
            className="group flex flex-col items-start space-y-2 max-w-full"
          >
            <span className="text-[10px] uppercase tracking-widest text-un-muted flex items-center group-hover:text-brand transition-colors font-bold">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Prior Briefing
            </span>
            <span className="text-sm lg:text-base font-serif font-bold text-un-text group-hover:text-brand transition-colors line-clamp-2">
              {prev.title}
            </span>
          </Link>
        )}
      </div>

      <div className="flex flex-col items-end text-right">
        {next && (
          <Link 
            href={`/article/${next.slug}`}
            className="group flex flex-col items-end space-y-2 max-w-full"
          >
            <span className="text-[10px] uppercase tracking-widest text-un-muted flex items-center group-hover:text-brand transition-colors font-bold">
              Subsequent Briefing
              <ArrowRight className="w-3 h-3 ml-2" />
            </span>
            <span className="text-sm lg:text-base font-serif font-bold text-un-text group-hover:text-brand transition-colors line-clamp-2">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
