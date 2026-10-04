// Small monoline glyphs used on project cards instead of screenshots.
// Add a project's `icon` key in its data file; unknown/missing keys fall back
// to a neutral default so nothing ever breaks.

const glyphs = {
  // HealthMate — a pulse/heartbeat line.
  health: <path d="M3 12h3.2l1.8 4 3-8 1.9 4H21" />,
  // Agentic AI — a spark.
  agent: (
    <path d="M12 3l1.6 4.9L18.5 9.5 13.6 11 12 16l-1.6-5L5.5 9.5l4.9-1.6L12 3z" />
  ),
  // Debate tooling — two conversation bubbles.
  debate: (
    <>
      <path d="M4 5h10v7H8l-4 3V5z" />
      <path d="M10 12v2a2 2 0 0 0 2 2h5l3 2v-8a2 2 0 0 0-2-2h-2" />
    </>
  ),
  // Exploration / history — a compass.
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  // Coding assistant — angle brackets.
  code: (
    <>
      <polyline points="8 7 3 12 8 17" />
      <polyline points="16 7 21 12 16 17" />
    </>
  ),
  // Health / care — a heart.
  heart: <path d="M12 20s-7-4.5-9.2-8.4A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5.6C19 15.5 12 20 12 20z" />,
  // Marketplace — a storefront with an awning.
  shop: (
    <>
      <path d="M4 4h16l1.5 5h-19L4 4z" />
      <path d="M4 9v11h16V9" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  // Neutral default — stacked layers.
  default: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
}

export default function ProjectIcon({ name, className = '' }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {glyphs[name] || glyphs.default}
    </svg>
  )
}
