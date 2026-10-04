/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Palette lifted directly from the original portfolio so the
      // design language is preserved exactly (nothing redesigned).
      colors: {
        cream: '#faf6ef', // page background
        card: '#fffcf7', // raised surfaces / project cards
        band: '#efe6d4', // the tinted "Question" band on case studies
        chip: '#f1ece0', // skill chips
        ink: '#24211d', // primary text
        muted: '#57503f', // secondary text
        muted2: '#4a4438', // long-form body text
        faint: '#857c6a', // tertiary text
        faint2: '#a89f8c', // captions / kickers
        forest: '#33574a', // accent (links, labels)
        'forest-dark': '#223d33', // link hover
        'forest-muted': '#93a99b', // lesson label
        'forest-tag': '#e6ede7', // FEATURED tag background
        line: '#e3dbc9', // hairline borders
        sel: '#d9e6df', // text selection
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1120px',
        read: '680px', // one reading width for body text across the home page
      },
    },
  },
  plugins: [],
}
