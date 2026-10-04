// CodeSpark AI — an AI coding assistant built in a 48-hour hackathon (lablab.ai),
// then revisited solo. Content is the user's own case-study copy; only aligned
// to the shared template (My Role box, ownership split, SVG diagram).

export const codespark = {
  slug: 'codespark',
  title: 'CodeSpark AI',
  subtitle:
    'An AI coding assistant for five tasks: generate, optimize, explain, debug and test code.',
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
    'Developers often switch between different tools to generate code, debug errors, understand unfamiliar code, optimize it and write tests. CodeSpark AI puts these five tasks in one assistant.',

  // MY ROLE
  role: "Built by a team of four during the lablab.ai Build Fast Ship Fast hackathon. I built the FastAPI backend, the Gemini integration and the API endpoints, and implemented features. After the hackathon, I updated the project on my own: I migrated it to Google's latest GenAI SDK, fixed configuration issues and improved the interface.",
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
          text: 'CodeSpark AI was built in 48 hours. The goal was not a full AI IDE, but a practical assistant developers could use right away for common coding tasks.',
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: 'CodeSpark AI has a Streamlit frontend and a FastAPI backend that calls Google Gemini. It covers five tasks in one app: generating code, optimizing code, explaining code, debugging errors and generating unit tests.',
        },
        {
          lead: 'One backend, five endpoints.',
          text: 'Each task has its own API endpoint, and all of them share the same backend and model call. Each feature stays independent, while the user gets one consistent app.',
        },
      ],
      diagram: 'codesparkFlow',
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Deciding what to build in 48 hours.',
          text: 'The main challenge was scope. Each feature had to be useful enough to demo and small enough to finish before the deadline. We chose FastAPI and Streamlit so we could spend the time on features instead of setup.',
        },
        {
          lead: 'Updating it after the hackathon.',
          text: "When I came back to the project, several dependencies had changed. I migrated it to Google's latest GenAI SDK, fixed configuration issues and improved the interface, while keeping the original architecture and features.",
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        'Built and deployed in 48 hours by a team of four.',
        'Five coding tasks behind one FastAPI backend and one Gemini call.',
        'Live on Streamlit as a working app, not just a prototype.',
        "Later migrated on my own to Google's latest GenAI SDK.",
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'With a tight deadline, choosing the right scope matters as much as the code. A few features that work reliably are worth more than many unfinished ones. Coming back to the project later also showed me that software needs maintenance as SDKs change.',

  links: [
    { label: 'Live demo', url: 'https://cursair-code.streamlit.app/' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/cursair-code' },
  ],
}
