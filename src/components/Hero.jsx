import { profile } from '../data/content'

// Same two-column grid as every section below (label | content), so the
// headline starts on the same left edge as the rest of the page's text.
export default function Hero() {
  return (
    <section className="grid grid-cols-1 gap-6 py-20 md:grid-cols-[200px_1fr] md:gap-14 md:py-28">
      <div
        className="animate-hero pt-1 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em] text-forest md:pt-4"
        style={{ animationDelay: '0ms' }}
      >
        {profile.role}
      </div>

      <div className="max-w-read">
        <h1
          className="animate-hero mb-6 text-balance font-serif text-[40px] font-normal leading-[1.08] tracking-[-0.01em] text-ink sm:text-[50px] md:text-[56px]"
          style={{ animationDelay: '90ms' }}
        >
          {profile.headline}
        </h1>
        <p
          className="animate-hero mb-8 text-[17px] leading-[1.75] text-muted2"
          style={{ animationDelay: '180ms' }}
        >
          {profile.subline}
        </p>
        <div className="animate-hero flex flex-wrap gap-3" style={{ animationDelay: '270ms' }}>
          <a
            href="/#projects"
            className="rounded-lg bg-ink px-[22px] py-3 text-[14.5px] font-semibold text-cream transition-opacity duration-200 hover:opacity-90"
          >
            View case studies
          </a>
          <a
            href="/#contact"
            className="rounded-lg border border-line px-[22px] py-3 text-[14.5px] font-semibold text-ink transition-colors duration-200 hover:bg-chip"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
