import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { skillCategories } from '../data/content'

export default function Skills() {
  return (
    <Reveal
      as="section"
      id="skills"
      className="scroll-mt-24 border-t border-line py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>Skills</SectionLabel>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
          {skillCategories.map((cat) => (
            <div key={cat.name}>
              <div className="mb-3 text-[14.5px] font-semibold text-ink">
                {cat.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-line bg-chip px-3 py-[6px] text-[13px] text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
