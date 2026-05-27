import Link from "next/link";
import { AuthorByline } from "./AuthorByline";
import { Badge } from "@/components/ui/Badge";
import { FileText, ShieldCheck, Info, Scale, ArrowRight } from "lucide-react";

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

export function IntelligenceFooter({ article, author, sources = [] }: IntelligenceFooterProps) {
  return (
    <div className="mt-24 pt-24 border-t border-un-border space-y-20">
      {/* Author Intelligence Box */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-brand"></div>
          <h3 className="text-2xl font-serif font-bold text-un-text">Analysis Authority</h3>
        </div>
        {author && <AuthorByline author={author} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Verification & Trust */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-brand"></div>
            <h3 className="text-2xl font-serif font-bold text-un-text">Trust Signals</h3>
          </div>
          
          <div className="p-8 bg-un-surface border border-un-border rounded-xl space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-un-muted font-bold flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-brand" /> Trust Score
                </span>
                <div className="text-3xl font-bold text-white">
                  {article.trustScore != null && article.trustScore >= 70
                    ? `${article.trustScore}%`
                    : "Pending Review"}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-un-muted font-bold flex items-center gap-2">
                  <Scale className="w-3 h-3 text-brand" /> Verification
                </span>
                <div className="text-sm font-bold text-brand uppercase tracking-widest">
                  {article.factCheckStatus
                    ? article.factCheckStatus.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
                    : "Under Review"}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-un-border">
              <p className="text-xs text-un-muted italic leading-relaxed">
                This briefing has been prepared according to our rigorous <Link href="/fact-checking-policy" className="text-brand hover:underline">Fact-Checking Protocol</Link>. Any identified factual errors are subject to our <Link href="/corrections-policy" className="text-brand hover:underline">Corrections Policy</Link>.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/editorial-policy" className="text-[10px] uppercase tracking-widest text-un-muted hover:text-white transition-colors flex items-center gap-1 font-bold">
                  Editorial Standards <ArrowRight className="w-3 h-3" />
                </Link>
                <Link href="/methodology" className="text-[10px] uppercase tracking-widest text-un-muted hover:text-white transition-colors flex items-center gap-1 font-bold">
                  Research Methodology <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* YMYL Disclaimer */}
              <div className="pt-6 border-t border-un-border">
                <p className="text-[10px] text-un-muted italic leading-relaxed">
                  <strong className="not-italic">Disclaimer:</strong> This content is for informational and educational purposes only and does not constitute financial, legal, or medical advice. Always consult qualified professionals before making financial or legal decisions. See our <Link href="/editorial-policy" className="text-brand hover:underline">Editorial Policy</Link> for details.
                </p>
              </div>
              <div className="p-4 bg-brand/5 border border-brand/10 rounded-lg">
                <p className="text-xs text-un-muted leading-relaxed">
                  <strong className="text-un-text">Disclaimer:</strong> This content is for informational and educational purposes only and does not constitute financial, legal, medical, or investment advice. Always consult qualified professionals before making decisions. See our <Link href="/editorial-policy" className="text-brand hover:underline">Editorial Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Sources */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-brand"></div>
            <h3 className="text-2xl font-serif font-bold text-un-text">Intelligence Sourcing</h3>
          </div>

          <div className="space-y-6">
            {sources.length > 0 ? (
              <ul className="space-y-4">
                {sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded bg-un-bg border border-un-border flex items-center justify-center text-[10px] text-brand font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="space-y-1">
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-un-text group-hover:text-brand transition-colors block"
                      >
                        {source.name}
                      </a>
                      <p className="text-[10px] uppercase tracking-widest text-un-muted">
                        Primary Intelligence Source
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 bg-un-bg/30 border border-un-border border-dashed rounded-xl">
                <p className="text-xs text-un-muted font-serif italic text-center">
                Sources for this briefing are being compiled and verified. Our editorial team reviews all sources according to our <Link href="/fact-checking-policy" className="text-brand hover:underline">Fact-Checking Protocol</Link>.
                </p>
              </div>
            )}
            
            <div className="pt-4">
              <Link href="/methodology" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand hover:text-white transition-colors">
                <Info className="w-3 h-3" />
                How we source intelligence
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
