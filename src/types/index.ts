export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "automation" | "call-center" | "ai" | "integration";
};

export type Industry = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  industry: string;
  category: "automation" | "call-center";
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
  roi: string;
  image: string;
};

export type Workflow = {
  id: string;
  title: string;
  description: string;
  steps: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export type FAQ = {
  question: string;
  answer: string;
};
