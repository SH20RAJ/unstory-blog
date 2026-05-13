import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export default function TermsPage() {
  return (
    <StaticPageLayout 
      title="Terms of Service" 
      tagline="Agreement"
    >
      <p className="mb-8">
        By accessing Unstory.app, you agree to comply with the following terms of service.
      </p>
      
      <h2 className="text-2xl text-black font-serif font-bold mt-12 mb-6">Intellectual Property</h2>
      <p>
        All content on Unstory, including text, graphics, and logos, is the property of Unstory and is protected by international copyright laws.
      </p>

      <h2 className="text-2xl text-black font-serif font-bold mt-12 mb-6">Usage Restrictions</h2>
      <p>
        You may not use our content for commercial purposes without explicit permission. Automated scraping of our intelligence data is strictly prohibited.
      </p>

      <h2 className="text-2xl text-black font-serif font-bold mt-12 mb-6">Disclaimer</h2>
      <p>
        The information provided on Unstory is for educational and informational purposes only. It does not constitute financial, legal, or professional advice.
      </p>
    </StaticPageLayout>
  );
}
