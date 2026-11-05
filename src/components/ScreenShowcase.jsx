import { useEffect, useState } from 'react'

// A GIF-like product tour: real screenshots crossfade inside a browser frame,
// with clickable step tabs whose progress bar drives the auto-advance.
// Sharper and lighter than a GIF, pauses on hover, and stays still (manual
// tabs only) for visitors who prefer reduced motion.
const INTERVAL_MS = 4200

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

export default function ScreenShowcase({ shots, title }) {
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()
  const next = () => setActive((i) => (i + 1) % shots.length)

  return (
    <div className="showcase flex h-full flex-col justify-center bg-forest-dark p-4 sm:p-6">
      {/* Step tabs */}
      <div className="mb-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${shots.length}, minmax(0, 1fr))` }} role="tablist" aria-label={`${title} screens`}>
        {shots.map((s, i) => {
          const isActive = i === active
          return (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className="group/tab text-left"
            >
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/15">
                {isActive && (
                  <span
                    key={active}
                    className={`showcase-progress absolute inset-y-0 left-0 rounded-full bg-cream ${reduced ? 'w-full' : ''}`}
                    style={reduced ? undefined : { animationDuration: `${INTERVAL_MS}ms` }}
                    onAnimationEnd={reduced ? undefined : next}
                  />
                )}
                {i < active && <span className="absolute inset-0 rounded-full bg-cream/60" />}
              </span>
              <span className={`mt-2.5 flex items-baseline gap-2 text-[12.5px] font-semibold transition-colors ${isActive ? 'text-cream' : 'text-cream/50 group-hover/tab:text-cream/80'}`}>
                <span className="font-mono text-[10.5px] text-forest-muted">0{i + 1}</span>
                <span className="truncate">{s.caption}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Browser frame */}
      <div className="overflow-hidden rounded-xl border border-white/15 bg-[#1b1c1b] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 truncate rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[10.5px] text-cream/55">
            {title.toLowerCase()} · {shots[active].caption.toLowerCase()}
          </span>
        </div>
        {/* 16:9 trims the empty bottom of the 16:10 shots (anchored top-left) */}
        <div className="relative aspect-[16/9]">
          {shots.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              aria-hidden={i !== active}
              className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-700 ease-out ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
