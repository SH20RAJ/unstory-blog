import Link from "next/link";
import { ArrowRight, Info, Scale, ShieldCheck } from "lucide-react";

interface IntelligenceFooterProps {
  article: {
    id: string;
    publishedAt: Date | null;
    updatedAt: Date | null;
    trustScore?: number | null;
    factCheckStatus?: string | null;
  };
  author: any;
  sources?: any[];
}

export function IntelligenceFooter({ article, sources = [] }: IntelligenceFooterProps) {
  const verification = article.factCheckStatus
    ? article.factCheckStatus.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "Under Review";

  return (
    <div className="mt-16 space-y-12 border-t border-un-border pt-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-[6px] border border-un-border bg-un-paper p-6">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-brand" />
            <h3 className="section-kicker text-un-text">Trust Signals</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-un-muted">
                <ShieldCheck className="h-3 w-3 text-brand" /> Trust Score
              </span>
              <div className="mt-2 font-serif text-3xl font-black text-un-text">
                {article.trustScore != null && article.trustScore >= 70
                  ? `${article.trustScore}%`
                  : "Review"}
              </div>
            </div>
            <div>
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-un-muted">
                <Scale className="h-3 w-3 text-brand" /> Verification
              </span>
              <div className="mt-3 text-xs font-black uppercase tracking-widest text-brand">
                {verification}
              </div>
            </div>
          </div>

          <p className="mt-6 border-t border-un-border pt-5 text-xs leading-relaxed text-un-muted">
            This briefing follows our <Link href="/fact-checking-policy" className="text-brand hover:underline">fact-checking protocol</Link>. Corrections are handled under our <Link href="/corrections-policy" className="text-brand hover:underline">corrections policy</Link>.
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/editorial-policy" className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-un-muted transition-colors hover:text-brand">
              Editorial Standards <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/methodology" className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-un-muted transition-colors hover:text-brand">
              Methodology <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        <section className="rounded-[6px] border border-un-border bg-un-paper p-6">
          <div className="mb-6 flex items-center gap-3">
            <Info className="h-5 w-5 text-brand" />
            <h3 className="section-kicker text-un-text">Sourcing</h3>
          </div>

          {sources.length > 0 ? (
            <ul className="space-y-4">
              {sources.map((source, i) => (
                <li key={i} className="group flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border border-un-border bg-un-bg text-[10px] font-black text-brand">
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-bold text-un-text transition-colors group-hover:text-brand"
                    >
                      {source.name}
                    </a>
                    <p className="text-[10px] font-black uppercase tracking-widest text-un-muted">
                      Primary source
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-[6px] border border-dashed border-un-border bg-un-bg p-5">
              <p className="text-center font-serif text-sm italic leading-6 text-un-muted">
                Source notes are reviewed against our editorial methodology before publication.
              </p>
            </div>
          )}
        </section>
      </div>

      <p className="border-t border-un-border pt-6 text-[10px] leading-relaxed text-un-muted">
        <strong className="text-un-text">Disclaimer:</strong> This content is for informational and educational purposes only and does not constitute financial, legal, medical, or investment advice. Always consult qualified professionals before making decisions.
      </p>
    </div>
  );
}
