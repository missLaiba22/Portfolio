import { profile, highlights } from '../data/content'
import { publishedProjects } from '../data/projects'
import portrait from '../assets/laiba.jpeg'

const GitHubGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)

const LinkedInGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const iconLink =
  'flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-forest-muted hover:bg-chip hover:text-forest'

// Same two-column grid as every section below (label | content), so the
// headline starts on the same left edge as the rest of the page's text.
export default function Hero() {
  const proof = [...highlights, { value: String(publishedProjects.length), label: 'Shipped case studies' }]

  return (
    <section className="grid grid-cols-1 gap-6 py-16 md:grid-cols-[200px_1fr] md:gap-14 md:py-24">
      <div
        className="animate-hero flex items-center gap-4 pt-1 md:block md:pt-4"
        style={{ animationDelay: '0ms' }}
      >
        {/* Small avatar on phones/tablets; the large portrait shows on desktop. */}
        <img
          src={portrait}
          alt=""
          className="h-14 w-14 shrink-0 rounded-full border border-line object-cover object-top lg:hidden"
        />
        <div className="font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em] text-forest">
          {profile.role}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_260px]">
        <div className="max-w-read">
          {profile.openToRoles && (
            <div
              className="animate-hero mb-6 inline-flex items-center gap-2 rounded-full border border-forest-muted/60 bg-forest-tag px-3 py-1 text-[12.5px] font-semibold text-forest"
              style={{ animationDelay: '40ms' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
              </span>
              Open to software engineering roles
            </div>
          )}

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

          <div className="animate-hero flex flex-wrap items-center gap-3" style={{ animationDelay: '270ms' }}>
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
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className={iconLink}>
              <GitHubGlyph />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className={iconLink}>
              <LinkedInGlyph />
            </a>
          </div>

          {/* Proof strip — the quickest facts a recruiter scans for. */}
          <dl
            className="animate-hero mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:max-w-[560px]"
            style={{ animationDelay: '360ms' }}
          >
            {proof.map((p) => (
              // dt comes first in the markup (valid <dl>); flex-col-reverse shows the value on top.
              <div key={p.label} className="flex min-w-0 flex-col-reverse justify-end">
                <dt className="mt-2 font-mono text-[10.5px] uppercase leading-snug tracking-[0.05em] text-faint">
                  {p.label}
                </dt>
                <dd className="font-serif text-[26px] leading-none text-ink sm:text-[30px]">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait — desktop only, with an offset frame in the accent colour. */}
        <div className="animate-hero relative hidden lg:mt-12 lg:block" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-forest-muted" aria-hidden="true" />
          <img
            src={portrait}
            alt={`Portrait of ${profile.name}`}
            className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[50%_20%]"
          />
        </div>
      </div>
    </section>
  )
}
