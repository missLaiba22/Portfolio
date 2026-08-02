import { useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, nav } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-20 -mx-6 border-b border-line bg-cream/95 px-6 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex h-[72px] items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-bold tracking-[-0.01em] text-ink"
        >
          {profile.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-forest transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href={profile.resumeUrl}
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

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-line py-3 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-chip hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md bg-ink px-2 py-2 text-center text-sm font-semibold text-cream"
          >
            Résumé
          </a>
        </div>
      )}
    </nav>
  )
}
