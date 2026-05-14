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
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <Badge variant="premium">404 Intelligence Missing</Badge>
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-un-text tracking-tight">
          This briefing does not exist.
        </h1>
        <p className="text-un-muted text-lg font-serif italic">
          The intelligence you are looking for may have been archived, moved, or never existed in this dimension.
        </p>
      </div>

      <Link
        href="/"
        className="bg-un-text text-un-bg px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand transition-all shadow-xl"
      >
        Explore Active Intelligence
      </Link>
      
      <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
        {['Wealth', 'AI', 'Power', 'Business'].map((cat) => (
          <Link 
            key={cat} 
            href={`/category/${cat.toLowerCase()}`}
            className="text-[10px] uppercase tracking-[0.2em] text-un-muted hover:text-brand transition-colors font-bold"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
