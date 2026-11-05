// Card header for mobile apps: up to three phone screenshots in device frames,
// the middle one raised, rising out of the bottom edge of a tinted strip.
// Set `phones: [{ src, alt }]` in a project's data file to use it.
export default function PhoneStrip({ phones }) {
  const shown = phones.slice(0, 3)
  return (
    <div className="relative h-[200px] overflow-hidden bg-gradient-to-b from-forest-tag to-[#dfe8e1]">
      {/* soft accent ring */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-forest-muted/40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-6 flex items-start justify-center gap-3">
        {shown.map((p, i) => {
          const isMiddle = shown.length === 3 ? i === 1 : i === 0
          return (
            <div
              key={p.src}
              className={`shrink-0 rounded-[20px] bg-ink p-[3px] shadow-[0_14px_30px_-12px_rgba(36,33,29,0.45)] transition-transform duration-500 ease-out ${
                isMiddle
                  ? 'z-10 w-[104px] group-hover:-translate-y-1.5'
                  : 'mt-6 w-[92px] opacity-95 group-hover:-translate-y-1'
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="block aspect-[300/652] w-full rounded-[17px] object-cover object-top"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
