import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { experience } from '../data/content'
import { getProject } from '../data/projects'

// Timeline badge glyphs, picked by each role's `icon` in content.js.
const glyphs = {
  code: (
    <>
      <polyline points="8 7 3 12 8 17" />
      <polyline points="16 7 21 12 16 17" />
    </>
  ),
  teach: (
    <>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  health: <path d="M3 12h3.2l1.8 4 3-8 1.9 4H21" />,
}

const Glyph = ({ name }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {glyphs[name] || glyphs.code}
  </svg>
)

const Arrow = () => (
  <svg className="transition-transform duration-200 group-hover/link:translate-x-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// A timeline: a line down the left with an icon badge per role. Ongoing roles
// get a filled badge and a "Current" tag; roles that produced a case study link to it.
export default function Experience({ number }) {
  return (
    <section id="experience" className="scroll-mt-24 py-16 md:py-[72px]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] lg:gap-14">
        <SectionLabel number={number}>Experience</SectionLabel>

        <ol className="relative">
          {/* the timeline line, behind the badges */}
          <span className="absolute bottom-6 left-[19px] top-6 hidden w-px sm:block bg-gradient-to-b from-forest-muted via-line to-transparent" aria-hidden="true" />

          {experience.map((e, i) => {
            const current = /present/i.test(e.period)
            const project = e.project ? getProject(e.project) : null
            return (
              <li key={`${e.org}-${e.role}`} className="group relative grid grid-cols-1 pb-4 last:pb-0 sm:grid-cols-[40px_1fr] sm:gap-5 sm:pb-5">
                {/* badge on the line: the org's logo (or a glyph). ring-cream cuts the
                    line around it; the current role gets a green outline. */}
                {e.logo ? (
                  <span
                    className={`relative z-10 mt-6 hidden h-10 w-10 overflow-hidden sm:block rounded-xl border border-line bg-card shadow-[0_6px_16px_-8px_rgba(28,38,34,0.4)] ring-4 ring-cream transition-transform duration-300 group-hover:scale-105 ${
                      current ? 'outline outline-2 outline-offset-[5px] outline-forest' : ''
                    }`}
                  >
                    <img src={e.logo} alt={`${e.org} logo`} loading="lazy" className="h-full w-full object-cover" />
                  </span>
                ) : (
                  <span
                    className={`relative z-10 mt-6 hidden h-10 w-10 items-center sm:flex justify-center rounded-xl ring-4 ring-cream transition-transform duration-300 group-hover:scale-105 ${
                      current ? 'bg-forest text-cream' : 'border border-forest-muted/50 bg-forest-tag text-forest'
                    }`}
                  >
                    <Glyph name={e.icon} />
                  </span>
                )}

                <Reveal
                  delay={Math.min(i, 3) * 60}
                  className="min-w-0 rounded-2xl border border-line bg-card p-5 transition-colors duration-300 group-hover:border-forest-muted/70 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    {e.logo && (
                      <img src={e.logo} alt="" loading="lazy" className="h-10 w-10 shrink-0 rounded-lg border border-line sm:hidden" />
                    )}
                    <div className="min-w-0 basis-[calc(100%-56px)] sm:basis-auto">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h3 className="text-[18px] font-semibold leading-snug text-ink">{e.role}</h3>
                        {current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-tag px-2 py-[2px] text-[11px] font-semibold text-forest">
                            <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-[14px]">
                        <span className="font-semibold text-forest">{e.org}</span>
                        {e.meta && <span className="text-faint"> · {e.meta}</span>}
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-line bg-cream px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-faint">
                      {e.period}
                    </span>
                  </div>

                  {e.description && (
                    <p className="mt-4 max-w-read text-[15px] leading-[1.7] text-muted2">{e.description}</p>
                  )}

                  {/* Labelled parts side by side, each with an accent rule */}
                  {e.highlights?.length > 0 && (
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {e.highlights.map((h) => (
                        <div key={h.label} className="rounded-xl border-l-2 border-forest bg-chip/70 px-4 py-3">
                          <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.07em] text-forest">{h.label}</div>
                          <p className="mt-1.5 text-[14px] leading-[1.65] text-muted2">{h.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {(e.skills?.length > 0 || project) && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {e.skills?.map((s) => (
                          <span key={s} className="rounded-full border border-line bg-cream px-2.5 py-[3px] text-[12px] text-muted">
                            {s}
                          </span>
                        ))}
                      </div>
                      {project?.status === 'published' && (
                        <Link
                          to={`/work/${project.slug}`}
                          className="group/link inline-flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-forest hover:text-forest-dark"
                        >
                          {project.title} case study <Arrow />
                        </Link>
                      )}
                    </div>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
