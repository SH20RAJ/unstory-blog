"use client";

export function NewsletterBlock() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-premium-gray premium-border p-8 lg:p-12 text-center">
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <span className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold">The Unstory Briefing</span>
        <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white leading-tight">
          Intelligence for the wealth-minded.
        </h2>
        <p className="text-premium-muted text-lg lg:text-xl">
          Get weekly insights on money, AI, power, and high-income skills delivered directly to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-6 py-4 rounded-lg bg-premium-dark border border-premium-border text-white placeholder:text-premium-muted focus:outline-none focus:border-brand/50 transition-all"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-lg bg-brand text-premium-dark font-bold uppercase tracking-widest text-sm hover:bg-brand/90 transition-all hover:scale-105 active:scale-95"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-[10px] text-premium-muted uppercase tracking-widest">
          No spam. Only high-value attention.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
    </div>
  );
}
