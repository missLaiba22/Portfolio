// Cognara — an agentic research agent (LangGraph). Grounded in the repo README:
// a deliberately small two-node pipeline (research -> write) with two interfaces.
// Nothing here is inflated beyond what the project actually does.

export const cognara = {
  slug: 'cognara',
  title: 'Cognara',
  subtitle: 'A research agent that searches the web on a topic and returns a summary with sources.',
  kicker: 'Agentic AI · LangGraph research agent · Streamlit + CLI',
  featured: false,
  status: 'published',
  icon: 'agent',
  cardTag: 'Agentic AI',
  cardTagline:
    'A LangGraph research agent — Tavily search into Gemini synthesis — returning a sourced brief from a Streamlit UI or the CLI.',
  metrics: [
    { value: '2-node', label: 'LangGraph pipeline' },
    { value: 'UI + CLI', label: 'Two interfaces' },
    { value: 'Tavily', label: 'Live web search' },
  ],

  // THE QUESTION
  question:
    'Researching a topic usually means opening many tabs, reading each one and combining the results yourself. Cognara does the searching and summarizing in one step, and keeps the sources attached to the answer.',

  // MY ROLE — solo build, so no ownership split.
  role: 'A solo learning project. I built the LangGraph workflow, its two nodes (search and summarize), the shared state that passes data between them, and both interfaces: a Streamlit UI and a CLI.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'I kept Cognara small on purpose. The goal was to understand how an agent pipeline fits together end to end (state, nodes and orchestration), not to build a large product.',
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: 'A topic comes in from the Streamlit UI or the CLI and runs through a two-node LangGraph. The research node searches the web with Tavily. The writer node sends those results to Gemini 2.5 Flash, which writes a summary. The output is the summary together with its sources.',
        },
        {
          lead: 'Key decision: two nodes, one job each.',
          text: 'The pipeline is linear: research, then write. A shared state object carries the topic and the search results between the two nodes, so each node does one job. This cleanly separates finding the information from writing the answer.',
        },
      ],
      diagram: 'cognaraPipeline',
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Supporting two interfaces.',
          text: 'The Streamlit UI and the CLI both call the same LangGraph. Because the graph does not depend on the interface, any change to the pipeline works the same way in the browser and in the terminal.',
        },
        {
          lead: 'What is not built yet.',
          text: 'The graph has no retry or self-check loop, the output is one summary rather than a sectioned report, and there is no saved history yet. I left these out on purpose to keep the first version simple and fully understood.',
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        'Works end to end: enter a topic, get a summary with its sources.',
        'Runs from both a Streamlit UI and a CLI using the same graph.',
        'Live web results through Tavily, summarized by Gemini 2.5 Flash.',
        'The same pattern (small nodes over one shared state) became the base for Verdara.',
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'Building the smallest working version first helped me understand the pattern clearly, and made it obvious what the next, bigger version would need.',

  links: [
    {
      label: 'Demo video',
      url: 'https://drive.google.com/file/d/1HrcgWz4oIuDCx2051htDIe3DG3KoBcHo/view?usp=drive_link',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/missLaiba22/Agentic-AI-Projects/tree/main/cognara',
    },
  ],
}
