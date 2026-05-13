interface StaticPageLayoutProps {
  title: string;
  tagline?: string;
  children: React.ReactNode;
}

export function StaticPageLayout({ title, tagline, children }: StaticPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 lg:mb-20 text-center">
          {tagline && (
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold mb-4 block">
              {tagline}
            </span>
          )}
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-un-text tracking-tight mb-8">
            {title}
          </h1>
          <div className="w-12 h-1 bg-brand mx-auto"></div>
        </header>
        
        <div className="prose prose-invert prose-premium max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
