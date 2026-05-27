import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Briefing Not Found",
  description: "The intelligence briefing you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="editorial-container flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <Badge variant="premium">404 Intelligence Missing</Badge>
        <h1 className="font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
          This briefing does not exist.
        </h1>
        <p className="mx-auto max-w-2xl font-serif text-xl leading-8 text-un-accent">
          The intelligence you are looking for may have been archived, moved, or never existed in this dimension.
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 rounded-[4px] bg-un-text px-8 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-un-bg transition-colors hover:bg-brand"
      >
        Explore Active Intelligence
      </Link>
      
      <div className="grid w-full max-w-lg grid-cols-2 gap-8 pt-12 sm:grid-cols-4">
        {['Wealth', 'AI', 'Power', 'Business'].map((cat) => (
          <Link 
            key={cat} 
            href={`/category/${cat.toLowerCase()}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-un-muted transition-colors hover:text-brand"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
