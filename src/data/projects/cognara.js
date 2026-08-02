// Cognara — an agentic research agent (LangGraph). Grounded in the repo README:
// a deliberately small two-node pipeline (research -> write) with two interfaces.
// Nothing here is inflated beyond what the project actually does.

export const cognara = {
  slug: 'cognara',
  title: 'Cognara',
  subtitle: 'A research agent that turns a topic into a sourced brief.',
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
    'Answering a research question usually means opening ten tabs, skimming each, and stitching the pieces together yourself. Cognara started as a question about that gap: could a small, well-structured agent do the searching and the stitching — and hand back something with its sources still attached?',

  // MY ROLE — solo build, so no ownership split.
  role: 'A solo learning project. I built the whole thing: the LangGraph workflow, the two graph nodes (search and synthesis), the shared graph state that carries data between them, and both front doors — a Streamlit UI and a CLI.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'Cognara is deliberately small. I built it to understand how an agentic pipeline actually fits together end to end — state, nodes, and orchestration — rather than to ship a heavy product. The narrow scope was the point, not a shortcut.',
        },
      ],
    },
    {
      label: 'The Experiment',
      blocks: [
        {
          text: 'A topic comes in from either the Streamlit UI or the CLI and runs through a two-node LangGraph. The research node queries Tavily for current web results; the writer node passes those notes to Gemini 2.5 Flash and synthesizes them. What comes back is a sourced brief — the summary together with the sources it drew from.',
        },
        {
          lead: 'The key decision — keep the graph to two nodes.',
          text: 'I kept the pipeline linear and small on purpose: research, then write. A shared state object carries the topic and the gathered notes between the two nodes, so each node does exactly one job and nothing reaches across. It is the smallest graph that still separates "find the evidence" from "write the answer" — the boundary I wanted to learn to draw cleanly.',
        },
      ],
      diagram: 'cognaraPipeline',
    },
    {
      label: 'The Challenge',
      blocks: [
        {
          lead: 'Two interfaces, one graph.',
          text: 'The Streamlit UI and the CLI are just two entry points onto the same LangGraph. Keeping the graph independent of its interface means they never drift apart — both call the same nodes over the same state, so a change to the pipeline shows up identically in the browser and the terminal.',
        },
        {
          lead: 'Where I drew the line — and what I left for later.',
          text: 'The graph is linear, not iterative: there is no retry or self-check loop yet, and the output is a single synthesized summary rather than a sectioned report. Persistence and history are not in yet either. Those are deliberate next steps, not accidents — I would rather ship a clean two-node core I fully understand than a tangled one I do not.',
        },
      ],
    },
    {
      label: 'Impact',
      blocks: [
        {
          text: 'Cognara works end to end: give it a topic, get back a summary with its sources, from either a terminal or a browser. More than the output, it is the project where the agentic pattern clicked for me — a graph of small, single-purpose nodes over one shared state — the same shape I reached for again, with far more depth, in Verdara.',
        },
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'Small on purpose beats big by accident. Building the two-node version first taught me the pattern cleanly — research, then synthesize, over one shared state — and made it obvious what the next, harder version would need.',

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
