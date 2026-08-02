import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'
import { publishedProjects, projects } from '../data/projects'

export default function Projects() {
  const draftCount = projects.length - publishedProjects.length

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line py-16 md:py-[72px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>Projects</SectionLabel>
        <div className="flex min-w-0 flex-col gap-7">
          {publishedProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={Math.min(i, 4) * 60} />
          ))}

          {draftCount > 0 && (
            <p className="font-mono text-[12.5px] text-faint2">
              More case studies in progress
              {/* Draft projects (Cognara, Verdara, HistoryQuest) live in
                  src/data/projects/ and appear here once written. */}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
