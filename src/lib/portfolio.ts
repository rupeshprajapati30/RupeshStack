import profileData from "@/data/profile.json";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";
import siteData from "@/data/site.json";
import type {
  ExperienceItem,
  Portfolio,
  Profile,
  Project,
  SiteContent,
  Skill,
} from "@/types/portfolio";

/*
 * Data access layer. Components never import JSON directly — they receive
 * typed data from here, so the source (JSON, CMS, API) can change in one place.
 */

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getSkills(): Skill[] {
  return skillsData satisfies Skill[];
}

export function getProjects(): Project[] {
  return projectsData satisfies Project[];
}

export function getExperience(): ExperienceItem[] {
  return experienceData satisfies ExperienceItem[];
}

export function getSiteContent(): SiteContent {
  return siteData satisfies SiteContent;
}

export function getPortfolio(): Portfolio {
  return {
    site: getSiteContent(),
    profile: getProfile(),
    skills: getSkills(),
    projects: getProjects(),
    experience: getExperience(),
  };
}

/** Groups skills by category, preserving the order categories first appear in. */
export function groupSkillsByCategory(skills: Skill[]): Map<string, Skill[]> {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const group = groups.get(skill.category) ?? [];
    group.push(skill);
    groups.set(skill.category, group);
  }
  return groups;
}

/** A link is usable when it is set and not a `#` placeholder. */
export function isUsableLink(href: string | undefined): href is string {
  return Boolean(href && href.trim() !== "" && href.trim() !== "#");
}

export function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** SVGs are served as-is; raster images go through the Next.js optimiser. */
export function isSvg(src: string): boolean {
  return src.toLowerCase().endsWith(".svg");
}
