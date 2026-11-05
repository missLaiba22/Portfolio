/** The forest-green mono label that anchors each section, with an optional
 *  section number ("01 — Projects") for an editorial rhythm down the page. */
export default function SectionLabel({ children, number, className = '' }) {
  return (
    <div
      className={`pt-1 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em] text-forest ${className}`}
    >
      {number && (
        <span className="mb-1.5 block text-[11px] font-medium tracking-[0.1em] text-forest-muted">
          {number} —
        </span>
      )}
      {children}
    </div>
  )
}
