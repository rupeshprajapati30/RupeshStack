import { Mail, MapPin, Send } from "lucide-react";
import type { Profile, SectionCopy, SiteContent } from "@/types/portfolio";
import { ButtonLink } from "./ui/ButtonLink";
import { Section } from "./ui/Section";
import { SocialLinks } from "./ui/SocialLinks";

interface ContactProps {
  profile: Profile;
  copy: SectionCopy;
  labels: Pick<SiteContent["labels"], "email" | "location">;
}

export function Contact({ profile, copy, labels }: ContactProps) {
  const { contact } = profile;
  const details = [
    { label: labels.email, value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: labels.location, value: profile.location, Icon: MapPin },
  ];

  return (
    <Section id="contact" copy={copy}>
      <div
        className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14"
        data-reveal
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-secondary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-text sm:text-4xl">
              <span className="text-gradient">{contact.heading}</span>
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{contact.message}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={`mailto:${profile.email}`} className="w-full sm:w-auto">
                <Send aria-hidden="true" className="size-4" />
                {contact.ctaLabel}
              </ButtonLink>
              <SocialLinks links={profile.socialLinks} className="justify-center sm:justify-start" />
            </div>
          </div>

          <ul className="grid gap-4">
            {details.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <div className="card-interactive flex items-center gap-4 rounded-2xl border border-border bg-background/50 p-5">
                  <span className="icon-tile size-12">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="block truncate text-base font-medium text-text transition hover:text-primary sm:text-lg"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="truncate text-base font-medium text-text sm:text-lg">{value}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
