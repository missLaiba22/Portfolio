import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import ProjectIcon from './ProjectIcon'
import { cardQuickLinks, LinkGlyph, linkTitle } from './linkMeta'

export default function ProjectCard({ project, delay = 0 }) {
  const { slug, title, featured, cardTag, cardTagline, metrics = [], icon, links = [] } = project
  const quick = cardQuickLinks(links)

  return (
    <Reveal
      delay={delay}
      className="group relative flex h-full flex-col rounded-xl border border-line bg-card p-5 transition-colors duration-200 hover:border-forest-muted sm:p-6"
    >
      {/* Header: icon + category on one line, so text uses the full card width */}
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-forest-tag text-forest">
          <ProjectIcon name={icon} className="h-[18px] w-[18px]" />
        </span>
        {cardTag && (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-forest">
            {cardTag}
          </span>
        )}
        {featured && (
          <span className="ml-auto rounded-full bg-forest-tag px-2 py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.02em] text-forest">
            FEATURED
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[19px] font-semibold leading-tight text-ink">
        {/* Stretched link: the whole card opens the case study */}
        <Link to={`/work/${slug}`} className="text-ink after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.6] text-faint">{cardTagline}</p>

      {/* Metrics + footer pinned to the bottom so cards in a row line up */}
      <div className="mt-auto">
        {/* Metrics — fixed three-column grid so they never wrap unevenly */}
        {metrics.length > 0 && (
          <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-serif text-[20px] leading-tight text-ink">{m.value}</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.04em] text-faint2">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="flex items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-forest group-hover:text-forest-dark">
            Read case study
            <svg
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>

          {quick.length > 0 && (
            // relative z-10 keeps these clickable above the stretched card link
            <div className="relative z-10 flex shrink-0 gap-1.5">
              {quick.map((q) => (
                <a
                  key={q.kind}
                  href={q.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={linkTitle(q.kind)}
                  aria-label={`${title} — ${linkTitle(q.kind)}`}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-forest-muted hover:bg-chip hover:text-forest"
                >
                  <LinkGlyph kind={q.kind} size={15} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
