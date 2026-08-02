import { useParams, Link } from 'react-router-dom'
import { getProject } from '../data/projects'
import CaseStudyLayout from '../layouts/CaseStudyLayout'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project || project.status !== 'published') {
    return (
      <div className="py-32 text-center">
        <h1 className="font-serif text-[40px] text-ink">Case study coming soon</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          This case study is still being written.
        </p>
        <Link
          to="/#projects"
          className="mt-6 inline-block text-[15px] font-semibold text-forest hover:text-forest-dark"
        >
          ← Back to projects
        </Link>
      </div>
    )
  }

  return <CaseStudyLayout project={project} />
}
