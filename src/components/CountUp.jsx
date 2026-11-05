import { useEffect, useRef, useState } from 'react'

// Counts a metric up from 0 the first time it scrolls into view.
// Only simple values animate — an integer with an optional short unit
// ("95%", "6×", "100K", "4"). Anything else ("10s → 1.7s", "Live", "1st")
// renders as-is, so no metric is ever shown with a misleading in-between value.
const SIMPLE = /^(\d+)([%×xK+]?)$/

export default function CountUp({ value, duration = 900 }) {
  const match = SIMPLE.exec(String(value))
  const target = match ? Number(match[1]) : null
  const ref = useRef(null)
  const [n, setN] = useState(target)

  useEffect(() => {
    if (target === null || target < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    let raf
    setN(0)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
          setN(Math.round(eased * target))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  if (!match) return value
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {match[2]}
    </span>
  )
}
