// ============================================
// Unstory.app — Navigation Configuration
// ============================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/** Main header navigation — maps to top-level categories */
export const HEADER_NAV: NavItem[] = [
  { label: "Wealth", href: "/category/wealth" },
  { label: "AI", href: "/category/ai" },
  { label: "Business", href: "/category/business" },
  { label: "Power", href: "/category/power" },
  { label: "Lifestyle", href: "/category/lifestyle" },
  { label: "Skills", href: "/category/skills" },
  { label: "Trends", href: "/category/trends" },
  { label: "Archive", href: "/blogs" },
];

/** Footer link sections */
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Intelligence",
    links: [
      { label: "Archive", href: "/blogs" },
      { label: "Trending", href: "/trending" },
      { label: "Wealth", href: "/category/wealth" },
      { label: "AI", href: "/category/ai" },
      { label: "Business", href: "/category/business" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Power", href: "/category/power" },
      { label: "Lifestyle", href: "/category/lifestyle" },
      { label: "Skills", href: "/category/skills" },
      { label: "Trends", href: "/category/trends" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

/** Social media links */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/unstoryapp",
  linkedin: "https://linkedin.com/company/unstory",
  instagram: "https://instagram.com/unstoryapp",
} as const;

/** Site metadata */
export const SITE_CONFIG = {
  name: "Unstory",
  tagline: "Strategic Intelligence for Founders, Investors, and Operators",
  description:
    "Strategic intelligence tracking AI, markets, and power shifts. Deciphering complex trends for high-agency professionals, founders, and operators.",
  url: "https://unstory.app",
  ogImage: "/og-default.png",
  locale: "en_US",
} as const;
