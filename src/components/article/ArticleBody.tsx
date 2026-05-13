interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  // TODO: Use a proper markdown renderer like react-markdown or shiki for code blocks
  return (
    <div className="prose prose-invert prose-premium max-w-none">
      {/* 
          This is a placeholder for the rendered markdown content.
          The CSS for 'prose-premium' should be defined in globals.css 
          to handle typography for headings, lists, quotes, etc.
      */}
      <div 
        className="whitespace-pre-wrap font-sans text-lg lg:text-xl text-premium-text leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: content }} // Only for demo; use proper parser in production
      />
    </div>
  );
}
