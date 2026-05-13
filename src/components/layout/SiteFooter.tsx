import Link from "next/link";
import { FOOTER_SECTIONS, SITE_CONFIG, SOCIAL_LINKS } from "@config";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-premium-gray border-t border-premium-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
            </Link>
            <p className="text-premium-muted max-w-sm mb-8 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center space-x-6">
              <Link href={SOCIAL_LINKS.twitter} className="text-premium-muted hover:text-brand transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href={SOCIAL_LINKS.linkedin} className="text-premium-muted hover:text-brand transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href={SOCIAL_LINKS.instagram} className="text-premium-muted hover:text-brand transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Nav Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-serif font-semibold mb-6 tracking-wide uppercase text-xs">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-premium-muted premium-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 mt-16 border-t border-premium-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-premium-muted">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link href="/privacy" className="text-xs text-premium-muted hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-premium-muted hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/advertise" className="text-xs text-premium-muted hover:text-white transition-colors">
              Advertise
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
