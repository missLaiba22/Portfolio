// ---------------------------------------------------------------------------
// SITE CONTENT — single source of truth for everything except case studies.
//
// Every string below marked "LOCKED" is approved copy from the decisions log
// (portfolio-decisions-and-copy.md). Do not paraphrase locked copy without a
// deliberate review pass.
//
// Strings marked "TODO" are placeholders because the real value was not yet
// available (email, social links, résumé, demo URLs). Fill these in before
// publishing.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Laiba Idrees',
  role: 'Applied AI Engineer', // LOCKED — role-first, recruiters skim.

  // Hero H1. Provisional: the "hero-headline pass" is still open in the log.
  // Drawn verbatim from the opening of the locked subline, so it is not
  // invented — it just leads with the "systems" framing the log leans toward.
  headline: 'Building LLM-powered systems, end to end.',

  // LOCKED — hero subline.
  subline:
    'I build AI products from prototype to production—combining LLMs, backend engineering, and thoughtful system design into tools people can actually use. My work spans medical AI, RAG systems, voice assistants, and agentic workflows, with a focus on solving real problems rather than building demos.',
  // LOCKED — About paragraph.
  about:
    "I'm an Applied AI Engineer who builds end-to-end AI applications. I started with machine learning models, but quickly became more interested in everything around them—API design, authentication, databases, deployment, and the engineering that turns a model into a product people can rely on. That shift shaped how I approach every project. Before writing code, I spend time understanding the people and workflows the software is meant to support. HealthMate, a medical assistant I developed alongside clinical staff, went on to win 1st Prize at the COMSATS Career Expo, reinforcing my belief that good AI starts with understanding the problem, not the model. Whether I'm building RAG systems, AI assistants, or backend platforms, I'm interested in software that solves real problems. Teaching Python and AI has also made me a clearer engineer—it forces me to explain complex ideas simply and design systems that others can understand.",

  location: 'Islamabad, Pakistan',
  portfolioUrl: 'https://portfolio-laibaidrees.vercel.app/',

  // TODO — fill these in before publishing.
  email: 'laiba.idrees2003@gmail.com',
  github: 'https://github.com/missLaiba22',
  linkedin: 'https://www.linkedin.com/in/laiba-idrees/',
  resumeUrl: '#', // TODO — link a hosted résumé PDF.
}

// Skills — populated ONLY from tech actually evidenced in the HealthMate case
// study. Review and extend as more case studies are written; do not pad with
// tools you have not shipped.
export const skillCategories = [
  {
    name: 'Core Technologies',
    items: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'AI Engineering',
    items: [
      'LLM Applications',
      'RAG Systems',
      'AI Agents',
      'Prompt Engineering',
      'Computer Vision',
      'Speech AI',
    ],
  },
  {
    name: 'Foundations',
    items: ['REST APIs', 'JWT Authentication', 'System Design', 'Git'],
  },
]

// LOCKED — "Where I found direction" field note.
export const fieldNote = {
  label: 'Reflections',
  title: 'Where I Found Direction',
  body: 'I discovered that I do my best work in communities where ideas are shared freely and failure is part of the process. Through hackathons and developer communities like iCodeGuru, I found mentors, teammates, and challenges that pushed me beyond coursework. They transformed AI from something I studied into something I build.',
}

export const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#notes', label: 'Reflections' },
  { href: '/#contact', label: 'Contact' },
]
