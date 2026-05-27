interface AffiliateDisclosureProps {
  className?: string;
}

/**
 * FTC-compliant affiliate disclosure component.
 * Shown on articles with monetizationType === "affiliate".
 */
export function AffiliateDisclosure({ className = "" }: AffiliateDisclosureProps) {
  return (
    <div className={`p-4 bg-un-surface border border-un-border rounded-lg ${className}`}>
      <p className="text-xs text-un-muted leading-relaxed">
        <strong className="text-un-text">Disclosure:</strong>{" "}
        Unstory may earn a commission when readers choose products or services through our links.
        We only include products relevant to the article. This does not influence our editorial independence.
      </p>
    </div>
  );
}
