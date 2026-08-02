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
    'Applied AI Engineer building LLM-powered systems, end to end. I work the full stack behind the model — FastAPI backends, clean API layers, and databases in Postgres and MongoDB — with a bias toward systems that solve real problems, whatever the domain.',

  // LOCKED — About paragraph.
  about:
    "I'm an Applied AI Engineer and recent COMSATS graduate who builds LLM-powered applications end to end. I came to AI through the model, then went deeper into the backbone — clean API design, auth and sessions, proper database schemas — because I realized the model sits on top, but the backend is what actually holds an application up. My work leans toward real impact over novelty: HealthMate, an assistant I shaped with clinical staff before writing a single prompt, won 1st prize at the COMSATS Career Expo. A medical background gives my health work credibility, but my projects already span research agents, retrieval systems, and debate tooling — I'm after real problems, whatever the domain. I also teach Python and AI, which keeps me able to explain what I build as clearly as I build it.",

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
