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
          h1: ({ children }) => <h2 className="text-3xl lg:text-4xl font-serif font-bold text-un-text mt-12 mb-6">{children}</h2>,
          h2: ({ children }) => <h2 className="text-3xl lg:text-4xl font-serif font-bold text-un-text mt-12 mb-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl lg:text-2xl font-serif font-bold text-brand mt-10 mb-4">{children}</h3>,
          p: ({ children }) => <p className="text-lg text-un-muted leading-relaxed mb-6 font-serif">{children}</p>,
          ul: ({ children }) => <ul className="list-none space-y-4 mb-8">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 flex-shrink-0" />
              <span className="text-lg text-un-muted font-serif">{children}</span>
            </li>
          ),
          // Audit: Fix broken tool/ranked list formatting using premium tables
          table: ({ children }) => (
            <div className="my-12 overflow-x-auto premium-border rounded-xl">
              <table className="w-full text-left border-collapse bg-un-surface">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-un-bg/50 border-b border-un-border">{children}</thead>,
          th: ({ children }) => <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-un-muted font-bold">{children}</th>,
          td: ({ children }) => <td className="px-6 py-4 text-base text-un-text border-b border-un-border/50 font-serif italic">{children}</td>,
          blockquote: ({ children }) => (
            <blockquote className="my-12 pl-8 border-l-4 border-brand italic text-2xl font-serif text-un-text bg-brand/5 py-8 pr-8">
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
