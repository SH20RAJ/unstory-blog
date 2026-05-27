import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="prose-premium max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // SEO: Downgrade H1 to H2 to avoid duplicates
          h1: ({ children }) => <h2 className="mb-6 mt-14 border-t border-un-border pt-8 font-serif text-3xl font-black leading-tight text-un-text lg:text-4xl">{children}</h2>,
          h2: ({ children }) => <h2 className="mb-6 mt-14 border-t border-un-border pt-8 font-serif text-3xl font-black leading-tight text-un-text lg:text-4xl">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-4 mt-10 font-serif text-2xl font-bold text-un-accent">{children}</h3>,
          p: ({ children }) => <p className="mb-7 font-serif text-xl leading-9 text-un-text">{children}</p>,
          ul: ({ children }) => <ul className="mb-9 list-none space-y-4">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-3">
              <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
              <span className="font-serif text-lg leading-8 text-un-text">{children}</span>
            </li>
          ),
          // Audit: Fix broken tool/ranked list formatting using premium tables
          table: ({ children }) => (
            <div className="premium-border my-12 overflow-x-auto rounded-[6px]">
              <table className="w-full border-collapse bg-un-paper text-left">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-un-border bg-un-surface">{children}</thead>,
          th: ({ children }) => <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-un-muted">{children}</th>,
          td: ({ children }) => <td className="border-b border-un-border/60 px-5 py-4 font-serif text-base text-un-text">{children}</td>,
          blockquote: ({ children }) => (
            <blockquote className="my-12 border-l-4 border-brand bg-un-paper py-7 pl-7 pr-6 font-serif text-2xl italic text-un-text">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
