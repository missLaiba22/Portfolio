import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ModelsBlock from '../components/ModelsBlock'
import RequestFlowDiagram from '../components/RequestFlowDiagram'
import CognaraPipelineDiagram from '../components/CognaraPipelineDiagram'
import VerdaraDebateFlowDiagram from '../components/VerdaraDebateFlowDiagram'
import HistoryQuestRagDiagram from '../components/HistoryQuestRagDiagram'
import CodeSparkFlowDiagram from '../components/CodeSparkFlowDiagram'
import GynaeRagDiagram from '../components/GynaeRagDiagram'
import KarigarArchitectureDiagram from '../components/KarigarArchitectureDiagram'
import { realLinks, linkKind, LinkGlyph, cardQuickLinks, linkTitle } from '../components/linkMeta'
import { profile } from '../data/content'

// One consistent reading measure across the whole case study.
const READ = 'max-w-[760px]'

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const SectionHeading = ({ children }) => (
  <div className="mb-6 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-forest">
    {children}
  </div>
)

const diagrams = {
  requestFlow: {
    Component: RequestFlowDiagram,
    caption: 'One FastAPI core, two routed paths — imaging and conversational.',
  },
  cognaraPipeline: {
    Component: CognaraPipelineDiagram,
    caption:
      'A two-node LangGraph: research (Tavily) then synthesis (Gemini), from a Streamlit UI or the CLI.',
  },
  verdaraDebate: {
    Component: VerdaraDebateFlowDiagram,
    caption:
      'Multi-agent debate with human-in-the-loop review; state checkpointed to SQLite at the pause.',
  },
  historyQuestRag: {
    Component: HistoryQuestRagDiagram,
    caption:
      'Both indexing and querying embed through the same model — the fix the rebuild was about.',
  },
  codesparkFlow: {
    Component: CodeSparkFlowDiagram,
    caption: 'Five endpoints, one shared Gemini call, formatted back into the matching UI tab.',
  },
  gynaeRag: {
    Component: GynaeRagDiagram,
    caption:
      "Answers come only from retrieved context — if it isn't in the docs, the model defers to a real doctor.",
  },
  karigarArchitecture: {
    Component: KarigarArchitectureDiagram,
    caption:
      'One FastAPI app with six modules, each layered router → schema → service → repository, on PostgreSQL + pgvector.',
  },
}

/**
 * The single template every case study renders through. Feed it one project
 * object from src/data/projects/ and the story stays consistent:
 * Question → My Role → labelled sections (optional diagram / stack / models)
 * → Lesson → links.
 */
