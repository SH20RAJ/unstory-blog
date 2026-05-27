import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "premium" | "outline" | "success" | "warning" | "error";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-un-surface text-un-text border border-un-border",
    premium: "bg-brand text-white border border-brand",
    outline: "border border-un-border text-un-muted bg-un-paper",
    success: "bg-green-500/10 text-green-700 border border-green-500/20 dark:text-green-400",
    warning: "bg-yellow-500/10 text-yellow-700 border border-yellow-500/20 dark:text-yellow-400",
    error: "bg-red-500/10 text-red-700 border border-red-500/20 dark:text-red-400",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-[3px] text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
