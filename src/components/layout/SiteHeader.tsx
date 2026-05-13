"use client";

import Link from "next/link";
import { useState } from "react";
import { HEADER_NAV, SITE_CONFIG } from "@config";
import { Search, Menu, X } from "lucide-react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-premium-border bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-3xl font-serif font-black tracking-tighter text-black group-hover:text-brand transition-colors">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-premium-muted premium-link uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-premium-muted hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="lg:hidden p-2 text-premium-muted hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-xl h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-6 p-8">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-serif font-medium text-black hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-8 border-t border-premium-border">
              <Link 
                href="/trending" 
                className="text-lg text-premium-muted hover:text-black mb-4 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending Intelligence
              </Link>
              <Link 
                href="/latest" 
                className="text-lg text-premium-muted hover:text-black block"
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
