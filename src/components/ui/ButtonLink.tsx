import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isExternalLink } from "@/lib/portfolio";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
  className,
}: ButtonLinkProps) {
  const external = isExternalLink(href);
  return (
    <a
      href={href}
      className={cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
