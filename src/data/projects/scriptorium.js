// Scriptorium (formerly HistoryQuest) — a retrieval-grounded (RAG) history
// chatbot, and the embedding bug found on rebuild. Content is the user's own
// case-study text, rewritten in plain language; aligned to the shared template.

export const scriptorium = {
  slug: 'scriptorium',
  title: 'Scriptorium',
  subtitle:
    'A history chatbot that answers from a textbook using RAG, and the retrieval bug I found and fixed when I rebuilt it.',
  kicker:
    'Applied AI · Retrieval-augmented generation (RAG) · Headstarter Fellowship 2024, rebuilt solo 2026',
  featured: false,
  status: 'published',
  icon: 'compass',
  cardTag: 'RAG',
  cardTagline:
    'A RAG history chatbot, rebuilt solo after I found that indexing and querying had been embedding text into different vector spaces.',
  metrics: [
    { value: 'RAG', label: 'Retrieval-grounded' },
    { value: '384-dim', label: 'MiniLM embeddings' },
    { value: '1 model', label: 'Index + query, shared' },
  ],

  // THE QUESTION
  question:
    "A world history textbook is long, and most people won't read it cover to cover. Scriptorium lets you ask questions about it, like the fall of Rome or the Silk Road, and answers from the actual textbook rather than the model's general knowledge. Aliza Yousaf and I built the first version in Headstarter's 2024 fellowship. When I rebuilt it alone in 2026, I found that retrieval had never worked correctly.",

  // MY ROLE
  role: "First built with Aliza Yousaf during Headstarter's 2024 fellowship, then rebuilt solo in 2026. The original RAG pipeline was a joint build. Finding the embedding bug and rebuilding around a single shared embedding model was my work.",
  ownership: [
    {
      who: 'Mine (2026 rebuild)',
      items: [
        'Diagnosed the retrieval bug',
        'Single shared embedding module',
        'Re-architecture & full re-index',
      ],
    },
    {
      who: 'With Aliza (2024)',
      items: ['Original RAG pipeline', 'First Scriptorium version'],
    },
  ],

  sections: [
    {
      label: 'How it works',
      blocks: [
        {
          text: 'Scriptorium is a standard RAG pipeline. The textbook is split into overlapping chunks. Each chunk is converted into a vector (embedded) and stored in Pinecone. When a user asks a question, the question is embedded the same way, the closest chunks are retrieved, and Gemini writes the answer using only those passages.',
        },
        {
          lead: 'What it depends on.',
          text: 'For retrieval to work, a chunk and a question about it must be embedded into nearby vectors. That only happens if both are embedded by the same model.',
        },
      ],
      diagram: 'historyQuestRag',
      stack: [
        { label: 'Backend', value: 'FastAPI · Uvicorn · deployed on Render' },
        {
          label: 'Retrieval',
          value: 'Pinecone (serverless, cosine) · all-MiniLM-L6-v2 embeddings (384-dim, normalized)',
        },
        {
          label: 'Ingestion',
          value: 'LangChain PyPDFLoader + RecursiveCharacterTextSplitter · tiktoken length function',
        },
        { label: 'Generation', value: 'Gemini 2.5 Flash' },
      ],
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'The bug: indexing and querying used different vector spaces.',
          text: "The original code passed DistilBERT's output through a Dense layer that was created with new random weights every time the code ran. Indexing and querying run as separate processes, so each one used a different random projection. The same text, for example the name Babur, became one vector during indexing and a completely different vector at query time. Pinecone was comparing vectors that were never in the same space. Nothing crashed, and because Gemini writes fluent answers from any context, the wrong results looked like real answers.",
        },
        {
          lead: 'The fix: one model for both sides.',
          text: 'I replaced the custom setup with all-MiniLM-L6-v2, a sentence-embedding model already trained to place similar text close together. It needs no extra projection layer. Using the same model for indexing and querying puts a chunk and its matching question close together.',
        },
        {
          lead: 'Preventing it from happening again.',
          text: 'I moved embedding into one shared module that both the indexing script and the live API import, so the two sides cannot use different models. I also deleted the old vectors and re-indexed the whole textbook, because the old vectors could not be mixed with correct ones.',
        },
      ],
    },
    {
      label: 'Results',
      blocks: [
        {
          text: 'The improvement was checked by hand, not benchmarked, but the difference was clear.',
        },
      ],
      bullets: [
        'Before the fix, answers were about history but not about the question asked. After the fix, retrieved passages matched the question and answers came from the textbook.',
        'Found and fixed a retrieval bug that had been in the project since 2024.',
        'One shared embedding module (all-MiniLM-L6-v2, 384-dim) used for both indexing and querying.',
        'Full re-index of the textbook into Pinecone.',
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'A RAG system can look like it works while retrieval is broken, because the LLM still writes fluent answers. I now check the retrieved passages directly instead of judging by the final answer, and I revisit old projects with what I know now.',

  // Live links: demo video + public GitHub repo.
  links: [
    { label: 'Demo video', url: 'https://drive.google.com/file/d/1VKHVQnuieTwcSlPViSKKnakCdS-1skdw/view?usp=sharing' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/History-Quest-RAG-Chatbot' },
  ],
}
