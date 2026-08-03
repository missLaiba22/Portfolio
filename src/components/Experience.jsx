import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-line py-16 md:py-[72px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>Experience</SectionLabel>
        <div className="flex flex-col gap-4">
          {experience.map((e, i) => (
            <Reveal
              key={`${e.org}-${e.role}`}
              delay={Math.min(i, 3) * 60}
              className="rounded-2xl border border-line bg-card p-6 transition-colors duration-300 hover:border-forest-muted/60 sm:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[18px] font-semibold text-ink">{e.role}</h3>
                <span className="font-mono text-[11.5px] uppercase tracking-[0.04em] text-faint2">
                  {e.period}
                </span>
              </div>
              <div className="mt-1 text-[14px] text-muted">
                {e.org}
                {e.meta && <span className="text-faint2"> · {e.meta}</span>}
              </div>

              <p className="mt-3 max-w-[640px] text-[15px] leading-[1.7] text-muted2">
                {e.description}
              </p>

              {e.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line bg-chip px-2.5 py-[5px] text-[12.5px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}