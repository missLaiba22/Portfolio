// Verdara — a multi-agent debate platform with human-in-the-loop review.
// Grounded in the repo README + architecture diagram: research/pro/con/judge
// agents on LangGraph, FastAPI + React/TS, SQLite-checkpointed pause, and a
// three-way human review (approve / opinion / reject).

export const verdara = {
  slug: 'verdara',
  title: 'Verdara',
  subtitle: 'A multi-agent debate that argues both sides, then lets a human have the last word.',
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
    'A single AI answer hides its own uncertainty — it hands you a conclusion without showing you the argument. Verdara asks a different question: what if you could watch a case get argued for and against, have a judge weigh both sides, and still keep a human in the loop before anything counts as final?',

  // MY ROLE — solo build, so no ownership split.
  role: 'A solo build. I designed and built the agent graph — research, pro, con and judge — the FastAPI backend and its debate-session API, the SQLite-checkpointed state, and the human-in-the-loop review flow, with a React + TypeScript frontend for watching the debate and ruling on the verdict.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'Verdara is the second, deeper cut of the agentic pattern I first built in Cognara. Instead of one research-then-write path, it runs a structured debate: a research agent gathers evidence, a pro and a con agent argue opposite sides, and a judge weighs them — with a deliberate pause so a person can review the verdict before it is final.',
        },
      ],
    },
    {
      label: 'The Experiment',
      blocks: [
        {
          text: 'A question enters and a research agent gathers web evidence with Tavily. That evidence fans out to two agents — one arguing in favour, one against. Before any verdict is written, the graph pauses and checkpoints its state to SQLite. A judge agent then assesses both sides and writes a verdict, which goes to a human for review.',
        },
        {
          lead: 'The key decision — checkpoint the state, then pause for a human.',
          text: 'The verdict is the moment that matters, so the graph stops right before it. Checkpointing the full state to SQLite at that pause is what makes human-in-the-loop actually work: the run can halt, wait for a person, and resume — or replay — without losing the evidence and arguments it already built.',
        },
        {
          lead: 'Three ways for a human to respond.',
          text: 'At review, a person can approve (the verdict stands and the run completes), give an opinion (which feeds back to the model to refine the verdict while keeping the existing evidence), or reject (which re-runs the judge). One review step, three genuinely different paths through the graph.',
        },
      ],
      diagram: 'verdaraDebate',
    },
    {
      label: 'The Challenge',
      blocks: [
        {
          lead: 'Orchestrating agents that disagree on purpose.',
          text: 'Pro and con only produce a useful debate if they argue independently over the same evidence, and the judge only adds value if it assesses both rather than splitting the difference. Getting that structure right — shared research, opposed arguments, a separate assessment step — was the core of the design.',
        },
        {
          lead: 'Making "pause" a first-class state, not a hack.',
          text: 'A human-review step means the system has to be pausable and resumable by design. Leaning on LangGraph checkpointing to SQLite let the pause be a real, durable state rather than something bolted on — the difference between a demo and a flow you can actually step away from and come back to.',
        },
        {
          lead: 'Keeping the pieces separable.',
          text: 'Splitting the codebase into agents, services and schemas kept the agent logic, the orchestration, and the data shapes from bleeding into each other — so the FastAPI API and the React frontend each talk to a clean boundary.',
        },
      ],
    },
    {
      label: 'Impact',
      blocks: [
        {
          text: 'Verdara is a working debate platform you can run end to end: ask a question, watch it argued both ways, and rule on the verdict yourself. It is where the agentic pattern grew up for me — from Cognara\u2019s linear two-node graph to a branching, pausable, multi-agent flow with durable state and human oversight.',
        },
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'The hard part of agentic systems is not adding more agents — it is the seams between them: where evidence is shared, where a human can step in, and where state has to survive a pause. Verdara is where I learned to design those seams first.',

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
