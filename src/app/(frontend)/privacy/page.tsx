import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Metadata } from "next";
import { SITE_CONFIG } from "@config";

export const metadata: Metadata = {
  title: "Privacy Policy — Unstory",
  description: "Unstory's privacy policy. How we handle your personal information and protect your data.",
  alternates: { canonical: `${SITE_CONFIG.url}/privacy` },
  openGraph: {
    title: "Privacy Policy",
    description: "Unstory's privacy policy.",
    url: `${SITE_CONFIG.url}/privacy`,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout 
      title="Privacy Policy" 
      tagline="Your Data"
    >
      <p className="mb-8">
        At Unstory, we respect your privacy. This policy outlines how we handle your personal information when you use our website.
      </p>
      
      <h2 className="text-2xl text-un-text font-serif font-bold mt-12 mb-6">Information Collection</h2>
      <p>
        We only collect information that is necessary for providing our intelligence services. This may include your email address if you subscribe to our briefings, and anonymous usage data to improve our platform.
      </p>

      <h2 className="text-2xl text-un-text font-serif font-bold mt-12 mb-6">Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your information from unauthorized access. Your data is stored securely on our edge infrastructure.
      </p>

      <h2 className="text-2xl text-un-text font-serif font-bold mt-12 mb-6">No Third-Party Sharing</h2>
      <p>
        We do not sell or share your personal data with third-party advertisers. Your information is used solely for the purpose of delivering the content you have requested.
      </p>
    </StaticPageLayout>
  );
}
