import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { profile } from '../data/content'

export default function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="scroll-mt-24 border-t border-line py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>Contact</SectionLabel>
        <div className="max-w-read">
          <h3 className="mb-4 font-serif text-[30px] leading-tight text-ink">
            Open to Software Engineering roles.
          </h3>
          <p className="mb-7 text-[17px] leading-[1.75] text-muted2">
            Reach out about full-time roles or collaborations — I&apos;m happy to
            talk through how I build LLM-powered systems from the backbone up.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-[15px] font-semibold text-forest hover:text-forest-dark"
            >
              {profile.email}
            </a>
            <a href={profile.github} className="text-[15px] text-muted hover:text-ink">
              GitHub
            </a>
            <a href={profile.linkedin} className="text-[15px] text-muted hover:text-ink">
              LinkedIn
            </a>
            <a href={profile.resumeUrl} className="text-[15px] text-muted hover:text-ink">
              Résumé
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
