/** The forest-green mono label that anchors each section. */
export default function SectionLabel({ children, className = '' }) {
  return (
    <div
      className={`pt-1 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em] text-forest ${className}`}
    >
      {children}
    </div>
  )
}
