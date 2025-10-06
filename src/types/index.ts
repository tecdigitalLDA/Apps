export interface PortfolioProject {
  id: string;
  name: string;
  slug: string;
  description: string;
  challenge: string;
  solution: string;
  image_url: string;
  project_url: string | null;
  technologies: string[];
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}
