import type { SectionCopy, Skill } from "@/types/portfolio";
import { groupSkillsByCategory } from "@/lib/portfolio";
import { resolveIcon } from "@/lib/icons";
import { Section } from "./ui/Section";

interface SkillsProps {
  skills: Skill[];
  copy: SectionCopy;
}

export function Skills({ skills, copy }: SkillsProps) {
  const groups = [...groupSkillsByCategory(skills)];

  return (
    <Section id="skills" copy={copy}>
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groups.map(([category, items], index) => (
          <li
            key={category}
            className="glass card-interactive rounded-2xl p-5"
            data-reveal
            data-reveal-index={String(index % 3)}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {category}
              </h3>
              <span className="rounded-full border border-border bg-background/30 px-2 py-0.5 font-mono text-[10px] text-muted">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="flex flex-wrap gap-2">
              {items.map((skill) => {
                const Icon = resolveIcon(skill.icon);
                return (
                  <li
                    key={skill.name}
                    className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/50 px-2.5 py-1.5 transition hover:border-primary/70 hover:bg-primary/5"
                  >
                    <span className="icon-tile size-7 shrink-0 rounded-md transition group-hover:scale-105 group-hover:shadow-[0_0_16px_-4px_var(--color-primary)]">
                      <Icon aria-hidden="true" className="size-3.5" />
                    </span>
                    <span className="text-sm font-medium text-text">{skill.name}</span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
