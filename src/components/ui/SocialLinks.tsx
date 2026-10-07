import { Mail } from "lucide-react";
import type { SocialLinks as SocialLinksData } from "@/types/portfolio";
import { isUsableLink } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

interface SocialLinksProps {
  links: SocialLinksData;
  email?: string;
  className?: string;
}

export function SocialLinks({ links, email, className }: SocialLinksProps) {
  const items = [
    { label: "GitHub", href: links.github, Icon: GithubIcon, external: true },
    { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon, external: true },
    { label: "Email", href: email ? `mailto:${email}` : undefined, Icon: Mail, external: false },
  ].filter((item): item is typeof item & { href: string } => isUsableLink(item.href));

  if (items.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid size-11 place-items-center rounded-xl border border-border bg-surface/60 text-muted transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_20px_-6px_var(--color-primary)]"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
