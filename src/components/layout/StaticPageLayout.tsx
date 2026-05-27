interface StaticPageLayoutProps {
  title: string;
  tagline?: string;
  children: React.ReactNode;
}

export function StaticPageLayout({ title, tagline, children }: StaticPageLayoutProps) {
  return (
    <div className="editorial-container py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <header className="magazine-rule mb-12 py-8 text-center lg:mb-16">
          {tagline && (
            <span className="section-kicker mb-5 block">
              {tagline}
            </span>
          )}
          <h1 className="font-serif text-5xl font-black leading-none text-un-text lg:text-7xl">
            {title}
          </h1>
        </header>
        
        <div className="prose-premium max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
