import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { fieldNote } from '../data/content'

export default function FieldNotes() {
  return (
    <Reveal
      as="section"
      id="notes"
      className="scroll-mt-24 border-t border-line py-16 md:py-[72px]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-14">
        <SectionLabel>{fieldNote.label}</SectionLabel>
        <div className="max-w-read">
          <h3 className="mb-4 font-serif text-[30px] leading-tight text-ink">
            {fieldNote.title}
          </h3>
          <p className="text-[17px] leading-[1.75] text-muted2">{fieldNote.body}</p>
        </div>
      </div>
    </Reveal>
  )
}
