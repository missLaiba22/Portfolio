// CodeSpark AI architecture — five developer tasks behind one FastAPI router
// and one shared Gemini call.
// Prompt / Pasted code → FastAPI Router (5 endpoints) → Gemini → Raw response
// → Format result → Shown in UI.  Palette: green = model step, cream = data.

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

const edges = [
  [220, 110, 305, 165], // Prompt → Router
  [220, 250, 305, 195], // Pasted Code → Router
  [515, 180, 585, 180], // Router → Gemini
  [690, 216, 690, 309], // Gemini → Raw response
  [590, 340, 530, 380], // Raw response → Format result
  [330, 380, 250, 380], // Format result → Shown in UI
]

export default function CodeSparkFlowDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 840 470" role="img" aria-labelledby="cs-t cs-d" style={{ width: '100%', maxWidth: 840, minWidth: 600, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="cs-t">CodeSpark AI request flow</title>
        <desc id="cs-d">
          A plain-English prompt or a pasted code snippet enters a FastAPI router with five shared
          endpoints, which makes one Gemini 2.5 Flash model call. The raw generated text is formatted
          as code, text, or a list and shown in the matching Streamlit tab.
        </desc>
        <defs>
          <marker id="cs-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
        ))}

        <Node cx={120} cy={110} w={200} h={62} title="Prompt" sub="plain-English request" role="io" />
        <Node cx={120} cy={250} w={200} h={62} title="Pasted code" sub="existing snippet" role="io" />
        <Node cx={410} cy={180} w={210} h={72} title="FastAPI Router" sub="5 endpoints · shared" role="io" />
        <Node cx={690} cy={180} w={210} h={72} title="Gemini 2.5 Flash" sub="one shared model call" role="node" />
        <Node cx={690} cy={340} w={200} h={62} title="Raw response" sub="generated text" role="io" />
        <Node cx={430} cy={380} w={200} h={72} title="Format result" sub="code, text, or list" role="io" />
        <Node cx={150} cy={380} w={200} h={72} title="Shown in UI" sub="matching Streamlit tab" role="io" />

        {/* legend */}
        <g transform="translate(300 448)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>model step</text>
        </g>
        <g transform="translate(470 448)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>data in / out</text>
        </g>
      </svg>
    </div>
  )
}
