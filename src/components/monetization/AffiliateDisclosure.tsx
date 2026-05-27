import { AFFILIATE_DISCLOSURE } from "@/config/monetization";

interface AffiliateDisclosureProps {
  className?: string;
  text?: string;
}

export function AffiliateDisclosure({ className = "", text }: AffiliateDisclosureProps) {
  return (
    <div className={`p-4 bg-un-surface border border-un-border rounded-lg ${className}`}>
      <p className="text-xs text-un-muted leading-relaxed">
        <strong className="text-un-text font-semibold">Disclosure:</strong>{" "}
        {text || AFFILIATE_DISCLOSURE}
      </p>
    </div>
  );
}
