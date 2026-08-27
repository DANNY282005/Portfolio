export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  objective: string;
  resumeFile: string;
  openRoles: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  project?: string | null;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  tags: string[];
  github?: string | null;
}

export interface ResearchPaper {
  id: string;
  title: string;
  publisher: string;
  date: string;
  description: string;
  url?: string | null;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  detail: string;
  period: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface PortfolioOverview {
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  research: ResearchPaper[];
  education: EducationEntry[];
  certifications: Certification[];
  softSkills: string[];
  languages: string[];
}
