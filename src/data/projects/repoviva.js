// RepoViva — a voice mock interview about your own GitHub repository.
// Every claim and number is taken from the repo's README, docs/architecture.md
// and docs/decisions.md (033 retrieval, 047 MP3 STT, 050 grading, 052 plan,
// 058 ingestion, 063 EC2). Personal project.

export const repoviva = {
  slug: 'repoviva',
  title: 'RepoViva',
  subtitle:
    'A voice mock interview about your own GitHub repository, graded with references to your code.',
  kicker: 'Full-stack · Voice AI · Event-driven services · Personal project',
  featured: true,
  status: 'published',
  icon: 'mic',
  cardTag: 'Voice AI',
  // Cover for the regular project card (e.g. on /projects); the home spotlight uses `gallery`.
  cover: '/projects/repoviva/card.webp',
  cardTagline:
    'Connect a GitHub repo, answer spoken questions about your own code, and get a graded report that points to your files. Four FastAPI services on AWS, connected by SQS and EventBridge.',
  // Product tour on the home-page spotlight (files in public/projects/repoviva/).
  gallery: [
    {
      src: '/projects/repoviva/landing.webp',
      caption: 'Sign in',
      alt: 'RepoViva landing page: practise explaining the code you actually wrote, with a sample spoken question.',
    },
    {
      src: '/projects/repoviva/repositories.webp',
      caption: 'Pick a repo',
      alt: 'RepoViva repositories page with a connected repository ready to practise.',
    },
    {
      src: '/projects/repoviva/interview.webp',
      caption: 'Interview',
      alt: 'RepoViva live interview: question 1 of 6 about the repository, read aloud, with a typed-answer fallback.',
    },
    {
      src: '/projects/repoviva/report.webp',
      caption: 'Get graded',
      alt: 'RepoViva interview report with correctness and clarity scores and what to work on next.',
    },
  ],
  metrics: [
    { value: '6×', label: 'Faster speech-to-text' },
    { value: '95%', label: 'Retrieval recall@5' },
    { value: '4', label: 'Services on AWS' },
  ],

  // THE QUESTION
  question:
    'Developers practise with generic interview questions, but often struggle to explain projects they built themselves. RepoViva interviews you about your own repository, out loud.',

  // MY ROLE — solo build, so no ownership split.
  role: 'Solo personal project. I built the four backend services, the React frontend and the AWS deployment, and recorded 63 design decisions in the repo’s decision log.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'You sign in with GitHub and connect a public repository. RepoViva indexes the code, plans one question for each main area, asks the questions out loud (up to 30 minutes), and then grades each answer in a report that links to your files.',
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: 'Four FastAPI services each own their own data: Core API (login, repositories, interviews), Repository Service (clone, chunk, embed), Voice Service (the live interview) and Evaluation Service (grading). Jobs travel on SQS and status updates on EventBridge. Every queue has a dead-letter queue.',
        },
        {
          lead: 'Questions are planned before the interview.',
          text: 'Code search (pgvector) and question writing (an LLM on Groq) happen before the interview starts. During the interview, the system only converts text to speech (Deepgram) and speech to text (Groq Whisper) over a WebSocket.',
        },
        {
          lead: 'Grading is tied to the code.',
          text: 'Each answer is graded against the code it was asked about, on correctness and clarity (1–5). The model cites code chunks, invalid citations are dropped, and averages are calculated in code.',
        },
      ],
      diagram: 'repovivaArchitecture',
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Slow speech-to-text.',
          text: 'Uploading raw audio made transcription slow: about 10 s for a 94-second answer. Compressing the audio to MP3 first brought this down to about 1.7 s, and the transcripts still matched 99.6%.',
        },
        {
          lead: 'Search results full of translations.',
          text: 'On a test set of 20 FastAPI questions, translated copies of the docs took 71 of the 100 top-5 search results. Excluding them raised strict recall@5 from 75% to 95%.',
        },
        {
          lead: 'Repositories stuck in progress.',
          text: 'A crashed job or a lost event could leave a repository stuck. Ingestion now always ends as ready or failed, and a failed repository can be retried.',
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        'Live on one AWS EC2 instance, from GitHub sign-in through the spoken interview to the graded report.',
        'Speech-to-text about 6× faster: ~10 s → ~1.7 s on a 94-second answer, with transcripts still matching 99.6%.',
        'Strict retrieval recall@5 raised from 75% to 95% on a FastAPI test set.',
        'Code search takes about 15 ms at p95 on a typical repository (549 chunks).',
        'Interrupted interviews still get a partial report, and raw audio is deleted after transcription.',
        "Limits: public repositories only; Groq's free tier allows one live interview at a time and about 10 reports a day.",
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'Measuring before changing things paid off: the slow speech-to-text and the weak search results both had simple causes once I measured them.',

  links: [
    { label: 'Live app', url: 'https://15-134-29-83.sslip.io/' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/RepoViva' },
    {
      label: 'Decision log',
      url: 'https://github.com/missLaiba22/RepoViva/blob/main/docs/decisions.md',
    },
  ],
}
