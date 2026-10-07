import { ArrowUp } from "lucide-react";
import type { NavItem, Profile, SiteContent } from "@/types/portfolio";
import { SocialLinks } from "./ui/SocialLinks";

interface FooterProps {
  profile: Profile;
  navigation: NavItem[];
  footer: SiteContent["footer"];
  backToTopLabel: string;
}

export function Footer({ profile, navigation, footer, backToTopLabel }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/70 bg-background/60 backdrop-blur">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
      />
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <a href="#home" className="inline-flex items-center gap-3 rounded-xl">
            <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-primary to-secondary font-mono text-sm font-bold text-background">
              {profile.shortName}
            </span>
            <span className="font-semibold text-text">{profile.name}</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{footer.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-8 items-center text-muted transition hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks links={profile.socialLinks} email={profile.email} />
      </div>

      <div className="border-t border-border/50">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {year} {profile.name}. <span className="font-mono">{footer.builtWith}</span>
          </p>
          <a
            href="#home"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 font-medium transition hover:text-primary"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            {backToTopLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
