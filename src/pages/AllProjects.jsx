import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { publishedProjects } from '../data/projects'
import { profile } from '../data/content'

// Cards per page; prev / next arrows flip between pages.
// Order comes from src/data/projects/index.js.
const PER_PAGE = 3

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const Chevron = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'prev' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
)

const arrowBtn =
  'flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-forest hover:bg-forest hover:text-cream disabled:pointer-events-none disabled:opacity-35'

// Every published project, three at a time. Top bar matches the case-study pages.
export default function AllProjects() {
  const [page, setPage] = useState(0)
  const gridRef = useRef(null)

  const pages = Math.ceil(publishedProjects.length / PER_PAGE)
  const start = page * PER_PAGE
  const visible = publishedProjects.slice(start, start + PER_PAGE)

  const goTo = (next) => {
    if (next < 0 || next >= pages) return
    setPage(next)
    // On phones the cards stack, so the arrows end up far below the first card:
    // bring the top of the grid back into view.
    const top = gridRef.current?.getBoundingClientRect().top ?? 0
    if (top < 80) gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const controls = pages > 1 && (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2" role="group" aria-label="Project pages">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Page ${i + 1} of ${pages}`}
            aria-current={i === page ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${i === page ? 'w-6 bg-forest' : 'w-2 bg-line hover:bg-forest-muted'}`}
          />
        ))}
        <span className="ml-2 font-mono text-[12px] text-faint2">
          {start + 1}–{start + visible.length} of {publishedProjects.length}
        </span>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Previous projects" aria-controls="all-projects" className={arrowBtn}>
          <Chevron dir="prev" />
        </button>
        <button type="button" onClick={() => goTo(page + 1)} disabled={page === pages - 1} aria-label="Next projects" aria-controls="all-projects" className={arrowBtn}>
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <nav className="sticky top-0 z-10 -mx-6 flex h-[72px] items-center justify-between border-b border-line bg-cream/95 px-6 backdrop-blur sm:-mx-8 sm:px-8">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-ink">
          <BackArrow />
          Back to portfolio
        </Link>
        <div className="text-[14px] font-semibold text-ink">{profile.name}</div>
      </nav>

      <header className="pb-10 pt-16 md:pt-20">
        <div className="animate-hero mb-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em] text-forest">
          {publishedProjects.length} projects
        </div>
        <h1
          className="animate-hero font-serif text-[38px] font-normal leading-[1.08] tracking-[-0.01em] text-ink sm:text-[46px]"
          style={{ animationDelay: '80ms' }}
        >
          All projects
        </h1>
        <p className="animate-hero mt-4 max-w-read text-[17px] leading-[1.7] text-muted" style={{ animationDelay: '160ms' }}>
          Every case study: voice AI, medical AI, agentic workflows, RAG systems and full-stack products.
          Each one covers the problem, how it works, what went wrong and the results.
        </p>
      </header>

      <div ref={gridRef} className="scroll-mt-24 pb-16">
        {/* key={page} remounts the cards, so their fade-in replays on each page */}
        <div key={page} id="all-projects" aria-live="polite" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={i * 60} />
          ))}
        </div>
        {controls && <div className="mt-6">{controls}</div>}
      </div>

      <Footer />
    </div>
  )
}
