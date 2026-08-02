import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-[13px] text-faint2">
          © {new Date().getFullYear()} {profile.name}
        </div>
        <div className="flex gap-5">
          <a href={profile.github} className="text-[13px] text-muted hover:text-ink">
            GitHub
          </a>
          <a href={profile.linkedin} className="text-[13px] text-muted hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-[13px] text-muted hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
