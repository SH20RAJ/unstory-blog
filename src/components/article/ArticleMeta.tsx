import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ArticleMetaProps {
  date: Date | null;
  readTime?: string;
  className?: string;
}

export function ArticleMeta({ date, readTime, className }: ArticleMetaProps) {
  if (!date) return null;

  return (
    <div className={cn("flex items-center space-x-4 text-xs tracking-widest uppercase font-semibold text-premium-muted", className)}>
      <div className="flex items-center space-x-1.5">
        <Calendar className="w-3 h-3" />
        <span>{format(date, "MMM dd, yyyy")}</span>
      </div>
      {readTime && (
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3 h-3" />
          <span>{readTime}</span>
        </div>
      )}
    </div>
  );
}
