import { useEffect } from 'react'

const SITE = 'Laiba Idrees'
export const DEFAULT_TITLE = 'Laiba Idrees — Software Engineer'

/** Sets the browser-tab title for a page, e.g. "RepoViva — Laiba Idrees".
 *  Pass nothing for the home page's default title. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : DEFAULT_TITLE
  }, [title])
}
