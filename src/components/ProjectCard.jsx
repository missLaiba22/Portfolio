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
      className="group rounded-2xl border border-line bg-card p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-forest-muted/60 hover:shadow-[0_10px_34px_-12px_rgba(36,33,29,0.18)] sm:p-7"
    >
      {/* Header: icon tile + category + title */}
      <div className="flex items-start gap-3.5 sm:gap-4">
        <Link
          to={`/work/${slug}`}
          aria-label={`${title} case study`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-forest-tag text-forest transition-colors group-hover:bg-sel"
        >
          <ProjectIcon name={icon} />
        </Link>

        <div className="min-w-0 flex-1">
          {cardTag && (
            <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-forest">
              {cardTag}
            </div>
          )}
          <div className="flex flex-wrap items-baseline gap-x-[10px] gap-y-1">
            <h3 className="text-[20px] font-semibold leading-tight text-ink sm:text-[21px]">
              <Link to={`/work/${slug}`} className="text-ink hover:text-ink">
                {title}
              </Link>
            </h3>
            {featured && (
              <span className="rounded-full bg-forest-tag px-[9px] py-[3px] font-mono text-[11px] font-semibold tracking-[0.02em] text-forest">
                FEATURED
              </span>
            )}
          </div>
          <p className="mt-2 text-[15px] leading-[1.55] text-faint">{cardTagline}</p>
        </div>
      </div>

      {/* Metrics — the fastest signal for a skim */}
      {metrics.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 sm:gap-x-10">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="font-serif text-[26px] leading-none text-ink">{m.value}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.04em] text-faint2">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom row: CTA (left) + quick links (right) — never squeezes the title */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          to={`/work/${slug}`}
          className="inline-flex items-center gap-1 text-[14px] font-semibold text-forest hover:text-forest-dark"
        >
          View full case study
          <svg
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        {quick.length > 0 && (
          <div className="flex shrink-0 gap-1.5">
            {quick.map((q) => (
              <a
                key={q.kind}
                href={q.url}
                target="_blank"
                rel="noopener noreferrer"
                title={linkTitle(q.kind)}
                aria-label={`${title} — ${linkTitle(q.kind)}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-forest-muted hover:bg-chip hover:text-forest"
              >
                <LinkGlyph kind={q.kind} size={16} />
              </a>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  )
}
