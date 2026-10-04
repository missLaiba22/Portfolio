// Karigar system architecture — one FastAPI modular monolith on Render.
// React client (Vercel) → Router → Schema → Service → Repository → PostgreSQL
// + pgvector (Neon), with external APIs (Stripe, Google OAuth, Groq, Hugging Face).
// Palette: green = backend layer, cream = client / data / external.

const C = {
  ink: '#24211d',
  muted: '#57503f',
  faint2: '#a89f8c',
  forest: '#33574a',
  forestMuted: '#93a99b',
  forestTag: '#e6ede7',
  line: '#e3dbc9',
  card: '#fffcf7',
  arrow: '#a89f8c',
}

const ROLE = {
  node: { fill: C.forestTag, stroke: C.forestMuted, title: C.forest, sub: C.forestMuted },
  io: { fill: C.card, stroke: C.line, title: C.ink, sub: C.faint2 },
}

function Node({ cx, cy, w, h, title, sub, role }) {
  const s = ROLE[role]
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="10" fill={s.fill} stroke={s.stroke} />
      <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill={s.title}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={s.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

const layers = [
  { cy: 196, title: 'Router', sub: 'API endpoints · role & ownership checks' },
  { cy: 254, title: 'Schema', sub: 'Pydantic request / response validation' },
  { cy: 312, title: 'Service', sub: 'business rules · owns commit()' },
  { cy: 370, title: 'Repository', sub: 'data access only · flush()' },
]

const externals = [
  { cy: 196, title: 'Stripe', sub: 'checkout + webhooks' },
  { cy: 254, title: 'Google OAuth', sub: 'sign-in' },
  { cy: 312, title: 'Groq', sub: 'assistant replies' },
  { cy: 370, title: 'Hugging Face', sub: 'embeddings for RAG' },
]

export default function KarigarArchitectureDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 840 560" role="img" aria-labelledby="kg-t kg-d" style={{ width: '100%', maxWidth: 840, minWidth: 600, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="kg-t">Karigar system architecture</title>
        <desc id="kg-d">
          A React frontend on Vercel calls one FastAPI application on Render over HTTPS with a JWT.
          The backend is a modular monolith with six modules (auth, artisans, products, orders,
          promotions, chatbot), each layered router, schema, service, repository. The repository layer
          reads and writes PostgreSQL with pgvector, hosted on Neon. The backend calls Stripe for
          checkout and webhooks, Google OAuth for sign-in, Groq for assistant replies, and Hugging Face
          for embeddings.
        </desc>
        <defs>
          <marker id="kg-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {/* client → backend */}
        <line x1={300} y1={74} x2={300} y2={109} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#kg-arrow)" />
        <text x={310} y={96} fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={C.muted}>HTTPS + JWT</text>

        {/* modular monolith container */}
        <rect x={20} y={114} width={560} height={300} rx="14" fill="none" stroke={C.forestMuted} />
        <text x={300} y={140} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13.5" fontWeight="600" fill={C.forest}>
          FastAPI modular monolith · Render
        </text>
        <text x={300} y={158} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={C.faint2}>
          auth · artisans · products · orders · promotions · chatbot
        </text>

        {/* layer-to-layer arrows */}
        {layers.slice(0, -1).map((l, i) => (
          <line key={l.title} x1={300} y1={l.cy + 22} x2={300} y2={layers[i + 1].cy - 25} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#kg-arrow)" />
        ))}

        {/* backend → external APIs (dashed) */}
        {externals.map((e) => (
          <line key={e.title} x1={582} y1={e.cy} x2={643} y2={e.cy} stroke={C.arrow} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#kg-arrow)" />
        ))}

        {/* repository → database */}
        <line x1={300} y1={392} x2={300} y2={447} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#kg-arrow)" />

        <Node cx={300} cy={46} w={240} h={56} title="React frontend" sub="Vite + Tailwind · Vercel" role="io" />
        {layers.map((l) => (
          <Node key={l.title} cx={300} cy={l.cy} w={400} h={44} title={l.title} sub={l.sub} role="node" />
        ))}
        {externals.map((e) => (
          <Node key={e.title} cx={740} cy={e.cy} w={180} h={48} title={e.title} sub={e.sub} role="io" />
        ))}
        <Node cx={300} cy={480} w={320} h={60} title="PostgreSQL + pgvector" sub="Neon · local dev in Docker" role="io" />

        {/* legend */}
        <g transform="translate(170 534)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>backend layer</text>
        </g>
        <g transform="translate(320 534)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>client / data / external</text>
        </g>
        <g transform="translate(520 534)">
          <line x1="0" y1="8" x2="22" y2="8" stroke={C.arrow} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="30" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>external API call</text>
        </g>
      </svg>
    </div>
  )
}
