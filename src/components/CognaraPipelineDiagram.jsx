// Cognara architecture — a two-node LangGraph research pipeline.
// Interfaces (Streamlit UI / CLI) → Topic → Research → Writer → Sourced brief.
// Palette matches the site: green = graph node, cream = data, chip = interface.

const C = {
  ink: '#24211d',
  muted: '#57503f',
  faint2: '#a89f8c',
  forest: '#33574a',
  forestMuted: '#93a99b',
  forestTag: '#e6ede7',
  line: '#e3dbc9',
  card: '#fffcf7',
  chip: '#f1ece0',
  arrow: '#a89f8c',
}

const ROLE = {
  interface: { fill: C.chip, stroke: C.line, title: C.muted, sub: C.faint2 },
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
        <text x={cx} y={cy + 13} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={s.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

function Legend({ items, y }) {
  return (
    <g>
      {items.map((it, i) => (
        <g key={it.label} transform={`translate(${it.x} ${y})`}>
          <rect width="15" height="15" rx="4" fill={it.fill} stroke={it.stroke} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>
            {it.label}
          </text>
        </g>
      ))}
    </g>
  )
}

const edges = [
  ['150', '68', '255', '125'], // Streamlit → Topic
  ['400', '68', '285', '125'], // CLI → Topic
  ['270', '171', '270', '281'], // Topic → Research
  ['270', '343', '270', '369'], // Research → Writer
  ['270', '431', '270', '475'], // Writer → Sourced brief
]

export default function CognaraPipelineDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 540 600" role="img" aria-labelledby="cg-t cg-d" style={{ width: '100%', maxWidth: 540, minWidth: 400, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="cg-t">Cognara pipeline</title>
        <desc id="cg-d">
          A topic entered from a Streamlit UI or CLI runs through a two-node LangGraph: a research
          node searches the web with Tavily, then a writer node synthesizes the notes with Gemini 2.5
          Flash, returning a sourced brief of summary plus sources.
        </desc>
        <defs>
          <marker id="cg-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {/* dashed LangGraph container */}
        <rect x="112" y="246" width="316" height="200" rx="14" fill="none" stroke={C.forestMuted} strokeDasharray="5 5" />
        <text x="126" y="270" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>
          2-node LangGraph
        </text>

        {edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#cg-arrow)" />
        ))}

        <Node cx={150} cy={44} w={170} h={48} title="Streamlit UI" role="interface" />
        <Node cx={400} cy={44} w={130} h={48} title="CLI" role="interface" />
        <Node cx={270} cy={148} w={150} h={46} title="Topic" role="io" />
        <Node cx={270} cy={312} w={250} h={62} title="Research node" sub="Tavily search" role="node" />
        <Node cx={270} cy={400} w={250} h={62} title="Writer node" sub="Gemini 2.5 Flash" role="node" />
        <Node cx={270} cy={506} w={240} h={62} title="Sourced brief" sub="summary + sources" role="io" />

        <Legend
          y={560}
          items={[
            { x: 60, label: 'interface', fill: C.chip, stroke: C.line },
            { x: 210, label: 'graph node', fill: C.forestTag, stroke: C.forestMuted },
            { x: 380, label: 'data in / out', fill: C.card, stroke: C.line },
          ]}
        />
      </svg>
    </div>
  )
}
