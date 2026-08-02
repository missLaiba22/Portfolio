// HistoryQuest architecture — a RAG pipeline whose whole point is that the
// indexing path and the querying path pass through the SAME embedding model.
// Textbook chunk + Question → one shared Embedder → Pinecone → Top-3 → Gemini → Answer.

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

function Node({ cx, cy, w, h, title, sub, role, emphasis }) {
  const s = ROLE[role]
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx="10"
        fill={s.fill}
        stroke={emphasis ? C.forest : s.stroke}
        strokeWidth={emphasis ? 2 : 1}
      />
      <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill={s.title}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={cy + 13} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={s.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

const edges = [
  [175, 80, 225, 120], // Textbook chunk → Embedder
  [175, 205, 225, 165], // Question → Embedder
  [415, 142, 485, 142], // Embedder → Pinecone
  [560, 169, 560, 260], // Pinecone → Top-3 chunks
  [485, 285, 425, 345], // Top-3 chunks → Gemini
  [255, 345, 185, 345], // Gemini → Answer
]

export default function HistoryQuestRagDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 740 410" role="img" aria-labelledby="hq-t hq-d" style={{ width: '100%', maxWidth: 740, minWidth: 540, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="hq-t">Scriptorium retrieval pipeline</title>
        <desc id="hq-d">
          A textbook chunk (indexing) and a user question (querying) both pass through one shared
          embedding model, all-MiniLM-L6-v2, into a Pinecone vector store. At query time the top
          three chunks are retrieved and Gemini 2.5 Flash writes an answer grounded in them.
        </desc>
        <defs>
          <marker id="hq-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#hq-arrow)" />
        ))}

        <Node cx={95} cy={80} w={160} h={52} title="Textbook chunk" sub="indexing" role="io" />
        <Node cx={95} cy={205} w={160} h={52} title="Question" sub="querying" role="io" />
        <Node cx={320} cy={142} w={190} h={72} title="Embedder" sub="all-MiniLM-L6-v2 · shared" role="node" emphasis />
        <Node cx={560} cy={142} w={150} h={54} title="Pinecone" sub="vector store" role="io" />
        <Node cx={560} cy={285} w={150} h={50} title="Top-3 chunks" sub="retrieved" role="io" />
        <Node cx={340} cy={345} w={170} h={54} title="Gemini" sub="2.5 Flash" role="node" />
        <Node cx={110} cy={345} w={150} h={54} title="Answer" sub="grounded in source" role="io" />

        {/* legend */}
        <g transform="translate(250 388)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>model step</text>
        </g>
        <g transform="translate(410 388)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>data in / out</text>
        </g>
      </svg>
    </div>
  )
}
