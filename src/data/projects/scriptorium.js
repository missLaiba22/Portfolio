// Scriptorium (formerly HistoryQuest) — a retrieval-grounded (RAG) history
// chatbot, and the silent embedding bug found on rebuild. Content is the
// user's own case-study text; only aligned to the shared template.

export const scriptorium = {
  slug: 'scriptorium',
  title: 'Scriptorium',
  subtitle:
    'A retrieval-grounded history chatbot — and the silent embedding bug that broke it for two years.',
  kicker:
    'Applied AI · Retrieval-augmented generation (RAG) · Headstarter Fellowship 2024, rebuilt solo 2026',
  featured: false,
  status: 'published',
  icon: 'compass',
  cardTag: 'RAG',
  cardTagline:
    'A RAG history chatbot, rebuilt solo after finding a silent bug: the index and query sides had been embedding into different vector spaces.',
  metrics: [
    { value: 'RAG', label: 'Retrieval-grounded' },
    { value: '384-dim', label: 'MiniLM embeddings' },
    { value: '1 model', label: 'Index + query, shared' },
  ],

  // THE QUESTION
  question:
    "A world history textbook is a thousand pages of things most people would happily know and will never sit down to read. Scriptorium started as a simple question: could you put that archive behind a conversation — ask about the fall of Rome or the Silk Road and get an answer drawn from the actual source text, not the model's own memory? Aliza Yousaf and I built the first version during Headstarter's fellowship in 2024. Two years later I came back to it alone — and found that the part everything else depends on had been quietly broken the whole time.",

  // MY ROLE
  role: "First built with Aliza Yousaf during Headstarter's 2024 fellowship, then rebuilt solo in 2026. The original RAG pipeline was a joint build; the work this case study is about — diagnosing the silent embedding bug and re-architecting around a single shared embedder — is mine.",
  ownership: [
    {
      who: 'Mine (2026 rebuild)',
      items: [
        'Diagnosed the silent retrieval bug',
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
      label: 'The Experiment',
      blocks: [
        {
          text: 'The shape is a standard RAG pipeline. The textbook is split into overlapping chunks; each chunk is embedded into a vector and stored in Pinecone. At question time the query is embedded the same way, the nearest chunks are retrieved, and Gemini writes the answer using only those passages as context.',
        },
        {
          lead: 'The whole system rests on one assumption.',
          text: 'A chunk and a question about that chunk have to end up as neighbouring vectors. Everything else is plumbing around that single idea.',
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
      label: 'The Challenge',
      blocks: [
        {
          text: 'The failure never threw an error — which is exactly why it survived two years.',
        },
        {
          lead: 'A bug with no error message.',
          text: "The original pipeline didn't embed text with a single trained model. It took DistilBERT's output and pushed it through a Dense layer created fresh, with new random weights, every time the code ran. Indexing and querying are separate processes, so each got its own random projection. The same word — Babur — became one vector when the textbook was indexed and a completely different vector when a user later asked about him. Pinecone did its job perfectly; it was comparing two vectors that were never in the same space to begin with. Nothing crashed. The answers just came back subtly, then not-so-subtly, unmoored — and because Gemini writes fluently no matter what context it's handed, broken retrieval reads like a confident answer, not a bug.",
        },
        {
          lead: 'The fix: one model, one space.',
          text: "The correct design is almost embarrassingly simpler than the broken one. A sentence-embedding model like all-MiniLM-L6-v2 is already trained to place semantically similar text near each other — no projection layer to bolt on, no weights to initialize. Use that one model for indexing and querying, and a chunk and its matching question land as neighbours by design. The reason the original failed wasn't a missing feature; it was one component too many.",
        },
        {
          lead: 'Making the guarantee structural.',
          text: "Rather than trust myself to \u201cremember to use the same model in both scripts,\u201d I pulled embedding into a single shared module that both the indexing job and the live API import. Now it's impossible for the two sides to drift apart — the guarantee is enforced by the code's structure, not by discipline. Rebuilding also meant deleting and re-indexing from scratch: the old vectors lived in a meaningless space and couldn't be trusted alongside correct ones.",
        },
      ],
    },
    {
      label: 'Impact',
      blocks: [
        {
          text: "Before the correction, answers came back essentially random — related to history, unrelated to the question. After routing both sides through the same embedding space, retrieval returned passages that were actually on-topic, and the answers became grounded in the source text the way the project always intended. The improvement is qualitative rather than benchmarked, but it wasn't subtle: the system went from confidently wrong to consistently useful.",
        },
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    "The lesson wasn't about embeddings. It was that a system can fail silently while looking like it works — especially when a fluent model sits at the end of the pipeline and covers for everything upstream. The bug I was proudest to fix was one nobody, including me, had noticed for two years. Going back to old work with sharper eyes turned out to be worth more than any new feature I could have added.",

  // Live links: demo video + public GitHub repo.
  links: [
    { label: 'Demo video', url: 'https://drive.google.com/file/d/1VKHVQnuieTwcSlPViSKKnakCdS-1skdw/view?usp=sharing' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/History-Quest-RAG-Chatbot' },
  ],
}
