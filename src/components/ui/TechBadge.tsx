import { resolveIcon } from "@/lib/icons";

interface TechBadgeProps {
  label: string;
  icon?: string;
}

export function TechBadge({ label, icon }: TechBadgeProps) {
  const Icon = icon ? resolveIcon(icon) : null;
  return (
    <span className="badge">
      {Icon ? <Icon aria-hidden="true" className="size-3.5 text-primary" /> : null}
      {label}
    </span>
  );
}
