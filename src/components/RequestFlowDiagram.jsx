// Modern request-flow diagram for the HealthMate architecture.
// Voice + Scan  →  FastAPI core  →  AI services  →  Response.
// Palette matches the site tokens; SVG is described for screen readers.

const C = {
  ink: '#24211d',
  muted: '#57503f',
  faint2: '#a89f8c',
  forest: '#33574a',
  forestMuted: '#93a99b',
  line: '#e3dbc9',
  card: '#fffcf7',
  band: '#efe6d4',
}

// Column x-centres and row y-centres.
const COL = { req: 95, api: 305, ai: 515, res: 705 }
const ROW = { top: 100, mid: 140, bot: 180 }
const NW = 140
const NH = 52

function Node({ cx, cy, title, sub, emphasis }) {
  return (
    <g>
      <rect
        x={cx - NW / 2}
        y={cy - NH / 2}
        width={NW}
        height={NH}
        rx="10"
        fill={emphasis ? C.band : C.card}
        stroke={emphasis ? C.forestMuted : C.line}
      />
      <text
        x={cx}
        y={sub ? cy - 3 : cy + 4}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill={C.ink}
      >
        {title}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="10"
          fill={C.faint2}
        >
          {sub}
        </text>
      )}
    </g>
  )
}

const edges = [
  // request → FastAPI
  [COL.req + NW / 2, ROW.top, COL.api - NW / 2, 128],
  [COL.req + NW / 2, ROW.bot, COL.api - NW / 2, 152],
  // FastAPI → AI services
  [COL.api + NW / 2, 128, COL.ai - NW / 2, ROW.top],
  [COL.api + NW / 2, 152, COL.ai - NW / 2, ROW.bot],
  // AI services → response
  [COL.ai + NW / 2, ROW.top, COL.res - NW / 2, ROW.top],
  [COL.ai + NW / 2, ROW.bot, COL.res - NW / 2, ROW.bot],
]

const headers = [
  { x: COL.req, label: 'Request' },
  { x: COL.api, label: 'FastAPI' },
  { x: COL.ai, label: 'AI services' },
  { x: COL.res, label: 'Response' },
]

export default function RequestFlowDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg
        viewBox="0 0 800 230"
        role="img"
        aria-labelledby="rf-title rf-desc"
        style={{ width: '100%', maxWidth: 800, minWidth: 560, height: 'auto', display: 'block', margin: '0 auto' }}
      >
        <title id="rf-title">HealthMate request flow</title>
        <desc id="rf-desc">
          A voice question and a scan upload both enter a single FastAPI core.
          The core routes voice through a Whisper, GPT-4.1 and text-to-speech
          pipeline that replies through a 3D avatar, and routes a scan to one of
          five segmentation models that returns a mask.
        </desc>

        <defs>
          <marker
            id="rf-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="6.5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.forest} />
          </marker>
        </defs>

        {/* stage headers */}
        {headers.map((h) => (
          <text
            key={h.label}
            x={h.x}
            y="18"
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="10.5"
            letterSpacing="1"
            fill={C.forest}
          >
            {h.label.toUpperCase()}
          </text>
        ))}

        {/* connectors */}
        {edges.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={C.forestMuted}
            strokeWidth="1.5"
            markerEnd="url(#rf-arrow)"
          />
        ))}

        {/* nodes */}
        <Node cx={COL.req} cy={ROW.top} title="Voice question" sub="audio in" />
        <Node cx={COL.req} cy={ROW.bot} title="Scan upload" sub="organ section" />

        <Node cx={COL.api} cy={ROW.mid} title="FastAPI core" sub="routing layer" emphasis />

        <Node cx={COL.ai} cy={ROW.top} title="Voice pipeline" sub="Whisper · GPT-4.1 · TTS" />
        <Node cx={COL.ai} cy={ROW.bot} title="Segmentation" sub="1 of 5 models" />

        <Node cx={COL.res} cy={ROW.top} title="Spoken reply" sub="3D avatar" />
        <Node cx={COL.res} cy={ROW.bot} title="Mask" sub="overlay" />
      </svg>
    </div>
  )
}
