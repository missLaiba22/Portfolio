// RepoViva system architecture — four FastAPI services on one EC2 instance.
// React SPA → Caddy (HTTPS) → Core API (REST) / Voice Service (WebSocket);
// services exchange jobs on SQS and events on EventBridge; Postgres + pgvector
// (Neon) and MongoDB (Atlas); external APIs: GitHub, Voyage AI, Groq, Deepgram.
// Palette matches KarigarArchitectureDiagram: green = service, white = client / data / external.

const C = {
  ink: '#1c2622',
  muted: '#4b5a53',
  faint2: '#8a9a92',
  forest: '#33574a',
  forestMuted: '#93a99b',
  forestTag: '#e6ede7',
  line: '#dce6df',
  card: '#ffffff',
  arrow: '#8a9a92',
}

const ROLE = {
  node: { fill: C.forestTag, stroke: C.forestMuted, title: C.forest, sub: C.forestMuted },
  io: { fill: C.card, stroke: C.line, title: C.ink, sub: C.faint2 },
}

const MONO = "'JetBrains Mono', monospace"
const SANS = "'Plus Jakarta Sans', sans-serif"

function Node({ cx, cy, w, h, title, sub, role }) {
  const s = ROLE[role]
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="10" fill={s.fill} stroke={s.stroke} />
      <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" fontFamily={SANS} fontSize="13" fontWeight="600" fill={s.title}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={s.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

// Two rows of services with the messaging band between them.
const ROW1 = 226
const BAND = 290
const ROW2 = 354
const LEFT = 165
const RIGHT = 435

const services = [
  { cx: LEFT, cy: ROW1, title: 'Core API', sub: 'GitHub login · interviews · tokens' },
  { cx: RIGHT, cy: ROW1, title: 'Voice Service', sub: 'plan questions · live TTS / STT' },
  { cx: LEFT, cy: ROW2, title: 'Repository Service', sub: 'clone · chunk · embed · search' },
  { cx: RIGHT, cy: ROW2, title: 'Evaluation Service', sub: 'grade answers · reports' },
]

const externals = [
  { cy: 150, title: 'GitHub', sub: 'OAuth · clone repo' },
  { cy: 226, title: 'Voyage AI', sub: 'code embeddings' },
  { cy: 290, title: 'Groq', sub: 'plan · grade · Whisper STT' },
  { cy: 354, title: 'Deepgram', sub: 'Aura-2 text-to-speech' },
]

export default function RepoVivaArchitectureDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 840 625" role="img" aria-labelledby="rv-t rv-d" style={{ width: '100%', maxWidth: 840, minWidth: 600, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="rv-t">RepoViva system architecture</title>
        <desc id="rv-d">
          A React single-page app reaches one AWS EC2 instance over HTTPS. Caddy routes REST calls to
          Core API and the interview WebSocket to Voice Service. Four FastAPI services run on the
          instance: Core API, Voice Service, Repository Service and Evaluation Service. They send jobs
          over SQS and events over EventBridge, with a dead-letter queue on every queue, and query each
          other over HMAC-signed HTTP. Repository data and reports live in PostgreSQL with pgvector on
          Neon; interview sessions live in MongoDB Atlas. The services call GitHub, Voyage AI for
          embeddings, Groq for planning, grading and Whisper speech-to-text, and Deepgram for
          text-to-speech.
        </desc>
        <defs>
          <marker id="rv-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {/* browser → EC2 */}
        <line x1={300} y1={66} x2={300} y2={123} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#rv-arrow)" />
        <text x={310} y={100} fontFamily={MONO} fontSize="10.5" fill={C.muted}>HTTPS</text>

        {/* EC2 container */}
        <rect x={20} y={86} width={560} height={318} rx="14" fill="none" stroke={C.forestMuted} />
        <text x={36} y={108} fontFamily={SANS} fontSize="13.5" fontWeight="600" fill={C.forest}>
          One EC2 instance · Docker Compose
        </text>

        {/* Caddy → Core API (REST) and Voice (WebSocket) */}
        <line x1={250} y1={174} x2={188} y2={199} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#rv-arrow)" />
        <text x={198} y={182} textAnchor="end" fontFamily={MONO} fontSize="10.5" fill={C.muted}>REST</text>
        <line x1={350} y1={174} x2={412} y2={199} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#rv-arrow)" />
        <text x={402} y={182} fontFamily={MONO} fontSize="10.5" fill={C.muted}>WebSocket</text>

        {/* services ↔ messaging band */}
        {[LEFT, RIGHT].map((x) => (
          <g key={x}>
            <line x1={x} y1={ROW1 + 25} x2={x} y2={BAND - 22} stroke={C.forestMuted} strokeWidth="1.5" />
            <line x1={x} y1={BAND + 22} x2={x} y2={ROW2 - 25} stroke={C.forestMuted} strokeWidth="1.5" />
          </g>
        ))}
        <rect x={40} y={BAND - 22} width={520} height={44} rx="10" fill={C.card} stroke={C.forestMuted} strokeDasharray="5 4" />
        <text x={300} y={BAND - 3} textAnchor="middle" fontFamily={SANS} fontSize="12.5" fontWeight="600" fill={C.forest}>
          SQS jobs · EventBridge events
        </text>
        <text x={300} y={BAND + 13} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={C.faint2}>
          DLQ on every queue · HMAC-signed HTTP for queries
        </text>

        {/* EC2 → external APIs (dashed) */}
        {externals.map((e) => (
          <line key={e.title} x1={582} y1={e.cy} x2={633} y2={e.cy} stroke={C.arrow} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#rv-arrow)" />
        ))}

        {/* Repository Service → Postgres; Voice Service → MongoDB */}
        <line x1={LEFT} y1={ROW2 + 25} x2={LEFT} y2={497} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#rv-arrow)" />
        <path d={`M${RIGHT + 125} ${ROW1} H570 V530 H554`} fill="none" stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#rv-arrow)" />

        <Node cx={300} cy={40} w={260} h={52} title="React SPA" sub="Vite + TypeScript · served by Caddy" role="io" />
        <Node cx={300} cy={150} w={300} h={48} title="Caddy" sub="HTTPS · /v1/* and /v1/ws/* routing" role="io" />
        {services.map((s) => (
          <Node key={s.title} cx={s.cx} cy={s.cy} w={250} h={50} title={s.title} sub={s.sub} role="node" />
        ))}
        {externals.map((e) => (
          <Node key={e.title} cx={740} cy={e.cy} w={190} h={48} title={e.title} sub={e.sub} role="io" />
        ))}
        <Node cx={180} cy={530} w={280} h={60} title="PostgreSQL + pgvector" sub="Neon · each service owns its tables" role="io" />
        <Node cx={445} cy={530} w={210} h={60} title="MongoDB" sub="Atlas · interview sessions" role="io" />

        {/* legend */}
        <g transform="translate(170 598)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily={SANS} fontSize="12.5" fill={C.muted}>service</text>
        </g>
        <g transform="translate(270 598)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily={SANS} fontSize="12.5" fill={C.muted}>client / data / external</text>
        </g>
        <g transform="translate(470 598)">
          <line x1="0" y1="8" x2="22" y2="8" stroke={C.arrow} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="30" y="12" fontFamily={SANS} fontSize="12.5" fill={C.muted}>external API call</text>
        </g>
      </svg>
    </div>
  )
}
