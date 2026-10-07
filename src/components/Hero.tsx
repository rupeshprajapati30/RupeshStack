import Image from "next/image";
import { ArrowRight, MapPin, Send } from "lucide-react";
import type { Profile, SiteContent } from "@/types/portfolio";
import { isSvg } from "@/lib/portfolio";
import { ButtonLink } from "./ui/ButtonLink";
import { SocialLinks } from "./ui/SocialLinks";
import { TechBadge } from "./ui/TechBadge";
import { Terminal } from "./Terminal";

interface HeroProps {
  profile: Profile;
  ctas: SiteContent["heroCtas"];
  terminalTitle: string;
}

export function Hero({ profile, ctas, terminalTitle }: HeroProps) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Introduction */}
        <div className="animate-fade-up text-center lg:text-left">
          {profile.availability.available ? (
            <p className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-text sm:text-sm">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability.label}
            </p>
          ) : null}

          <h1 id="hero-heading" className="font-bold tracking-tight">
            <span className="block font-mono text-base font-medium text-primary sm:text-lg">
              {profile.greeting}
            </span>
            <span className="text-gradient mt-2 block text-4xl leading-[1.05] sm:text-6xl xl:text-7xl">
              {profile.name}
            </span>
          </h1>

          <p className="mt-4 text-xl font-semibold text-text sm:text-2xl">{profile.title}</p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {profile.description}
          </p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin aria-hidden="true" className="size-4 text-primary" />
            {profile.location}
          </p>

          <ul aria-label="Core technologies" className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
            {profile.heroTechnologies.map((tech) => (
              <li key={tech}>
                <TechBadge label={tech} />
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href="#projects" className="w-full sm:w-auto">
              {ctas.primary}
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" className="w-full sm:w-auto">
              <Send aria-hidden="true" className="size-4" />
              {ctas.secondary}
            </ButtonLink>
          </div>

          <SocialLinks
            links={profile.socialLinks}
            email={profile.email}
            className="mt-8 justify-center lg:justify-start"
          />
        </div>

        {/* Visual: profile + terminal */}
        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative mx-auto size-60 sm:size-72 lg:size-80">
            <div aria-hidden="true" className="profile-glow absolute -inset-10 animate-pulse-glow rounded-full" />
            <div aria-hidden="true" className="profile-ring absolute -inset-1 animate-spin-slow rounded-full opacity-90" />
            <div className="absolute inset-0.5 overflow-hidden rounded-full bg-surface">
              <Image
                src={profile.profileImage}
                alt={`Portrait of ${profile.name}`}
                fill
                preload
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 240px"
                className="object-cover"
                unoptimized={isSvg(profile.profileImage)}
              />
            </div>
          </div>

          <div className="relative z-10 -mt-10 w-full animate-float sm:mx-auto sm:max-w-sm lg:-mt-14 lg:ml-auto lg:mr-0 xl:-mr-6">
            <Terminal title={terminalTitle} entries={profile.terminal} />
          </div>
        </div>
      </div>
    </section>
  );
}
