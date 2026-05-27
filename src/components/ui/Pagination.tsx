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
    const url = new URL(baseUrl, "https://unstory.app");
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
    <nav className="mt-12 flex items-center justify-center space-x-2 border-t border-un-border py-10">
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="rounded-[4px] p-2 text-un-muted transition-colors hover:bg-un-surface hover:text-un-text"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="cursor-not-allowed p-2 text-un-muted/30">
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          const showEllipsis = index > 0 && page - visiblePages[index - 1] > 1;
          return (
            <div key={page} className="flex items-center">
              {showEllipsis && <span className="px-2 text-xs text-un-muted">...</span>}
              <Link
                href={getPageUrl(page)}
                className={`
                  flex h-10 w-10 items-center justify-center rounded-[4px] text-xs font-black transition-all
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
          className="rounded-[4px] p-2 text-un-muted transition-colors hover:bg-un-surface hover:text-un-text"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div className="cursor-not-allowed p-2 text-un-muted/30">
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </nav>
  );
}
