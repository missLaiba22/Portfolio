import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { profile } from '../data/content'

export default function About() {
  return (
    <Reveal
      as="section"
      id="about"
      className="scroll-mt-24 border-t border-line py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>About</SectionLabel>
        <p className="max-w-read text-[17px] leading-[1.75] text-muted2">
          {profile.about}
        </p>
      </div>
    </Reveal>
  )
}
