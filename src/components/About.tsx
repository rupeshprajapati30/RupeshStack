import { Mail, MapPin } from "lucide-react";
import type { Profile, SectionCopy, SiteContent } from "@/types/portfolio";
import { resolveIcon } from "@/lib/icons";
import { Section } from "./ui/Section";

interface AboutProps {
  profile: Profile;
  copy: SectionCopy;
  labels: Pick<SiteContent["labels"], "email" | "location">;
}

export function About({ profile, copy, labels }: AboutProps) {
  const { about } = profile;

  return (
    <Section id="about" copy={copy}>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div data-reveal>
          <h3 className="text-2xl font-semibold leading-snug text-text sm:text-3xl">{about.headline}</h3>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <span className="icon-tile size-10">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-wider text-muted">{labels.location}</dt>
                <dd className="truncate font-medium text-text">{profile.location}</dd>
              </div>
            </div>
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <span className="icon-tile size-10">
                <Mail aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-wider text-muted">{labels.email}</dt>
                <dd className="truncate font-medium">
                  <a href={`mailto:${profile.email}`} className="text-text transition hover:text-primary">
                    {profile.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="space-y-6">
          <dl className="grid grid-cols-2 gap-4" data-reveal data-reveal-index="1">
            {about.stats.map((stat) => (
              <div key={stat.label} className="glass card-interactive rounded-2xl p-5 text-center sm:p-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-gradient block text-3xl font-bold sm:text-4xl">{stat.value}</span>
                  <span aria-hidden="true" className="mt-1 block text-sm text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="grid gap-4 sm:grid-cols-2" data-reveal data-reveal-index="2">
            {about.highlights.map((highlight) => {
              const Icon = resolveIcon(highlight.icon);
              return (
                <li key={highlight.title} className="glass card-interactive rounded-2xl p-5">
                  <span className="icon-tile size-11">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h4 className="mt-4 font-semibold text-text">{highlight.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{highlight.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
