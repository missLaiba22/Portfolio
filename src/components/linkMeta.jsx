// Shared helpers so link icons stay consistent everywhere (cards + case studies).

// Classify a link into a kind by its url/label.
export function linkKind({ url = '', label = '' }) {
  const u = url.toLowerCase()
  const l = label.toLowerCase()
  if (u.includes('github.com') || l.includes('github')) return 'repo'
  if (l.includes('report') || l.includes('paper')) return 'doc'
  if (u.includes('drive.google') || l.includes('video')) return 'demo'
  if (u.includes('vercel.app') || u.includes('streamlit.app') || l.includes('live') || l.includes('demo'))
    return 'live'
  if (u.startsWith('http')) return 'live'
  return 'other'
}

// Only real, clickable links (drop unfilled TODO placeholders).
export function realLinks(links = []) {
  return links.filter((x) => typeof x.url === 'string' && x.url.startsWith('http'))
}

// Up to one each of live / demo / repo, in that order — for compact card rows.
export function cardQuickLinks(links = []) {
  const real = realLinks(links)
  const order = ['live', 'demo', 'repo']
  const picked = []
  for (const kind of order) {
    const hit = real.find((x) => linkKind(x) === kind)
    if (hit) picked.push({ ...hit, kind })
  }
  return picked
}

const TITLE = { live: 'Live app', demo: 'Demo video', repo: 'GitHub repository', doc: 'Report', other: 'Open link' }

export function linkTitle(kind) {
  return TITLE[kind] || TITLE.other
}

// Consistent monoline glyph per kind.
export function LinkGlyph({ kind, size = 16 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  if (kind === 'repo') {
    return (
      <svg {...common}>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    )
  }
  if (kind === 'demo') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (kind === 'doc') {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }
  // live / external
  return (
    <svg {...common}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
