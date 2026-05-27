"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HEADER_NAV, SITE_CONFIG } from "@config";
import { Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchInput } from "@/components/ui/SearchInput";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [issueDate, setIssueDate] = useState("Daily Edition");

  useEffect(() => {
    setIssueDate(new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date()));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-un-border bg-un-paper/95 backdrop-blur-md">
      <div className="editorial-container">
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center border-b border-un-border py-3 text-[10px] font-black uppercase tracking-[0.22em] text-un-muted">
          <div>{issueDate}</div>
          <Link href="/latest" className="premium-link text-un-text">
            Daily Business Intelligence
          </Link>
          <div className="flex justify-end">
            <Link href="/advertise" className="premium-link">
              Media Kit
            </Link>
          </div>
        </div>

        <div className="grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-28 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-un-border bg-un-paper text-un-muted transition-colors hover:border-brand hover:text-un-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="hidden lg:block">
            <SearchInput className="w-72" />
          </div>

          <Link href="/" className="group justify-self-center text-center">
            <span className="block font-serif text-4xl font-black leading-none text-un-text transition-colors group-hover:text-brand sm:text-5xl lg:text-7xl">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-2 hidden text-[10px] font-black uppercase tracking-[0.34em] text-un-muted sm:block">
              Markets / AI / Power / Money
            </span>
          </Link>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="/search"
              className="hidden h-9 w-9 items-center justify-center rounded-[4px] border border-un-border bg-un-paper text-un-muted transition-colors hover:border-brand hover:text-un-text sm:flex lg:hidden"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>
            <ThemeToggle />
            <Link
              href="/latest"
              className="hidden rounded-[4px] bg-un-text px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-un-bg transition-colors hover:bg-brand sm:inline-flex"
            >
              Latest
            </Link>
          </div>
        </div>

        <div className="hidden border-t border-un-border lg:block">
          <nav className="flex h-12 items-center justify-center gap-8">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="premium-link text-[11px] font-black uppercase tracking-[0.22em] text-un-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-5rem)] overflow-y-auto border-t border-un-border bg-un-paper/95 backdrop-blur-xl lg:hidden">
          <nav className="editorial-container flex flex-col gap-6 py-8">
            <div className="mb-4">
              <SearchInput className="w-full" />
            </div>
            {HEADER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-un-border pb-4 font-serif text-3xl font-semibold text-un-text transition-colors hover:text-brand"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-8 border-t border-un-border">
              <Link 
                href="/trending" 
                className="mb-4 block text-sm font-black uppercase tracking-[0.2em] text-un-muted hover:text-un-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending Intelligence
              </Link>
              <Link 
                href="/latest" 
                className="block text-sm font-black uppercase tracking-[0.2em] text-un-muted hover:text-un-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Latest Briefings
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
