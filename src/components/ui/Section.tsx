import type { ReactNode } from "react";
import type { SectionCopy } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

interface SectionProps {
  id: string;
  copy: SectionCopy;
  children: ReactNode;
  className?: string;
}

/** Standard page section: landmark, anchored heading and content container. */
export function Section({ id, copy, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative py-20 sm:py-28", className)}>
      <div className="container-page">
        <SectionHeading id={headingId} {...copy} />
        {children}
      </div>
    </section>
  );
}
