/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Green + white palette with one warm accent (gold). Neutrals carry a
      // faint green tint so they sit with the forest accent instead of the
      // old cream/beige. (`cream` keeps its name so existing classes still work.)
      colors: {
        cream: '#f6f9f7', // page background — white with a faint green tint
        card: '#ffffff', // raised surfaces / project cards
        band: '#e5efe8', // the tinted "Question" band on case studies
        chip: '#edf3ef', // skill chips
        ink: '#1c2622', // primary text
        muted: '#4b5a53', // secondary text
        muted2: '#3e4b45', // long-form body text
        faint: '#6c7b74', // tertiary text
        faint2: '#8a9a92', // captions / kickers
        forest: '#33574a', // accent (links, labels)
        'forest-dark': '#223d33', // link hover
        'forest-muted': '#93a99b', // lesson label
        'forest-tag': '#e6ede7', // FEATURED tag background
        line: '#dce6df', // hairline borders
        sel: '#d9e6df', // text selection
        gold: '#b98b3e', // third colour: small warm highlights (section numbers, award, photo arc)
        'gold-soft': '#f4ead6', // gold tint for badges
      },
      fontFamily: {
        // One clean sans family for headings and body; mono for labels.
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1120px',
        read: '680px', // one reading width for body text across the home page
      },
    },
  },
  plugins: [],
}
