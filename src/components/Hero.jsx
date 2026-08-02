import { profile } from '../data/content'
import portrait from '../assets/laiba.jpeg'

export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:py-24">
      <div>
        <div
          className="animate-hero mb-5 font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-forest"
          style={{ animationDelay: '0ms' }}
        >
          {profile.role}
        </div>
        <h1
          className="animate-hero mb-5 font-serif text-[42px] font-normal leading-[1.08] tracking-[-0.01em] text-ink sm:text-[52px] md:text-[58px]"
          style={{ animationDelay: '90ms' }}
        >
          {profile.headline}
        </h1>
        <p
          className="animate-hero mb-8 max-w-[540px] text-[17px] leading-[1.65] text-muted"
          style={{ animationDelay: '180ms' }}
        >
          {profile.subline}
        </p>
        <div className="animate-hero flex flex-wrap gap-3" style={{ animationDelay: '270ms' }}>
          <a
            href="/#projects"
            className="rounded-lg bg-ink px-[22px] py-3 text-[14.5px] font-semibold text-cream transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
          >
            View case studies
          </a>
          <a
            href="/#contact"
            className="rounded-lg border border-line px-[22px] py-3 text-[14.5px] font-semibold text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-chip"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Portrait — smaller, centred, with a soft blurred halo of the same
          image behind it so it reads gently rather than as a hard photo block. */}
      <div
        className="animate-hero flex justify-center md:justify-end"
        style={{ animationDelay: '240ms' }}
      >
        <div className="relative w-full max-w-[230px]">
          <img
            src={portrait}
            aria-hidden="true"
            alt=""
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-[1.18] rounded-[2rem] object-cover opacity-35 blur-2xl"
          />
          <img
            src={portrait}
            alt={`${profile.name}, ${profile.role}`}
            className="aspect-square w-full rounded-2xl object-cover object-top shadow-[0_12px_40px_-16px_rgba(36,33,29,0.35)] ring-1 ring-line"
          />
        </div>
      </div>
    </section>
  )
}
