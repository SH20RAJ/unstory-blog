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
        "inline-flex items-center rounded-[4px] border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
        active 
          ? "border-brand bg-brand text-white"
          : "border-un-border bg-un-paper text-un-muted hover:border-brand hover:text-un-text",
        className
      )}
    >
      {name}
    </Link>
  );
}
