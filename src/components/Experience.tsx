import { Briefcase, Calendar, CircleCheck, MapPin } from "lucide-react";
import type { ExperienceItem, SectionCopy } from "@/types/portfolio";
import { Section } from "./ui/Section";
import { TechBadge } from "./ui/TechBadge";

interface ExperienceProps {
  experience: ExperienceItem[];
  copy: SectionCopy;
  currentLabel: string;
}

export function Experience({ experience, copy, currentLabel }: ExperienceProps) {
  return (
    <Section id="experience" copy={copy}>
      <ol className="relative">
        {/* Timeline rail: left edge on mobile, between columns on desktop */}
        <span
          aria-hidden="true"
          className="timeline-line absolute top-2 bottom-0 left-3 w-px -translate-x-1/2 md:left-[13.5rem]"
        />
        {experience.map((item, index) => (
          <li
            key={`${item.company}-${item.period}`}
            className="relative grid gap-4 pb-12 pl-10 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-12 md:pl-0"
            data-reveal
            data-reveal-index={String(Math.min(index, 3))}
          >
            {/* Node */}
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-0 grid size-6 place-items-center rounded-full border border-primary/60 bg-background shadow-[0_0_16px_-2px_var(--color-primary)] md:left-[12.75rem]"
            >
              <span className="size-2 rounded-full bg-primary" />
            </span>

            {/* Meta */}
            <div className="space-y-1.5 font-mono text-sm md:pt-1 md:text-right">
              <p className="inline-flex items-center gap-2 text-primary md:flex md:justify-end">
                <Calendar aria-hidden="true" className="size-4" />
                {item.period}
              </p>
              <p className="flex items-center gap-2 text-muted md:justify-end">
                <MapPin aria-hidden="true" className="size-4" />
                {item.location}
              </p>
            </div>

            {/* Card */}
            <article className="glass card-interactive rounded-2xl p-6 sm:p-7">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-text">{item.role}</h3>
                  <p className="mt-1 inline-flex items-center gap-2 text-muted">
                    <Briefcase aria-hidden="true" className="size-4 text-accent" />
                    {item.company}
                  </p>
                </div>
                {item.current ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    <span className="status-dot" aria-hidden="true" />
                    {currentLabel}
                  </span>
                ) : null}
              </header>

              <p className="mt-4 leading-relaxed text-muted">{item.description}</p>

              <ul className="mt-4 space-y-2.5">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-text/90">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                    {achievement}
                  </li>
                ))}
              </ul>

              <ul aria-label={`Technologies used at ${item.company}`} className="mt-5 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <li key={tech}>
                    <TechBadge label={tech} />
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
