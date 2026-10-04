// Karigar — a multi-vendor artisan marketplace (DevWeekend Fellowship 2026).
// Grounded in the repo's Karigar.pdf documentation, README and DECISIONS.md:
// FastAPI modular monolith, locked + server-priced checkout split per artisan,
// Stripe webhooks, pgvector RAG assistant, 100K-product load test.

export const karigar = {
  slug: 'karigar',
  title: 'Karigar',
  subtitle:
    'A multi-vendor marketplace where customers buy from several artisan shops in one checkout.',
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
    'A marketplace with many sellers has to get the hard parts right: prices must be exact, stock must not be oversold, and each user must only see their own data. I built Karigar to practice building a backend that handles these correctly, not just endpoints that return data.',

  // MY ROLE — solo build, so no ownership split.
  role: 'A solo build for the DevWeekend Fellowship 2026. I designed and built the FastAPI backend (six modules, database schema and migrations, checkout, Stripe payments, Google sign-in, discount codes and the RAG shopping assistant) and the React + Tailwind frontend, and deployed it on Vercel, Render and Neon. I used Claude as a coding partner, and reviewed every schema, query and pattern before accepting it, so I can explain each decision.',

  sections: [
    {
      label: 'Context',
      blocks: [
        {
          text: 'Karigar is a marketplace for handmade crafts. Artisans (potters, weavers, woodworkers, leatherworkers) each run their own shop, and a customer can buy from several shops in one order. New artisans can list products only after an admin approves their shop. My main goal was to practice system design: thinking through trade-offs, module boundaries and data flow before writing code.',
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: 'The backend is one FastAPI app split into six modules: auth, artisans, products, orders, promotions and chatbot. Each module follows the same structure: router → schema → service → repository. Repositories only flush; services commit. This means a multi-step action, like creating an artisan account and their shop, is saved as one transaction: if one step fails, nothing is saved.',
        },
        {
          lead: 'Key decision: the server never trusts the cart.',
          text: "The cart is stored in the browser, but the backend ignores the prices and stock it sends. At checkout, the server locks the product rows, checks stock, recalculates the total and reserves the stock. The customer pays once on Stripe's hosted page, and the checkout is split into one order per artisan. An order is marked paid only when Stripe confirms it through a webhook. If the payment expires, the reserved stock is released. Artisans only see paid orders for their own shop.",
        },
        {
          lead: 'Shopping assistant grounded in the catalog.',
          text: 'Product and shop data are stored as embeddings in PostgreSQL with pgvector. When a customer asks a question, the closest products are retrieved and sent to an LLM on Groq, which answers only from those products. Replies stream word by word over a WebSocket.',
        },
      ],
      diagram: 'karigarArchitecture',
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Preventing overselling.',
          text: 'Two customers could read the last item in stock at the same time and both buy it. I fixed this by locking the product rows before checking stock (locking after the check leaves the same gap). Only the rows being bought are locked, so browsing is not affected.',
        },
        {
          lead: 'Slow pages deep in the catalog.',
          text: "I loaded 100,000 test products to check performance. The slow part was the database query, not React. With offset pagination, the first 100 rows took about 3 ms, but 100 rows at offset 50,000 took about 43 ms, because the database reads and skips every earlier row. I switched the public product feed to cursor (keyset) pagination, which stays fast at any depth. The artisan dashboard keeps offset pagination because sellers filter results and need page numbers.",
        },
        {
          lead: 'Deployment issues.',
          text: "Requests failed with CORS errors even though the config looked correct. I added a temporary debug endpoint showing the live config and found the latest code hadn't been redeployed. The embedding model crashed Render's free tier on startup, so I moved it to the Hugging Face Inference API; it is the same model, so the stored vectors still worked. Neon was dropping idle database connections, which I fixed with connection health checks.",
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        'Live on Vercel, Render and Neon, with customer, artisan and admin flows working end to end.',
        'One Stripe payment covers a multi-shop cart and is split into one order per artisan.',
        'No overselling: product rows are locked during checkout, and unpaid checkouts release their stock.',
        'Load-tested with 100,000 products. Deep offset pages took ~43 ms vs ~3 ms for the first page, so the public feed moved to cursor pagination, which stays fast at any depth.',
        'Correct money handling: Numeric instead of float, and order items store the price at the time of purchase.',
        'Clear API errors (403 / 404 / 409) that the frontend shows as readable messages.',
      ],
    },
  ],

  // LESSON LEARNED
  lesson:
    'An endpoint that works is not always correct. Most of the work was handling what could go wrong: two people buying the last item, a payment that never finishes, a page that slows down as data grows. Using AI helped me build faster because I reviewed and understood every decision before accepting it.',

  links: [
    { label: 'Live app', url: 'https://karigar-marketplace.vercel.app/' },
    { label: 'GitHub', url: 'https://github.com/missLaiba22/artisan-marketplace' },
    {
      label: 'Technical report',
      url: 'https://github.com/missLaiba22/artisan-marketplace/blob/main/Karigar.pdf',
    },
  ],
}
