import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-un-muted mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <Link href="/" className="flex items-center hover:text-brand transition-colors">
        <Home className="w-3 h-3 mr-1" />
        Intelligence Dashboard
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 text-un-border" />
          <Link 
            href={item.href} 
            className={`hover:text-brand transition-colors ${index === items.length - 1 ? "text-brand" : ""}`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
