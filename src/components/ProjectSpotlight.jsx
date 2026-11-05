import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import ProjectIcon from './ProjectIcon'
import CountUp from './CountUp'
import ScreenShowcase from './ScreenShowcase'
import { cardQuickLinks, LinkGlyph, linkTitle } from './linkMeta'

const Arrow = () => (
  <svg className="transition-transform duration-200 group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// Fallback visual when a project has no `gallery`: its `flow` steps on a dark panel.
function FlowPanel({ flow = [] }) {
  return (
    <div className="flex h-full flex-col justify-center bg-forest-dark px-6 py-8 sm:px-8">
      <div className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-muted">
        How it works
      </div>
      <ol className="relative space-y-5">
        <span className="absolute bottom-3 left-[13px] top-3 w-px bg-white/15" aria-hidden="true" />
        {flow.map((step, i) => (
          <li key={step.title} className="relative flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 bg-forest-dark font-mono text-[11px] font-semibold text-cream">
              {i + 1}
            </span>
            <span className="pt-[3px]">
              <span className="block text-[14.5px] font-semibold text-cream">{step.title}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-cream/65">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Metrics({ metrics }) {
  if (!metrics.length) return null
  return (
    <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
      {metrics.map((m) => (
        <div key={m.label} className="flex min-w-0 flex-col-reverse justify-end">
          <dt className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.04em] text-faint2">{m.label}</dt>
          <dd className="font-display font-semibold tracking-[-0.03em] text-[21px] leading-tight text-ink">
            <CountUp value={m.value} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Full-width card for the lead project, above the paged grid. */
export default function ProjectSpotlight({ project }) {
  const { slug, title, cardTag, cardTagline, metrics = [], icon, links = [], gallery, flow } = project
  const quick = cardQuickLinks(links)
  const hasGallery = gallery?.length > 0

  const header = (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-forest-tag text-forest">
        <ProjectIcon name={icon} className="h-[18px] w-[18px]" />
      </span>
      {cardTag && (
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-forest">{cardTag}</span>
      )}
      <span className="ml-auto rounded-full bg-forest px-2.5 py-[3px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-cream">
        LATEST
      </span>
    </div>
  )

  const footer = (
    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
      <span className="inline-flex items-center gap-1 text-[14.5px] font-semibold text-forest group-hover:text-forest-dark">
        Read case study <Arrow />
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
  )

  const titleBlock = (
    <>
      <h3 className="mt-5 font-display font-semibold tracking-[-0.03em] text-[28px] leading-none text-ink sm:text-[32px]">
        {/* Stretched link: the whole card opens the case study */}
        <Link to={`/work/${slug}`} className="text-ink after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">{cardTagline}</p>
    </>
  )

  // With screenshots: text + metrics left, the product tour right (stacked on phones).
  if (hasGallery) {
    return (
      <Reveal className="group relative grid overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-200 hover:border-forest-muted lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col p-6 sm:p-7">
          {header}
          {titleBlock}
          <Metrics metrics={metrics} />
          {footer}
        </div>
        {/* relative z-10: the tour's tabs stay clickable above the stretched link */}
        <div className="relative z-10 border-t border-line lg:border-l lg:border-t-0">
          <ScreenShowcase shots={gallery} title={title} />
        </div>
      </Reveal>
    )
  }

  // Without screenshots: text left, "how it works" steps right.
  return (
    <Reveal className="group relative grid overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-200 hover:border-forest-muted lg:grid-cols-[1.15fr_1fr]">
      <div className="flex flex-col p-6 sm:p-8">
        {header}
        {titleBlock}
        <Metrics metrics={metrics} />
        {footer}
      </div>
      <div className="border-t border-line lg:border-l lg:border-t-0">
        <FlowPanel flow={flow} />
      </div>
    </Reveal>
  )
}
