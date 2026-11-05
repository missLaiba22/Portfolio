/** The heading that anchors each section in the left column: a small gold
 *  number ("01 —") above the section name in the display font. On desktop it
 *  sticks below the navbar while its section scrolls past. */
export default function SectionLabel({ children, number, className = '' }) {
  return (
    <div className={`lg:sticky lg:top-28 lg:self-start ${className}`}>
      {number && (
        <span className="mb-2 block font-mono text-[12px] font-medium tracking-[0.1em] text-gold">
          {number} —
        </span>
      )}
      <h2 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] text-forest-dark md:text-[26px]">
        {children}
      </h2>
    </div>
  )
}
