// Card header for web apps: one screenshot in a browser-window frame, rising
// out of the bottom edge of the same tinted strip PhoneStrip uses, so every
// card with a visual shares one look. Set `cover` in a project's data file.
export default function BrowserStrip({ src, alt, label }) {
  return (
    <div className="relative h-[200px] overflow-hidden bg-gradient-to-b from-forest-tag to-[#dfe8e1]">
      {/* soft accent ring, same as PhoneStrip */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-forest-muted/40" aria-hidden="true" />
      <div className="absolute inset-x-[9%] top-6 bottom-0 overflow-hidden rounded-t-[10px] border border-b-0 border-ink/80 bg-ink shadow-[0_14px_30px_-12px_rgba(36,33,29,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <div className="flex h-[22px] items-center gap-[5px] px-2.5">
          <span className="h-[7px] w-[7px] rounded-full bg-white/25" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/25" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/25" />
          <span className="ml-2 truncate rounded bg-white/10 px-2 py-[1px] font-mono text-[9px] text-cream/60">{label}</span>
        </div>
        <img src={src} alt={alt} loading="lazy" className="block h-[calc(100%-22px)] w-full object-cover object-left-top" />
      </div>
    </div>
  )
}
