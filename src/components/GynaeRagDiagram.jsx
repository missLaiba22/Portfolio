// GynaeGenius architecture — a two-pipeline RAG system.
// Ingestion (offline): WHO docs → chunk + embed (Cohere) → Astra DB.
// Query (per question): Question → retrieve from Astra DB → grounded answer (Cohere) → chat.
// Palette: green = model step, cream = data in/out.

const C = {
  ink: '#24211d',
  muted: '#57503f',
  faint: '#857c6a',
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
      <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12.5" fontWeight="600" fill={s.title}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={cy + 13} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill={s.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

const lines = [
  [225, 78, 275, 78], // WHO → Chunk+embed
  [485, 78, 545, 78], // Chunk+embed → Astra DB
  [160, 255, 205, 255], // Question → Retrieve
  [420, 255, 435, 255], // Retrieve → Grounded answer
  [660, 255, 685, 255], // Grounded answer → Answer
]

// Astra DB (ingestion) feeds the query pipeline's retrieve step.
const elbow = '645,108 645,182 250,182 250,222'

export default function GynaeRagDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 820 350" role="img" aria-labelledby="gg-t gg-d" style={{ width: '100%', maxWidth: 820, minWidth: 580, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="gg-t">GynaeGenius retrieval pipeline</title>
        <desc id="gg-d">
          Offline, WHO reference documents are chunked and embedded with Cohere into an Astra DB
          vector store. Per user question, the Streamlit chat retrieves matching context from Astra
          DB and a Cohere model writes an answer grounded only in that context, deferring to a real
          doctor when the documents do not cover the question.
        </desc>
        <defs>
          <marker id="gg-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {/* pipeline labels */}
        <text x="16" y="24" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fill={C.faint}>
          Ingestion pipeline (offline setup)
        </text>
        <text x="16" y="188" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fill={C.faint}>
          Query pipeline (per user question)
        </text>

        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#gg-arrow)" />
        ))}
        <polyline points={elbow} fill="none" stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#gg-arrow)" />

        {/* ingestion row */}
        <Node cx={120} cy={78} w={205} h={58} title="WHO reference docs" sub="loaded as source" role="io" />
        <Node cx={380} cy={78} w={210} h={58} title="Chunk + embed" sub="cohere embeddings" role="io" />
        <Node cx={620} cy={78} w={150} h={58} title="Astra DB" sub="vector store" role="io" />

        {/* query row */}
        <Node cx={90} cy={255} w={140} h={58} title="Question" sub="streamlit chat" role="io" />
        <Node cx={315} cy={255} w={210} h={58} title="Retrieve context" sub="astra db search" role="io" />
        <Node cx={550} cy={255} w={220} h={58} title="Grounded answer" sub="cohere llm + prompt" role="node" />
        <Node cx={745} cy={255} w={120} h={58} title="Answer" sub="in chat" role="io" />

        {/* legend */}
        <g transform="translate(16 322)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>model step</text>
        </g>
        <g transform="translate(170 322)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>data in / out</text>
        </g>
      </svg>
    </div>
  )
}
