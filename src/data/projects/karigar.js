// Karigar — a multi-vendor artisan marketplace (DevWeekend Fellowship 2026).
// Grounded in the repo's Karigar.pdf documentation, README and DECISIONS.md:
// FastAPI modular monolith, locked + server-priced checkout split per artisan,
// Stripe webhooks, pgvector RAG assistant, 100K-product load test.

export const karigar = {
  slug: 'karigar',
  title: 'Karigar',
  subtitle:
    'A marketplace where one checkout pays many artisan shops, and the last item in stock is never sold twice.',
  kicker: 'Full-stack · Multi-vendor marketplace · DevWeekend Fellowship 2026',
  featured: false,
  status: 'published',
  icon: 'shop',
  cardTag: 'Full-stack',
  cardTagline:
    'A multi-vendor marketplace for Pakistani artisans. FastAPI + PostgreSQL, one Stripe checkout split into an order per shop, and a RAG shopping assistant grounded in the live catalog.',
  metrics: [
    { value: '6', label: 'Backend modules' },
    { value: '100K', label: 'Products load-tested' },
    { value: 'Live', label: 'Vercel + Render' },
  ],

  // THE QUESTION
  question:
    "Most tutorials stop once an endpoint works. Karigar asks what it takes to build a backend with real production judgment, where money is exact, stock can't be oversold, and every user only sees what they're allowed to see. A marketplace where one customer buys from several artisan shops in a single order was a good place to find out.",

  // MY ROLE — solo build, so no ownership split.
  role: 'A solo build for the DevWeekend Fellowship 2026. I designed and built the FastAPI backend — six modules, the database schema and migrations, checkout, Stripe payments, Google sign-in, discount codes and the RAG shopping assistant — along with the React + Tailwind frontend, and deployed it on Vercel, Render and Neon. I built it with Claude as a pair, but I read and reasoned through every schema, query and pattern before accepting it, so I can explain and defend each decision.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'Karigar is a marketplace for handmade crafts. Independent artisans — potters, weavers, woodworkers, leatherworkers — each run their own shop, and a customer can buy from several shops in one order. A new artisan can only start listing products once an admin approves their shop. The main goal was not the longest feature list, but practicing system design: thinking through trade-offs, module boundaries and data flow before writing code.',
        },
      ],
    },
    {
      label: 'The Experiment',
      blocks: [
        {
          text: 'The backend is a modular monolith: one FastAPI app split into six modules — auth, artisans, products, orders, promotions and chatbot. Every module follows the same shape: router → schema → service → repository. One rule holds across all of them: repositories only flush, services commit. So a multi-step action, like creating an artisan account and their shop together, is saved as one unit — if one step fails, nothing is saved.',
        },
        {
          lead: 'The key decision — never trust the cart.',
          text: "The cart lives on the frontend, but the backend never trusts the price or stock it sends. At checkout, the server locks every product row in the cart, checks stock, recalculates the total itself and reserves the stock. Then the customer pays once on Stripe's hosted page, and the checkout is split into one order per artisan. A checkout only counts as paid when Stripe confirms it through a webhook — and if it expires unpaid, the stock is released. Artisans only ever see paid orders for their own shop.",
        },
        {
          lead: 'A shopping assistant that only knows the real catalog.',
          text: "Products are stored as embeddings in PostgreSQL with pgvector. When a customer asks a question in the chat widget, the closest products are retrieved and passed to a model on Groq, which answers only from them — so it can't invent a product. Replies stream word by word over a WebSocket.",
        },
      ],
      diagram: 'karigarCheckout',
    },
    {
      label: 'The Challenge',
      blocks: [
        {
          lead: 'Two customers, one last item.',
          text: 'Two customers could both read the last unit in stock at the same time, both pass the check, and both buy it. The fix was to lock the product rows before checking stock, not after — locking after the check leaves the same gap open. The lock covers only the rows being bought, so normal browsing is never blocked.',
        },
        {
          lead: 'Deep pages got slower and slower.',
          text: "I seeded 100,000 fake products to see how the catalog held up. The bottleneck wasn't React — it was how the list endpoint read the database. Reading the first 100 rows took about 3 ms, but 100 rows at offset 50,000 took about 43 ms, because the database walks past every earlier row first. The public feed moved to cursor (keyset) pagination, which jumps straight to the next rows at any depth. The artisan dashboard kept offset pagination, because owners filter results and want real page numbers.",
        },
        {
          lead: "Production bugs that weren't what they looked like.",
          text: "CORS failures looked like a config problem, but the latest code simply hadn't redeployed — a temporary debug endpoint that showed the live config exposed it instead of guessing. The embedding model crashed Render's free tier on startup, so I called the same model through the Hugging Face Inference API instead; because it was the same model, the stored vectors didn't have to change. And when Neon dropped idle connections, connection health checks fixed it.",
        },
      ],
    },
    {
      label: 'Impact',
      blocks: [
        {
          text: 'Karigar is live and works end to end for all three roles: artisans sign up, get approved, list products and see their own paid orders; customers buy from several shops in one Stripe payment; and the assistant answers from the real catalog. More than any one feature, it is where I practiced thinking like a backend engineer — Numeric instead of float for money, price snapshots on every order so old receipts stay correct, soft deletes so past orders never break, and clear 403 / 404 / 409 errors instead of one generic failure.',
        },
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'A working endpoint is not the same as a correct one. The real work was in what could go wrong — two people buying the last item, a payment that never finishes, a page that quietly gets slow. Using AI to build faster only helped because I stopped to understand every decision before accepting it.',

  links: [
    { label: 'Live app', url: 'https://karigar-marketplace.vercel.app/' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/artisan-marketplace' },
    {
      label: 'Technical report',
      url: 'https://github.com/missLaiba22/artisan-marketplace/blob/main/Karigar.pdf',
    },
  ],
}
