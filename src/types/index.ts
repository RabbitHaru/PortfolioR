export interface Link {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  type: string;
  organization: string;
  environment: string[];
  teamSize: number;
  backgroundAndSummary: string;
  role: string[];
  links: Link[];
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  details: string[];
}
