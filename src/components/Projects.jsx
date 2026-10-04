import { useState, useRef } from 'react'
import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'
import { publishedProjects } from '../data/projects'

// How many projects show before "Show all". Order comes from
// src/data/projects/index.js, so the strongest work goes first there.
const INITIAL = 4

export default function Projects() {
  const [expanded, setExpanded] = useState(false)
  const sectionRef = useRef(null)

  const hiddenCount = publishedProjects.length - INITIAL
  const visible = expanded ? publishedProjects : publishedProjects.slice(0, INITIAL)

  const toggle = () => {
    // When collapsing, bring the section back into view so the reader
    // isn't left far below the shortened list.
    if (expanded) sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    setExpanded((v) => !v)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-24 border-t border-line py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>Projects</SectionLabel>
        <div className="min-w-0">
          <div id="project-list" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                delay={i < INITIAL ? Math.min(i, 3) * 60 : 0}
              />
            ))}
          </div>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls="project-list"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-forest-muted hover:bg-chip"
            >
              {expanded ? 'Show fewer projects' : `Show all ${publishedProjects.length} projects`}
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
