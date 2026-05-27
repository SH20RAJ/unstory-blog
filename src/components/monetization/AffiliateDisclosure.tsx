import { AFFILIATE_DISCLOSURE, SPONSORED_DISCLOSURE } from "@/config/monetization";

interface AffiliateDisclosureProps {
  type?: "affiliate" | "sponsored";
  className?: string;
}

export function AffiliateDisclosure({ type = "affiliate", className = "" }: AffiliateDisclosureProps) {
  const text = type === "sponsored" ? SPONSORED_DISCLOSURE : AFFILIATE_DISCLOSURE;

  return (
    <div className={`p-4 bg-un-surface border border-un-border rounded-lg ${className}`}>
      <p className="text-[10px] text-un-muted leading-relaxed">
        <strong className="text-un-text/70 uppercase tracking-widest">
          {type === "sponsored" ? "Sponsored Content" : "Disclosure"}:
        </strong>{" "}
        {text}
      </p>
    </div>
  );
}
