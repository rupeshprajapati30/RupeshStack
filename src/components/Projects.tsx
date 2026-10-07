import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project, SectionCopy, SiteContent } from "@/types/portfolio";
import { isSvg, isUsableLink } from "@/lib/portfolio";
import { GithubIcon } from "./ui/BrandIcons";
import { Section } from "./ui/Section";
import { TechBadge } from "./ui/TechBadge";

interface ProjectsProps {
  projects: Project[];
  copy: SectionCopy;
  labels: Pick<SiteContent["labels"], "sourceCode" | "liveDemo">;
}

export function Projects({ projects, copy, labels }: ProjectsProps) {
  return (
    <Section id="projects" copy={copy}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.title} data-reveal data-reveal-index={String(index % 3)}>
            <ProjectCard project={project} labels={labels} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

interface ProjectCardProps {
  project: Project;
  labels: ProjectsProps["labels"];
}

function ProjectCard({ project, labels }: ProjectCardProps) {
  const links = [
    { href: project.githubUrl, label: labels.sourceCode, Icon: GithubIcon },
    { href: project.liveUrl, label: labels.liveDemo, Icon: ArrowUpRight },
  ].filter((link): link is typeof link & { href: string } => isUsableLink(link.href));

  return (
    <article className="glass card-interactive group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/70">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          unoptimized={isSvg(project.image)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent"
        />
        <span className="absolute top-4 left-4 rounded-full border border-primary/40 bg-background/80 px-3 py-1 font-mono text-xs text-primary backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul aria-label={`Technologies used in ${project.title}`} className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechBadge label={tech} />
            </li>
          ))}
        </ul>

        {links.length > 0 ? (
          <div className="mt-6 flex gap-3 border-t border-border/70 pt-5">
            {links.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-medium text-muted transition hover:text-primary"
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
                <span className="sr-only">
                  {" "}
                  for {project.title} (opens in a new tab)
                </span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