export default function CaseStudyLayout({ project }) {
  const {
    kicker,
    title,
    subtitle,
    metrics = [],
    question,
    role,
    ownership = [],
    sections = [],
    models,
    lesson,
    links = [],
  } = project

  const quick = cardQuickLinks(links)

  return (
    <div>
      {/* Top bar */}
      <nav className="sticky top-0 z-10 -mx-6 flex h-[72px] items-center justify-between border-b border-line bg-cream/95 px-6 backdrop-blur sm:-mx-8 sm:px-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-ink"
        >
          <BackArrow />
          Back to portfolio
        </Link>
        <div className="text-[14px] font-semibold text-ink">{profile.name}</div>
      </nav>

      {/* Title — same gentle staggered entrance as the home hero */}
      <header className="pt-16 md:pt-20">
        {kicker && (
          <div className="animate-hero mb-5 font-mono text-[12.5px] tracking-[0.02em] text-faint2">
            {kicker}
          </div>
        )}
        <h1
          className="animate-hero font-serif text-[38px] font-normal leading-[1.08] tracking-[-0.01em] text-ink sm:text-[46px]"
          style={{ animationDelay: '80ms' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`animate-hero mt-5 text-[18px] leading-[1.6] text-muted ${READ}`}
            style={{ animationDelay: '160ms' }}
          >
            {subtitle}
          </p>
        )}
      </header>

      {/* Summary bar — stats + quick actions, so a recruiter gets the gist
          and can jump to live/demo/repo without scrolling. */}
      {(metrics.length > 0 || quick.length > 0) && (
        <div
          className="animate-hero mt-8 flex flex-col gap-5 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          style={{ animationDelay: '240ms' }}
        >
          {metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-x-10">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-serif text-[22px] leading-none text-ink sm:text-[28px]">{m.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.04em] text-faint2">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {quick.length > 0 && (
            <div className="flex shrink-0 gap-2">
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
      )}

      {/* Question band */}
      {question && (
        <section className="-mx-6 mt-12 bg-band px-6 py-12 sm:-mx-8 sm:px-8 md:py-14">
          <Reveal>
            <p className={`text-[19px] leading-[1.6] text-muted2 ${READ}`}>
              <span className="font-mono font-semibold not-italic text-forest">Q.</span>{' '}
              {question}
            </p>
          </Reveal>
        </section>
      )}

      {/* My Role — contribution honesty, impossible to skim past */}
      {role && (
        <Reveal
          as="section"
          className="mt-14 rounded-2xl border border-line bg-card p-6 sm:p-8"
        >
          <SectionHeading>My Role</SectionHeading>
          <p className={`text-[16px] leading-[1.7] text-muted2 ${READ}`}>{role}</p>

          {ownership.length > 0 && (
            <div
              className={`mt-6 grid grid-cols-1 gap-6 border-t border-line pt-6 ${
                ownership.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
              }`}
            >
              {ownership.map((o, i) => {
                // Tone by column: primary (mine) → shared → teammate.
                const tone =
                  ['text-forest', 'text-forest-muted', 'text-faint'][i] ||
                  'text-faint'
                return (
                  <div key={o.who}>
                    <div
                      className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] ${tone}`}
                    >
                      {o.who}
                    </div>
                    <ul className="space-y-1.5">
                      {o.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[14px] leading-[1.5] text-muted2"
                        >
                          <span aria-hidden className={tone}>
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          )}
        </Reveal>
      )}

      {/* Body sections */}
      {sections.map((sec) => {
        const dia = sec.diagram ? diagrams[sec.diagram] : null
        return (
          <Reveal as="section" key={sec.label} className="mt-16 md:mt-20">
            <SectionHeading>{sec.label}</SectionHeading>

            {sec.blocks?.map((block, i) => (
              <div key={i} className={i > 0 ? 'mt-6' : ''}>
                {block.lead && (
                  <p className={`mb-2 text-[16px] font-semibold text-ink ${READ}`}>
                    {block.lead}
                  </p>
                )}
                <p className={`text-[17px] leading-[1.75] text-muted2 ${READ}`}>
                  {block.text}
                </p>
              </div>
            ))}

            {/* Optional bullet list — concrete outcomes, easy to skim */}
            {sec.bullets && (
              <ul className={`space-y-2.5 ${sec.blocks?.length ? 'mt-6' : ''} ${READ}`}>
                {sec.bullets.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-muted2">
                    <span aria-hidden className="text-forest">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Modern SVG diagram (replaces the old ASCII figure) */}
            {dia && (
              <figure className="mt-8">
                <dia.Component />
                {dia.caption && (
                  <figcaption className="mt-3 font-mono text-[12px] text-faint2">
                    {dia.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Legacy ASCII figure — kept for any draft that still uses `fig` */}
            {sec.fig && (
              <>
                <div className="mb-3 mt-7 overflow-x-auto rounded-xl border border-line bg-card px-6 py-6">
                  {sec.fig.lines.map((line, i) => (
                    <div
                      key={i}
                      className="whitespace-pre-wrap font-mono text-[13px] leading-[1.9] text-muted2"
                    >
                      {line}
                    </div>
                  ))}
                  {sec.fig.note && (
                    <div className="mt-3 text-[12.5px] italic text-faint2">
                      {sec.fig.note}
                    </div>
                  )}
                </div>
                {sec.fig.caption && (
                  <div className="mb-2 font-mono text-[12px] text-faint2">
                    {sec.fig.caption}
                  </div>
                )}
              </>
            )}

            {/* Optional tech-stack table */}
            {sec.stack && (
              <div className="mt-6 overflow-hidden rounded-xl border border-line">
                {sec.stack.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[110px_1fr] gap-4 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[130px_1fr]"
                  >
                    <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.04em] text-forest">
                      {row.label}
                    </div>
                    <div className="text-[14px] text-muted2">{row.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Models block attaches to the section flagged `models: true` */}
            {models && sec.models && <ModelsBlock models={models} />}
          </Reveal>
        )
      })}

      {/* Lesson */}
      {lesson && (
        <Reveal as="section" className="mt-20 border-t border-line pt-12">
          <SectionHeading>
            <span className="text-forest-muted">Lesson learned</span>
          </SectionHeading>
          <p className={`font-serif text-[24px] italic leading-[1.45] text-ink ${READ}`}>
            {lesson}
          </p>
        </Reveal>
      )}

      {/* Links + back */}
      <section className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-line pt-10 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-3">
          {realLinks(links).map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-[14px] font-semibold text-forest transition-colors hover:border-forest-muted hover:bg-chip"
            >
              <LinkGlyph kind={linkKind(link)} size={15} />
              {link.label}
            </a>
          ))}
        </div>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-ink"
        >
          <BackArrow />
          Back to all projects
        </Link>
      </section>
    </div>
  )
}
