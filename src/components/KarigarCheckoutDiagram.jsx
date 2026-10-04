// Karigar multi-vendor checkout — the server never trusts the cart.
// Cart → POST /orders/checkout (lock rows, recompute total) → Reserve stock
// → Stripe hosted checkout → Stripe webhook → paid: one order per artisan,
// expired: stock released.  Palette: green = server step, cream = data / external.

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
  [220, 100, 295, 100], // Cart → Checkout
  [520, 100, 595, 100], // Checkout → Reserve stock
  [700, 136, 700, 199], // Reserve stock → Stripe checkout
  [600, 240, 525, 240], // Stripe checkout → Webhook
  [450, 276, 520, 339], // Webhook → Order per artisan (paid)
  [370, 276, 300, 339], // Webhook → Stock released (expired)
]

export default function KarigarCheckoutDiagram() {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream/40 p-4 sm:p-6">
      <svg viewBox="0 0 840 470" role="img" aria-labelledby="kg-t kg-d" style={{ width: '100%', maxWidth: 840, minWidth: 600, height: 'auto', display: 'block', margin: '0 auto' }}>
        <title id="kg-t">Karigar multi-vendor checkout flow</title>
        <desc id="kg-d">
          A cart with items from many shops is sent to the checkout endpoint, which locks the product
          rows and recomputes the total on the server, then reserves stock. The customer pays once on
          Stripe's hosted page. A signed Stripe webhook then either marks the checkout paid, creating one
          order per artisan, or, if the checkout expired unpaid, releases the reserved stock.
        </desc>
        <defs>
          <marker id="kg-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={C.arrow} />
          </marker>
        </defs>

        {edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth="1.5" markerEnd="url(#kg-arrow)" />
        ))}

        {/* branch labels */}
        <text x={500} y={300} fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={C.muted}>paid</text>
        <text x={290} y={300} textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={C.muted}>expired</text>

        <Node cx={120} cy={100} w={200} h={72} title="Cart" sub="items from many shops" role="io" />
        <Node cx={410} cy={100} w={220} h={72} title="POST /orders/checkout" sub="lock rows · recompute total" role="node" />
        <Node cx={700} cy={100} w={200} h={72} title="Reserve stock" sub="held until paid or expired" role="node" />
        <Node cx={700} cy={240} w={200} h={72} title="Stripe checkout" sub="hosted page · one charge" role="io" />
        <Node cx={410} cy={240} w={220} h={72} title="Stripe webhook" sub="signature verified" role="node" />
        <Node cx={570} cy={380} w={220} h={72} title="Order per artisan" sub="paid · artisan can see it" role="node" />
        <Node cx={250} cy={380} w={220} h={72} title="Stock released" sub="checkout expired unpaid" role="io" />

        {/* legend */}
        <g transform="translate(300 448)">
          <rect width="15" height="15" rx="4" fill={C.forestTag} stroke={C.forestMuted} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>server step</text>
        </g>
        <g transform="translate(470 448)">
          <rect width="15" height="15" rx="4" fill={C.card} stroke={C.line} />
          <text x="22" y="12" fontFamily="Inter, sans-serif" fontSize="12.5" fill={C.muted}>data / external</text>
        </g>
      </svg>
    </div>
  )
}
