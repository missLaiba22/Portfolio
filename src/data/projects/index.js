// ---------------------------------------------------------------------------
// PROJECTS / CASE STUDIES — one file per project for easy maintenance.
//
// To add a case study: create ./<slug>.js exporting a project object, import it
// here, and add it to the `projects` array below. Only status: 'published'
// projects render on the site, so drafts can live here safely without leaking
// unfinished (or invented) content.
//
// SCHEMA (per project):
//   slug        string  — url segment: /work/<slug>
//   title       string
//   subtitle    string  — one line under the case-study H1
//   kicker      string  — mono eyebrow above the H1
//   featured    boolean — shows the FEATURED tag on the home card
//   status      'published' | 'draft'
//   cardTagline string  — one-liner on the home projects list
//   cardTag     string  — short category shown on the card (e.g. 'Agentic AI')
//   metrics     [{ value, label }]              — up to 3, on the home card
//   question    string  — the "Q." block
//   role        string  — the "My Role" fact box (contribution honesty)
//   ownership   [{ who, items:[] }]             — split shown in the role box
//   sections    [{ label, blocks:[{ lead?, text }], diagram?, fig?, stack? }]
//   models      [{ organ, arch, metric, note? }] — optional results block
//   lesson      string  — italic serif closing line
//   links       [{ label, url }]
// ---------------------------------------------------------------------------

import { healthmate } from './healthmate'
import { cognara } from './cognara'
import { verdara } from './verdara'
import { scriptorium } from './scriptorium'
import { codespark } from './codespark'
import { gynaegenius } from './gynaegenius'

export const projects = [healthmate, cognara, verdara, scriptorium, codespark, gynaegenius]

export const publishedProjects = projects.filter((p) => p.status === 'published')

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
