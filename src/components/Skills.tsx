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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([category, items], index) => (
          <li
            key={category}
            className="glass card-interactive rounded-2xl p-6"
            data-reveal
            data-reveal-index={String(index % 3)}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">
                {category}
              </h3>
              <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="grid gap-2.5">
              {items.map((skill) => {
                const Icon = resolveIcon(skill.icon);
                return (
                  <li
                    key={skill.name}
                    className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-border hover:bg-background/40"
                  >
                    <span className="icon-tile size-9 transition group-hover:scale-110 group-hover:shadow-[0_0_18px_-4px_var(--color-primary)]">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="font-medium text-text">{skill.name}</span>
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
