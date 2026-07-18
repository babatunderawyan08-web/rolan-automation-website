import { NAV_LINKS } from "@/lib/constants";
import {
  blogPosts,
  callCenterServices,
  industries,
  portfolio,
  services,
  technologies,
  whyChooseUs,
} from "@/data/site-data";

export type SearchCategory =
  | "Services"
  | "Technologies"
  | "Portfolio"
  | "Pages"
  | "Content";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const link of NAV_LINKS) {
    items.push({
      id: `page-${link.href}`,
      title: link.label,
      description: `${link.label} page`,
      href: link.href,
      category: "Pages",
      keywords: normalize(`${link.label} page ${link.href}`),
    });
  }

  const extraPages = [
    { label: "Book Consultation", href: "/book-consultation", description: "Request a free automation consultation" },
    { label: "FAQ", href: "/faq", description: "Frequently asked questions" },
    { label: "Case Studies", href: "/case-studies", description: "Client results and project case studies" },
    { label: "Privacy Policy", href: "/privacy", description: "Privacy policy" },
    { label: "Terms of Service", href: "/terms", description: "Terms of service" },
  ];

  for (const page of extraPages) {
    items.push({
      id: `page-${page.href}`,
      title: page.label,
      description: page.description,
      href: page.href,
      category: "Pages",
      keywords: normalize(`${page.label} ${page.description}`),
    });
  }

  for (const service of [...services, ...callCenterServices]) {
    items.push({
      id: `service-${service.id}`,
      title: service.title,
      description: service.description,
      href: `/services/${service.id}`,
      category: "Services",
      keywords: normalize(`${service.title} ${service.description} ${service.category} ${service.id}`),
    });
  }

  for (const tech of technologies) {
    items.push({
      id: `tech-${tech}`,
      title: tech,
      description: `${tech} automation and integration expertise`,
      href: "/services",
      category: "Technologies",
      keywords: normalize(`${tech} technology integration platform`),
    });
  }

  for (const project of portfolio) {
    items.push({
      id: `portfolio-${project.id}`,
      title: project.title,
      description: project.solution || project.problem,
      href: "/portfolio",
      category: "Portfolio",
      keywords: normalize(
        `${project.title} ${project.industry} ${project.problem} ${project.solution} ${project.results.join(" ")}`
      ),
    });
  }

  for (const industry of industries) {
    items.push({
      id: `industry-${industry.id}`,
      title: industry.title,
      description: industry.description,
      href: "/industries",
      category: "Content",
      keywords: normalize(`${industry.title} ${industry.description} industry`),
    });
  }

  for (const post of blogPosts) {
    items.push({
      id: `blog-${post.slug}`,
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      category: "Content",
      keywords: normalize(`${post.title} ${post.excerpt} ${post.category} blog`),
    });
  }

  for (const item of whyChooseUs) {
    items.push({
      id: `why-${item.title}`,
      title: item.title,
      description: item.description,
      href: "/about",
      category: "Content",
      keywords: normalize(`${item.title} ${item.description}`),
    });
  }

  return items;
}

/** Built once at module load for fast client-side search. */
export const SEARCH_INDEX = buildIndex();

export type SearchResult = SearchItem & { score: number };

export function searchSite(query: string, limit = 8): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  const terms = q.split(" ").filter(Boolean);
  const results: SearchResult[] = [];

  for (const item of SEARCH_INDEX) {
    const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
    let score = 0;

    if (item.title.toLowerCase().includes(q)) score += 40;
    if (normalize(item.title) === q) score += 60;

    let matchedTerms = 0;
    for (const term of terms) {
      if (haystack.includes(term)) {
        matchedTerms += 1;
        score += 10;
        if (item.title.toLowerCase().includes(term)) score += 15;
      }
    }

    if (matchedTerms === 0) continue;
    if (matchedTerms === terms.length) score += 20;

    results.push({ ...item, score });
  }

  results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return results.slice(0, limit);
}

export function highlightMatch(text: string, query: string): { parts: { text: string; match: boolean }[] } {
  const terms = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (terms.length === 0) return { parts: [{ text, match: false }] };

  const regex = new RegExp(`(${terms.join("|")})`, "ig");
  const parts = text.split(regex).filter((part) => part.length > 0);
  const termSet = new Set(terms.map((t) => t.toLowerCase()));

  return {
    parts: parts.map((part) => ({
      text: part,
      match: termSet.has(part.toLowerCase()),
    })),
  };
}
