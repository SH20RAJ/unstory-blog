import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={cn("flex items-center justify-center space-x-2", className)}>
      <Link
        href={`${baseUrl}?page=${Math.max(1, currentPage - 1)}`}
        className={cn(
          "p-2 rounded-md border border-premium-border text-premium-muted hover:text-white transition-colors",
          currentPage === 1 && "pointer-events-none opacity-50"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={`${baseUrl}?page=${page}`}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-md border text-sm font-bold transition-all",
            currentPage === page
              ? "bg-brand border-brand text-premium-dark"
              : "border-premium-border text-premium-muted hover:border-brand/50 hover:text-white"
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`}
        className={cn(
          "p-2 rounded-md border border-premium-border text-premium-muted hover:text-white transition-colors",
          currentPage === totalPages && "pointer-events-none opacity-50"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}
