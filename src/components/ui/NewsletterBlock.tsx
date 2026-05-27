"use client";

export function NewsletterBlock() {
  return (
    <div className="relative overflow-hidden rounded-[6px] bg-un-text p-8 text-center text-un-bg lg:p-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">
          The Unstory Briefing
        </span>
        <h2 className="font-serif text-3xl font-black leading-tight text-un-bg lg:text-5xl">
          A private memo for people building through the noise.
        </h2>
        <p className="text-lg text-un-bg/70 lg:text-xl">
          Get weekly insights on money, AI, power, and high-income skills delivered directly to your inbox.
        </p>

        <form className="mx-auto flex max-w-lg flex-col gap-3 pt-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow rounded-[4px] border border-un-bg/20 bg-un-bg px-5 py-3.5 text-un-text placeholder:text-un-muted transition-all focus:border-brand focus:outline-none"
            required
          />
          <button
            type="submit"
            className="rounded-[4px] bg-brand px-7 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-white transition-colors hover:bg-un-accent active:scale-95"
          >
            Subscribe
          </button>
        </form>

        <p className="text-[10px] uppercase tracking-widest text-un-bg/50">
          No spam. Only high-value attention.
        </p>
      </div>
    </div>
  );
}
