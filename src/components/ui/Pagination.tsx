import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const url = new URL(baseUrl, "https://example.com");
    url.searchParams.set("page", page.toString());
    return `${url.pathname}${url.search}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(p => 
    p === 1 || 
    p === totalPages || 
    (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <nav className="flex items-center justify-center space-x-2 py-12 border-t border-un-border mt-12">
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="p-2 text-un-muted hover:text-un-text transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2 text-un-muted/30 cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          const showEllipsis = index > 0 && page - visiblePages[index - 1] > 1;
          return (
            <div key={page} className="flex items-center">
              {showEllipsis && <span className="px-2 text-un-muted text-xs">...</span>}
              <Link
                href={getPageUrl(page)}
                className={`
                  w-10 h-10 flex items-center justify-center text-xs font-bold transition-all
                  ${currentPage === page 
                    ? "bg-un-text text-un-bg" 
                    : "text-un-muted hover:text-un-text hover:bg-un-surface"}
                `}
              >
                {page.toString().padStart(2, '0')}
              </Link>
            </div>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="p-2 text-un-muted hover:text-un-text transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2 text-un-muted/30 cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </nav>
  );
}
