// Verdara — a multi-agent debate platform with human-in-the-loop review.
// Grounded in the repo README + architecture diagram: research/pro/con/judge
// agents on LangGraph, FastAPI + React/TS, SQLite-checkpointed pause, and a
// three-way human review (approve / opinion / reject).

export const verdara = {
  slug: 'verdara',
  title: 'Verdara',
  subtitle:
    'A multi-agent debate app: AI agents argue both sides of a question, a judge agent gives a verdict, and a person reviews it.',
  kicker: 'Agentic AI · Multi-agent debate · FastAPI + React · human-in-the-loop',
  featured: false,
  status: 'published',
  icon: 'debate',
  cardTag: 'Agentic AI',
  cardTagline:
    'A multi-agent debate platform — research, pro, con and judge agents on LangGraph — with human-in-the-loop review and state checkpointed to SQLite.',
  metrics: [
    { value: '4', label: 'Agents in the graph' },
    { value: '3', label: 'Human review outcomes' },
    { value: 'SQLite', label: 'Checkpointed state' },
  ],

  // THE QUESTION
  question:
    'A single AI answer gives a conclusion without showing the reasoning for and against it. Verdara shows both sides: agents argue for and against a question, a judge weighs them, and a person reviews the verdict before it is final.',

  // MY ROLE — solo build, so no ownership split.
  role: 'A solo build. I built the agent graph (research, pro, con and judge), the FastAPI backend and its debate-session API, the SQLite checkpointing, the human review flow, and a React + TypeScript frontend for following the debate and reviewing the verdict.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'Verdara builds on the agent pattern from Cognara. Instead of one research-then-write path, it runs a structured debate: a research agent gathers evidence, a pro and a con agent argue opposite sides, and a judge decides. The graph pauses before the verdict so a person can review it.',
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: 'A research agent gathers web evidence with Tavily. The evidence goes to two agents, one arguing for and one against. Before the verdict, the graph pauses and saves its state to SQLite. A judge agent then assesses both sides and writes a verdict, which goes to a person for review.',
        },
        {
          lead: 'Key decision: save the state, then pause for a person.',
          text: 'The graph stops right before the verdict. Saving the full state to SQLite at that point lets the run wait for a person and then resume, without losing the evidence and arguments already gathered.',
        },
        {
          lead: 'Three review options.',
          text: 'The reviewer can approve the verdict (the run completes), add an opinion (the model refines the verdict using the existing evidence), or reject it (the judge runs again).',
        },
      ],
      diagram: 'verdaraDebate',
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Making the debate useful.',
          text: 'The pro and con agents need to argue independently from the same evidence, and the judge needs to assess both sides rather than average them. I structured the graph as shared research, two separate arguments, then a separate judging step.',
        },
        {
          lead: 'Pausing and resuming reliably.',
          text: 'Human review means the run must be able to stop and continue later. I used LangGraph checkpointing to SQLite, so the pause is a saved state rather than something kept in memory.',
        },
        {
          lead: 'Keeping the code organized.',
          text: 'I split the backend into agents, services and schemas, so agent logic, orchestration and data shapes stay separate, and the FastAPI API and React frontend each use a clear interface.',
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        'Full debate runs end to end: research, pro, con and judge agents on LangGraph.',
        'Runs pause before the verdict and resume from a SQLite checkpoint.',
        'Reviewers can approve, add an opinion, or reject, and each choice follows a different path in the graph.',
        'FastAPI backend with a React + TypeScript frontend for following the debate.',
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'In multi-agent systems, the hard part is not adding agents. It is designing the points between them: where evidence is shared, where a person can step in, and how state is saved during a pause.',

  links: [
    {
      label: 'Demo video',
      url: 'https://drive.google.com/file/d/1IhKOK2Mbso8mNHYFL7GHqN_rNz3NIQVY/view?usp=drive_link',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/missLaiba22/Agentic-AI-Projects/tree/main/Verdara',
    },
  ],
}
