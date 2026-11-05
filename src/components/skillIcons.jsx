// Icons for the Skills section.
// Tools use their official brand marks (simple-icons, bundled at build time;
// only the imported icons ship). Concepts with no brand (RAG, System Design, …)
// get a small monoline glyph in the site's forest green.
import {
  siPython,
  siTypescript,
  siFastapi,
  siReact,
  siPostgresql,
  siMongodb,
  siPytorch,
  siTensorflow,
  siLangchain,
  siHuggingface,
  siDocker,
  siAmazonwebservices,
  siGithubactions,
  siGit,
} from 'simple-icons'

// LangGraph is only in simple-icons v16+, which dropped the AWS mark, so its
// path (from simple-icons v16, CC0) is inlined here instead of upgrading.
const siLanggraph = {
  path: 'M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z',
  hex: '7FC8FF',
}

// `color` overrides a brand hex that is too light to read on the cream page.
const brands = {
  Python: { icon: siPython },
  TypeScript: { icon: siTypescript },
  FastAPI: { icon: siFastapi },
  React: { icon: siReact, color: '#087EA4' }, // react.dev's darker blue
  PostgreSQL: { icon: siPostgresql },
  MongoDB: { icon: siMongodb },
  PyTorch: { icon: siPytorch },
  TensorFlow: { icon: siTensorflow },
  LangGraph: { icon: siLanggraph, color: '#3A8FD1' },
  LangChain: { icon: siLangchain },
  'Hugging Face': { icon: siHuggingface, color: '#E0A800' },
  Docker: { icon: siDocker },
  AWS: { icon: siAmazonwebservices },
  'GitHub Actions': { icon: siGithubactions },
  Git: { icon: siGit },
}

const glyphs = {
  // pgvector has no brand mark in simple-icons: a database with a vector line.
  pgvector: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
      <path d="M9 15.5l3-4 3 2 2-3" />
    </>
  ),
  'LLM Applications': (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M9 10h6M9 13h4" />
    </>
  ),
  'RAG Systems': (
    <>
      <ellipse cx="10" cy="6" rx="6" ry="2.5" />
      <path d="M4 6v10c0 1.4 2.7 2.5 6 2.5M16 6v4" />
      <circle cx="17" cy="16" r="3" />
      <path d="M19.2 18.2L21 20" />
    </>
  ),
  'AI Agents': <path d="M12 3l1.6 4.9L18.5 9.5 13.6 11 12 16l-1.6-5L5.5 9.5l4.9-1.6L12 3z" />,
  'Computer Vision': (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'Voice Pipelines': (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </>
  ),
  'REST APIs': (
    <>
      <path d="M8 4c-2 0-2.5 1-2.5 3v2c0 1.5-1 2.5-2.5 3 1.5.5 2.5 1.5 2.5 3v2c0 2 .5 3 2.5 3" />
      <path d="M16 4c2 0 2.5 1 2.5 3v2c0 1.5 1 2.5 2.5 3-1.5.5-2.5 1.5-2.5 3v2c0 2-.5 3-2.5 3" />
    </>
  ),
  'System Design': (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1.2" />
      <rect x="3" y="16" width="6" height="5" rx="1.2" />
      <rect x="15" y="16" width="6" height="5" rx="1.2" />
      <path d="M12 8v4M6 16v-4h12v4" />
    </>
  ),
  'Event-driven Architecture': (
    <>
      <circle cx="5" cy="12" r="2.2" />
      <rect x="10" y="9.5" width="5" height="5" rx="1.2" />
      <circle cx="20" cy="5.5" r="1.8" />
      <circle cx="20" cy="18.5" r="1.8" />
      <path d="M7.2 12H10M15 11l3.6-4.2M15 13l3.6 4.2" />
    </>
  ),
}

/** Brand mark in its brand colour, or a monoline glyph in currentColor. */
export function SkillIcon({ name, size = 16, className = '' }) {
  const brand = brands[name]
  if (brand) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={brand.color || `#${brand.icon.hex}`}
        aria-hidden="true"
        className={className}
      >
        <path d={brand.icon.path} />
      </svg>
    )
  }
  const glyph = glyphs[name]
  if (!glyph) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {glyph}
    </svg>
  )
}
