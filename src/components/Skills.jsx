import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { SkillIcon } from './skillIcons'
import { skillCategories } from '../data/content'

// Compact layout: one row per group (label left, pills right on wider screens).
// Tools show their brand mark in brand colour; concepts show a monoline glyph
// in forest green — same pill either way, so the groups read as one system.
export default function Skills({ number }) {
  return (
    <Reveal
      as="section"
      id="skills"
      className="scroll-mt-24 border-t border-line py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] lg:gap-14">
        <SectionLabel number={number}>Skills</SectionLabel>
        <dl className="min-w-0 divide-y divide-line">
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr] sm:items-start sm:gap-5"
            >
              <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint2 sm:pt-[9px]">
                {cat.name}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="group inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-[7px] text-[13px] font-medium text-muted transition-colors duration-200 hover:border-forest-muted hover:text-ink"
                  >
                    <SkillIcon
                      name={skill}
                      size={16}
                      className="shrink-0 text-forest transition-transform duration-200 group-hover:scale-110"
                    />
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  )
}
