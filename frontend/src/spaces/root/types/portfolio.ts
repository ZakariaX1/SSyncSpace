export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  featured: boolean;
}

export interface PortfolioResponse {
  projects: Project[];
}