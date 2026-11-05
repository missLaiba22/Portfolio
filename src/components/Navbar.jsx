import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile, nav } from '../data/content'

// Which section is under the navbar right now, so its link can be highlighted.
// A section counts as active once its top passes ~35% down the viewport.
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const sectionIds = nav.map((item) => item.href.split('#')[1])

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const active = useActiveSection(sectionIds)

  // Close the mobile menu when tapping outside it, pressing Escape, or scrolling.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-20 -mx-6 border-b border-line bg-cream/95 px-6 backdrop-blur sm:-mx-8 sm:px-8"
    >
      <div className="flex h-[72px] items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-bold tracking-[-0.01em] text-ink"
        >
          {profile.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.split('#')[1]
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative text-sm font-medium transition-colors hover:text-ink ${
                  isActive ? 'text-ink' : 'text-muted'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-forest transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-ink px-[18px] py-[9px] text-[13.5px] font-semibold text-cream transition-opacity hover:opacity-90"
          >
            Résumé
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-line p-2 text-ink md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — always mounted so it can slide open/closed (grid-rows
          0fr → 1fr animates to the content's natural height). Hidden from
          screen readers and the tab order while closed. */}
      <div
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out md:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 border-t border-line py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-chip hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-ink px-2 py-2 text-center text-sm font-semibold text-cream"
            >
              Résumé
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}