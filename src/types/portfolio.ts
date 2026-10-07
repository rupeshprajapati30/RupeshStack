/**
 * Data models for all portfolio content.
 * Every JSON file in `src/data` is validated against these types at build time.
 */

export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface TerminalEntry {
  command: string;
  output: string[];
  /** Renders the output with a pulsing status indicator. */
  status?: "success";
}

export interface Stat {
  value: string;
  label: string;
}

export interface Highlight {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  headline: string;
  paragraphs: string[];
  stats: Stat[];
  highlights: Highlight[];
}

export interface ContactContent {
  heading: string;
  message: string;
  ctaLabel: string;
}

export interface Availability {
  available: boolean;
  label: string;
}

export interface Profile {
  name: string;
  shortName: string;
  greeting: string;
  title: string;
  description: string;
  location: string;
  email: string;
  profileImage: string;
  resumeUrl: string;
  availability: Availability;
  heroTechnologies: string[];
  socialLinks: SocialLinks;
  terminal: TerminalEntry[];
  about: AboutContent;
  contact: ContactContent;
  keywords: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface SiteContent {
  navigation: NavItem[];
  heroCtas: {
    primary: string;
    secondary: string;
    resume: string;
  };
  sections: {
    about: SectionCopy;
    skills: SectionCopy;
    projects: SectionCopy;
    experience: SectionCopy;
    contact: SectionCopy;
  };
  labels: {
    sourceCode: string;
    liveDemo: string;
    current: string;
    email: string;
    location: string;
    backToTop: string;
    openMenu: string;
    closeMenu: string;
    terminalTitle: string;
  };
  footer: {
    tagline: string;
    builtWith: string;
  };
}

export interface Portfolio {
  site: SiteContent;
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
}
