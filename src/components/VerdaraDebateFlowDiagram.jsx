// Verdara architecture — a multi-agent debate with human-in-the-loop review.
// Question → Research → Pro/Con → Pause (SQLite checkpoint) → Judge → Human review
// → Approve / Give opinion (→ Refine) / Reject (re-runs Judge) → Final verdict.
// Palette (site theme): green = model step, gold = pause / human decision, white = start/end.

const C = {
  ink: '#1c2622',
  muted: '#4b5a53',
  muted2: '#3e4b45',
  faint: '#6c7b74',
  faint2: '#8a9a92',
  forest: '#33574a',
  forestMuted: '#93a99b',
  forestTag: '#e6ede7',
  // human-decision steps use the theme's gold accent (gold-soft fill, gold border)
  band: '#f4ead6',
  bandBorder: '#d4b47c',
  goldText: '#7a5a22',
  line: '#dce6df',
  card: '#ffffff',
  arrow: '#8a9a92',
}

const ROLE = {
  node: { fill: C.forestTag, stroke: C.forestMuted, title: C.forest, sub: C.forestMuted },
  human: { fill: C.band, stroke: C.bandBorder, title: C.goldText, sub: C.faint },
  io: { fill: C.card, stroke: C.line, title: C.ink, sub: C.faint2 },
}

function Node({ cx, cy, w, h, title, sub, role }) {
  const s = ROLE[role]
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="10" fill={s.fill} stroke={s.stroke} />
      <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="600" fill={s.title}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={cy + 13} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" fill={s.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

// Straight connectors (x1,y1,x2,y2).
const lines = [
  [360, 68, 360, 119], // Question → Research
  [360, 181, 205, 239], // Research → Pro
  [360, 181, 515, 239], // Research → Con
  [190, 301, 320, 359], // Pro → Pause
  [530, 301, 400, 359], // Con → Pause
  [360, 421, 360, 474], // Pause → Judge
  [360, 536, 360, 585], // Judge → Human review
  [360, 635, 150, 684], // Human review → Approve
  [360, 635, 360, 684], // Human review → Give opinion
  [360, 635, 575, 684], // Human review → Reject
  [360, 746, 360, 794], // Give opinion → Refine
  [360, 856, 360, 879], // Refine → Final verdict
]

// Elbow connectors (polyline point strings).
const elbows = [
  '140,746 140,905 250,905', // Approve → Final verdict
  '685,715 702,715 702,505 495,505', // Reject → re-runs Judge
]

export default function VerdaraDebateFlowDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 720 990" role="img" aria-labelledby="vd-t vd-d" style={{ width: '100%', maxWidth: 640, minWidth: 460, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="vd-t">Verdara debate flow</title>
        <desc id="vd-d">
          A question is researched by a research agent, then argued by a pro agent and a con agent.
          The graph pauses and checkpoints its state to SQLite before a judge writes a verdict. A
          human reviews it and can approve (verdict stands), give an opinion (which refines the
          verdict while keeping evidence), or reject (which re-runs the judge). The flow ends at a
          final verdict.
        </desc>
        <defs>
          <marker id="vd-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#vd-arrow)" />
        ))}
        {elbows.map((pts, i) => (
          <polyline key={i} points={pts} fill="none" stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#vd-arrow)" />
        ))}

        {/* loop label */}
        <text x={628} y={476} textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11.5" fill={C.faint}>
          reject re-runs judge
        </text>

        <Node cx={360} cy={44} w={170} h={48} title="Question" role="io" />
        <Node cx={360} cy={150} w={250} h={62} title="Research agent" sub="Tavily web evidence" role="node" />
        <Node cx={190} cy={270} w={230} h={62} title="Pro agent" sub="Argues in favour" role="node" />
        <Node cx={530} cy={270} w={230} h={62} title="Con agent" sub="Argues against" role="node" />
        <Node cx={360} cy={390} w={320} h={62} title="Pause before verdict" sub="state checkpointed to SQLite" role="human" />
        <Node cx={360} cy={505} w={270} h={62} title="Judge writes verdict" sub="assesses pro and con" role="node" />
        <Node cx={360} cy={610} w={210} h={50} title="Human review" role="human" />
        <Node cx={140} cy={715} w={200} h={62} title="Approve" sub="verdict stands" role="human" />
        <Node cx={360} cy={715} w={210} h={62} title="Give opinion" sub="feeds back to LLM" role="human" />
        <Node cx={585} cy={715} w={200} h={62} title="Reject" sub="re-runs judge" role="human" />
        <Node cx={360} cy={825} w={220} h={62} title="Refine verdict" sub="keeps evidence" role="node" />
        <Node cx={360} cy={905} w={220} h={52} title="Final verdict" sub="completed" role="io" />

        {/* legend */}
        <g transform="translate(90 962)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12.5" fill={C.muted}>model step</text>
        </g>
        <g transform="translate(280 962)">
          <rect width="15" height="15" rx="4" fill={C.band} stroke={C.bandBorder} />
          <text x="22" y="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12.5" fill={C.muted}>pause / human decision</text>
        </g>
        <g transform="translate(540 962)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12.5" fill={C.muted}>start / end</text>
        </g>
      </svg>
    </div>
  )
}
