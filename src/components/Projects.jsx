import { Link } from 'react-router-dom'
import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'
import ProjectSpotlight from './ProjectSpotlight'
import { homeProjects, publishedProjects } from '../data/projects'

// Home page: selected work only (chosen in src/data/projects/index.js).
// The first project is the spotlight; the rest sit side by side below it.
// Everything else lives on the /projects page.
export default function Projects({ number }) {
  const [spotlight, ...cards] = homeProjects
  const moreCount = publishedProjects.length - homeProjects.length

  return (
    <section
      id="projects"
      // full-bleed-band paints a tinted strip edge to edge (see index.css)
      className="full-bleed-band scroll-mt-24 py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel number={number}>Selected work</SectionLabel>
        <div className="min-w-0">
          {spotlight && <ProjectSpotlight project={spotlight} />}

          {cards.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {cards.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={i * 60} />
              ))}
            </div>
          )}

          {moreCount > 0 && (
            <Link
              to="/projects"
              className="group mt-6 flex items-center justify-between gap-4 rounded-xl border border-line bg-card px-5 py-4 transition-colors duration-200 hover:border-forest-muted"
            >
              <span>
                <span className="block text-[15px] font-semibold text-ink">
                  View all {publishedProjects.length} projects
                </span>
                <span className="mt-0.5 block text-[13.5px] text-faint">
                  {moreCount} more, including agentic AI, RAG and medical AI work.
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
                <svg className="transition-transform duration-200 group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
