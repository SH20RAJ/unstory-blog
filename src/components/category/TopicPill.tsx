import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TopicPillProps {
  name: string;
  slug: string;
  className?: string;
  active?: boolean;
}

export function TopicPill({ name, slug, className, active }: TopicPillProps) {
  return (
    <Link
      href={`/topic/${slug}`}
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border",
        active 
          ? "bg-brand border-brand text-premium-dark" 
          : "bg-un-surface border-un-border text-un-muted hover:border-brand/50 hover:text-un-text",
        className
      )}
    >
      {name}
    </Link>
  );
}
