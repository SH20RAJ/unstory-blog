import Link from "next/link";
import { FOOTER_SECTIONS, SITE_CONFIG, SOCIAL_LINKS } from "@config";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-un-border bg-un-text text-un-bg">
      <div className="editorial-container py-14 lg:py-20">
        <div className="border-b border-un-bg/20 pb-10 text-center">
          <Link href="/" className="inline-block">
            <span className="font-serif text-5xl font-black leading-none text-un-bg sm:text-7xl">
              {SITE_CONFIG.name}
            </span>
          </Link>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-un-bg/70">
            {SITE_CONFIG.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 border-b border-un-bg/20 py-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <span className="section-kicker text-brand">Premium Publisher Desk</span>
            <p className="mt-5 max-w-sm text-sm leading-7 text-un-bg/70">
              Independent coverage of the money, power, technology, and operating shifts reshaping the internet economy.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <Link href={SOCIAL_LINKS.twitter} className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-un-bg/20 text-un-bg/70 transition-colors hover:border-brand hover:text-brand">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href={SOCIAL_LINKS.linkedin} className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-un-bg/20 text-un-bg/70 transition-colors hover:border-brand hover:text-brand">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href={SOCIAL_LINKS.instagram} className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-un-bg/20 text-un-bg/70 transition-colors hover:border-brand hover:text-brand">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.24em] text-brand">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-un-bg/70 transition-colors hover:text-un-bg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <p className="text-xs text-un-bg/60">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <Link href="/privacy" className="text-xs text-un-bg/60 transition-colors hover:text-un-bg">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-un-bg/60 transition-colors hover:text-un-bg">
              Terms
            </Link>
            <Link href="/advertise" className="text-xs text-un-bg/60 transition-colors hover:text-un-bg">
              Advertise
            </Link>
            <Link href="/rss.xml" className="text-xs text-un-bg/60 transition-colors hover:text-un-bg">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
