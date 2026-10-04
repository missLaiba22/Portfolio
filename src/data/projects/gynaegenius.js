// GynaeGenius Bot — a RAG women's-health assistant built in a 3-day Langflow
// hackathon. Content is the user's own case-study copy; aligned to the shared
// template (My Role box, ownership split, SVG diagram). The honesty note about
// the deprecated Cohere embedding model is preserved.

export const gynaegenius = {
  slug: 'gynaegenius',
  title: 'GynaeGenius Bot',
  subtitle:
    "A women's-health chatbot that answers from trusted medical sources using RAG.",
  kicker: 'Applied AI · Retrieval-augmented generation (RAG) · Langflow Hackathon 2024',
  featured: false,
  status: 'published',
  icon: 'heart',
  cardTag: 'Healthcare RAG',
  cardTagline:
    "A RAG women's-health assistant from a 3-day hackathon: WHO documents embedded into Astra DB, answered by Cohere — and prompted to defer to a real doctor.",
  metrics: [
    { value: 'RAG', label: 'Retrieval-grounded' },
    { value: 'WHO', label: 'Trusted sources' },
    { value: '3-day', label: 'Hackathon build' },
  ],

  // THE QUESTION
  question:
    'Many women hesitate to ask about gynecological and maternal health, because of limited access to care or discomfort asking. GynaeGenius answers these questions from trusted medical documents and recommends seeing a doctor when needed.',

  // MY ROLE
  role: 'Built by a team of six during the Langflow Hackathon 2024. I worked on the RAG pipeline, integrated the Langflow components, built the retrieval workflow and developed the chatbot experience.',
  ownership: [
    {
      who: 'Mine',
      items: [
        'RAG pipeline & retrieval workflow',
        'Langflow component integration',
        'Chatbot experience',
      ],
    },
    {
      who: 'Team of 6',
      items: ['Built together at the Langflow Hackathon 2024'],
    },
  ],

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: "GynaeGenius was built in three days during the hackathon. The goal was a working health assistant that answers from trusted medical documents instead of only the LLM's general knowledge.",
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: "GynaeGenius has a Streamlit frontend and a RAG pipeline built in Langflow. WHO medical documents are embedded with Cohere and stored in Astra DB. When a user asks a question, the most relevant passages are retrieved and passed to Cohere's chat model, which answers from that context.",
        },
        {
          lead: 'Supportive, not diagnostic.',
          text: 'The chatbot is instructed to recommend seeing a healthcare professional whenever the retrieved information is not enough to answer.',
        },
      ],
      diagram: 'gynaeRag',
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Working with a new platform.',
          text: 'Langflow was still early, so most problems came from the tooling: version conflicts, missing components and configuration issues. We troubleshot these throughout the hackathon, with help from the Langflow team.',
        },
        {
          lead: 'A deprecated model.',
          text: 'After the hackathon, Cohere permanently deprecated the embedding model the project used. Retrieval depends on that model, so the chatbot can no longer return grounded answers. This showed me that external AI services are a long-term maintenance risk.',
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        'Built and deployed in 3 days by a team of six.',
        'Answers grounded in WHO documents through a Langflow RAG pipeline (Cohere + Astra DB).',
        'Recommends a doctor when the retrieved context is not enough.',
        'The backend no longer works because the Cohere embedding model was deprecated.',
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'Building an AI app is not only about the pipeline. You also need a plan for when the external services it depends on change or are shut down.',

  links: [
    { label: 'Live app', url: 'https://gynaegenius-gynaebot.vercel.app/' },
    {
      label: 'Demo video',
      url: 'https://drive.google.com/file/d/1T9jGZQ4KTqiO2LwIOlbcTgFprllKUR1M/view?usp=drive_link',
    },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/gynaegenius-bot' },
  ],
}
