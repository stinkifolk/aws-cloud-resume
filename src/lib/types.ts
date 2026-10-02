import type { StaticImageData } from "next/image";

export type ResumeIcon =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | StaticImageData;

export type IconType = "github" | "linkedin" | "x" | "globe" | "mail" | "phone";

export interface KeyCertification {
  title: string;
  issuer: string;
  date: string;
}

export interface CertificationItem {
  title: string;
  issuer?: string;
  date: string;
}

export interface CredentialItem {
  title: string;
  year: string;
}

export interface CredentialCategory {
  category: string;
  items: CredentialItem[];
}

export interface SkillGroup {
  name: string;
  skills?: readonly string[];
  description?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface VolunteeringItem {
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string | null;
  description: string;
  highlights?: readonly string[];
}

export interface WorkExperienceItemData {
  company: string;
  link: string | null;
  badges: string[];
  title: string;
  start: string;
  end: string | null;
  description: string;
  highlights?: readonly string[];
}

export interface ProjectItemData {
  title: string;
  techStack: string[];
  description: string;
  highlights?: readonly string[];
  attribution?: {
    text: string;
    linkText: string;
    href: string;
  };
  link?: {
    label: string;
    href: string;
  };
}

export interface ResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  avatarUrl: string;
  personalWebsiteUrl: string;
  contact: {
    email: string;
    tel?: string;
    social: Array<{
      name: string;
      url: string;
      icon: IconType;
    }>;
  };
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string | null;
  }>;
  work: Array<WorkExperienceItemData>;
  otherExperience?: Array<WorkExperienceItemData>;
  volunteering?: Array<VolunteeringItem>;
  interests?: readonly string[];
  certifications?: Array<CertificationItem>;
  keyCertification?: KeyCertification;
  technicalCredentials?: CredentialCategory[];
  skills: readonly string[];
  skillsByCategory?: readonly SkillGroup[];
  languages?: readonly Language[];
  projects: Array<ProjectItemData>;
}
