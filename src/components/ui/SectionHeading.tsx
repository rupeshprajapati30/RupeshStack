import type { SectionCopy } from "@/types/portfolio";

interface SectionHeadingProps extends SectionCopy {
  id: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-12 max-w-2xl sm:mb-16" data-reveal>
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-sm text-primary">
        <span aria-hidden="true" className="text-muted">
          {"//"}
        </span>
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="mt-5 h-1 w-20 rounded-full bg-linear-to-r from-primary via-accent to-secondary"
      />
      {description ? <p className="mt-5 text-base text-muted sm:text-lg">{description}</p> : null}
    </header>
  );
}
