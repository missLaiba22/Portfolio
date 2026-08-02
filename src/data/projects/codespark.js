// CodeSpark AI — an AI coding assistant built in a 48-hour hackathon (lablab.ai),
// then revisited solo. Content is the user's own case-study copy; only aligned
// to the shared template (My Role box, ownership split, SVG diagram).

export const codespark = {
  slug: 'codespark',
  title: 'CodeSpark AI',
  subtitle:
    'Five everyday coding tasks — generate, optimize, explain, debug, test — behind one assistant.',
  kicker: 'Applied AI · AI coding assistant · lablab.ai Build Fast Ship Fast hackathon',
  featured: false,
  status: 'published',
  icon: 'code',
  cardTag: 'AI coding',
  cardTagline:
    'An AI coding assistant from a 48-hour hackathon: generate, optimize, explain, debug and test — five endpoints behind one Streamlit app.',
  metrics: [
    { value: '5', label: 'Dev tasks, one app' },
    { value: '48h', label: 'Hackathon build' },
    { value: 'Live', label: 'Deployed on Streamlit' },
  ],

  // THE QUESTION
  question:
    'Developers constantly switch between tools to generate code, debug errors, understand unfamiliar code, optimize existing solutions, and write tests. CodeSpark AI started with a simple question: could all of these common development tasks live inside one AI assistant instead of five different tools?',

  // MY ROLE
  role: "Built as a four-person team during the lablab.ai Build Fast Ship Fast hackathon. I contributed the FastAPI backend, Gemini integration, API development, and feature implementation. After the hackathon, I independently revisited the project — migrating it to Google's latest GenAI SDK, fixing configuration issues, and improving the interface for my portfolio.",
  ownership: [
    {
      who: 'Mine',
      items: [
        'FastAPI backend & API endpoints',
        'Gemini integration',
        'Solo, after: GenAI SDK migration, config fixes, UI',
      ],
    },
    {
      who: 'Team of 4',
      items: ['Built together at lablab.ai Build Fast Ship Fast'],
    },
  ],

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: "CodeSpark AI was originally built in just 48 hours. The goal wasn't to build a complete AI IDE, but to create a practical coding assistant developers could immediately use for common programming tasks.",
        },
      ],
    },
    {
      label: 'The Experiment',
      blocks: [
        {
          text: 'CodeSpark AI combines a Streamlit frontend with a FastAPI backend powered by Google Gemini. Instead of focusing on a single feature, it brings together five common developer tasks in one application: generating code, optimizing existing code, explaining unfamiliar code, debugging errors, and generating unit tests.',
        },
        {
          lead: 'One backend, five endpoints.',
          text: 'Each capability is exposed through its own API endpoint while sharing the same backend architecture. That keeps every feature independent while presenting a single, consistent experience to the user.',
        },
      ],
      diagram: 'codesparkFlow',
    },
    {
      label: 'The Challenge',
      blocks: [
        {
          lead: 'Building within 48 hours.',
          text: "The biggest challenge wasn't implementing AI — it was deciding what not to build. With limited time, every feature had to be useful enough for a live demonstration while remaining simple enough to complete before the deadline. Choosing FastAPI and Streamlit let us focus on functionality instead of infrastructure.",
        },
        {
          lead: 'Improving it after the hackathon.',
          text: "When I returned to the project later, several dependencies had changed. I migrated the application to Google's latest GenAI SDK, fixed configuration issues, and polished the interface while preserving the original architecture and functionality.",
        },
      ],
    },
    {
      label: 'Impact',
      blocks: [
        {
          text: 'CodeSpark AI was completed and deployed during the hackathon as a working application rather than a prototype. It demonstrates a complete AI-assisted development workflow — generating, optimizing, explaining, debugging, and testing code — all within a single interface.',
        },
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'Building under a strict deadline reinforced that good scope is as important as good engineering. A small set of useful features that work reliably creates far more value than trying to build everything at once. Revisiting the project later also showed me the importance of maintaining software as tools and SDKs evolve.',

  links: [
    { label: 'Live demo', url: 'https://cursair-code.streamlit.app/' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/cursair-code' },
  ],
}
