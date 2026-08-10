export interface ProjectItem {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  accent: string;
  type: string;
  year: string;
  desc: string;
  tags: string[];
  img: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 0,
    num: "01",
    title: "TASKFLOW",
    subtitle: "Project Management Dashboard",
    accent: "#00f5c4",
    type: "Full Stack",
    year: "2024",
    desc: "Full-stack task management with Kanban boards, real-time collaboration, and analytics.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 1,
    num: "02",
    title: "SHOPWAVE",
    subtitle: "E-Commerce Platform",
    accent: "#8c00ff",
    type: "Full Stack",
    year: "2024",
    desc: "Scalable store with Stripe payments, real-time inventory, and full admin analytics panel.",
    tags: ["React", "Express", "Redis", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 2,
    num: "03",
    title: "DEVPORTAL",
    subtitle: "API Management Tool",
    accent: "#ff2d6b",
    type: "Backend",
    year: "2023",
    desc: "Developer portal for API docs, interactive testing, rate limiting, and key management.",
    tags: ["Node.js", "TypeScript", "Docker", "REST API"],
    img: "https://images.unsplash.com/photo-1733412505442-36cfa59a4240?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 3,
    num: "04",
    title: "HRSYNC",
    subtitle: "HR Management System",
    accent: "#00f5c4",
    type: "Full Stack",
    year: "2024",
    desc: "Enterprise HR with automated payroll, attendance tracking, and performance reviews.",
    tags: ["React", "PostgreSQL", "Prisma", "JWT"],
    img: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 4,
    num: "05",
    title: "DATAPULSE",
    subtitle: "Analytics Visualization Platform",
    accent: "#8c00ff",
    type: "Frontend",
    year: "2023",
    desc: "Real-time data platform with custom chart builders and shareable embedded dashboards.",
    tags: ["React", "D3.js", "TypeScript", "WebSocket"],
    img: "https://images.unsplash.com/photo-1625838144804-300f3907c110?w=900&h=700&fit=crop&auto=format",
  },
];
