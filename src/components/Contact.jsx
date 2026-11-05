import Reveal from './Reveal'
import { profile } from '../data/content'

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

const secondary =
  'inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-[14px] font-semibold text-cream/90 transition-colors duration-200 hover:border-white/40 hover:bg-white/10 hover:text-cream'

// The page's closing block: a dark forest panel so the page ends on a strong
// call to action instead of another hairline section.
export default function Contact({ number }) {
  return (
    <Reveal as="section" id="contact" className="scroll-mt-24 py-16 md:py-[72px]">
      <div className="relative overflow-hidden rounded-3xl bg-forest-dark px-6 py-12 sm:px-12 md:py-16">
        {/* soft decorative rings */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" aria-hidden="true" />

        <div className="relative max-w-[620px]">
          <div className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-forest-muted">
            {number && <span className="mr-2 text-gold">{number} —</span>}
            Contact
          </div>
          <h2 className="mb-4 text-balance font-display font-semibold tracking-[-0.03em] text-[30px] leading-[1.12] text-cream sm:text-[40px]">
            Open to Software Engineering roles.
          </h2>
          <p className="mb-8 text-[17px] leading-[1.75] text-cream/75">
            Reach out about full-time roles or collaborations — I&apos;m happy to
            talk through how I build LLM-powered systems from the backbone up.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-[14.5px] font-semibold text-forest-dark transition-opacity duration-200 hover:opacity-90"
            >
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
              LinkedIn <ArrowUpRight />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={secondary}>
              GitHub <ArrowUpRight />
            </a>
            <a href={profile.medium} target="_blank" rel="noopener noreferrer" className={secondary}>
              Medium <ArrowUpRight />
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={secondary}>
              Résumé <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
