/**
 * Renders the segmentation-model results as cards, with the Dice/IoU metric as
 * the largest element — makes the technical evidence as prominent as the story.
 */
export default function ModelsBlock({ models }) {
  if (!models?.length) return null
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {models.map((m) => (
        <div
          key={m.organ}
          className="flex flex-col rounded-xl border border-line bg-card p-5 transition-colors duration-300 hover:border-forest-muted/60"
        >
          <div className="font-serif text-[30px] leading-none text-ink">
            {m.metric}
          </div>
          <div className="mt-3 text-[14px] font-semibold text-ink">{m.organ}</div>
          <div className="mt-1 text-[12.5px] leading-[1.5] text-faint">{m.arch}</div>
          {m.note && (
            <div className="mt-2 font-mono text-[11.5px] italic text-faint2">
              {m.note}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
