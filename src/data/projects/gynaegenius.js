// GynaeGenius Bot — a RAG women's-health assistant built in a 3-day Langflow
// hackathon. Content is the user's own case-study copy; aligned to the shared
// template (My Role box, ownership split, SVG diagram). The honesty note about
// the deprecated Cohere embedding model is preserved as written.

export const gynaegenius = {
  slug: 'gynaegenius',
  title: 'GynaeGenius Bot',
  subtitle:
    "A retrieval-grounded women's-health assistant that answers only from trusted medical sources.",
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
    'Many women hesitate to discuss sensitive gynecological and maternal health concerns because of limited access to healthcare or discomfort seeking medical advice. GynaeGenius started with a simple question: could a Retrieval-Augmented Generation chatbot provide medically grounded answers from trusted sources while encouraging users to seek professional care when needed?',

  // MY ROLE
  role: 'Built as part of a six-person team during the Langflow Hackathon 2024. I contributed to building the RAG pipeline, integrating Langflow components, implementing the retrieval workflow, and developing the chatbot experience.',
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
          text: "GynaeGenius was developed in just three days during the hackathon. The objective was to build a working healthcare assistant that answered questions using trusted medical documents instead of relying solely on an LLM's general knowledge.",
        },
      ],
    },
    {
      label: 'The Experiment',
      blocks: [
        {
          text: "GynaeGenius combines a Streamlit frontend with a Langflow-based RAG pipeline. Medical reference documents from the WHO are converted into embeddings using Cohere, stored in Astra DB, and retrieved whenever a user asks a question. The retrieved passages are then passed to Cohere's chat model, which generates answers grounded in the provided medical context rather than its own memory.",
        },
        {
          lead: 'Supportive, not diagnostic.',
          text: 'The chatbot is also instructed to recommend consulting a healthcare professional whenever the retrieved information is insufficient — keeping the system supportive rather than diagnostic.',
        },
      ],
      diagram: 'gynaeRag',
    },
    {
      label: 'The Challenge',
      blocks: [
        {
          lead: 'Building on a new platform.',
          text: 'Langflow was still in its early stages, so much of the challenge came from tooling rather than application logic. Version conflicts, missing components, and configuration issues required frequent troubleshooting throughout the hackathon — while the Langflow team actively helped participants resolve platform issues.',
        },
        {
          lead: 'A dependency that disappeared.',
          text: 'After the hackathon, the project stopped functioning because the Cohere embedding model it relied on was permanently deprecated. Since retrieval depended on that model, the chatbot could no longer return grounded responses — a reminder that external AI services can become long-term maintenance risks.',
        },
      ],
    },
    {
      label: 'Impact',
      blocks: [
        {
          text: 'The project was completed and deployed during the hackathon as a working RAG healthcare assistant. It demonstrated how trusted medical documents could be combined with retrieval and generation to give more reliable responses than a standalone language model.',
        },
        {
          text: 'Although the backend no longer functions due to the deprecated embedding model, the project remains an important learning experience in building retrieval-based AI systems under tight time constraints.',
        },
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'Building AI applications is not only about designing the pipeline — it also means planning for the lifecycle of the services those pipelines depend on. GynaeGenius taught me the value of retrieval-grounded AI, while also showing how external model dependencies can affect the long-term reliability of a deployed system.',

  links: [
    { label: 'Live app', url: 'https://gynaegenius-gynaebot.vercel.app/' },
    {
      label: 'Demo video',
      url: 'https://drive.google.com/file/d/1T9jGZQ4KTqiO2LwIOlbcTgFprllKUR1M/view?usp=drive_link',
    },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/gynaegenius-bot' },
  ],
}
