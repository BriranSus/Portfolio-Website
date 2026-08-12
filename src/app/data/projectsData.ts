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
  status: string;
}

export const PROJECTS: ProjectItem[] = [
  // {
  //   id: 0,
  //   num: "01",
  //   title: "CENTRAL PURCHASE DATA SYSTEM",
  //   subtitle: "Material Management Dashboard",
  //   accent: "#ff2d6b",
  //   type: "Full Stack",
  //   year: "2026",
  //   desc: "Full-stack task management with Kanban boards, real-time collaboration, and analytics.",
  //   tags: ["React", "TypeScript", "Laravel API", "PostgreSQL"],
  //   img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop&auto=format",
  //   status: "IN PROGRESS"
  // },
  {
    id: 0,
    num: "01",
    title: "TRANSCRIPTX",
    subtitle: "AI Transcript & Summarizer",
    accent: "#b75fff",
    type: "Frontend",
    year: "2025",
    desc: "Scalable store with Stripe payments, real-time inventory, and full admin analytics panel.",
    tags: ["React", "Express", "Redis", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?w=900&h=700&fit=crop&auto=format",
    status: "COMPLETED"
  },
  {
    id: 1,
    num: "02",
    title: "DEVPORTAL",
    subtitle: "API Management Tool",
    accent: "#ff2d6b",
    type: "Backend",
    year: "2023",
    desc: "Developer portal for API docs, interactive testing, rate limiting, and key management.",
    tags: ["Node.js", "TypeScript", "Docker", "REST API"],
    img: "https://images.unsplash.com/photo-1733412505442-36cfa59a4240?w=900&h=700&fit=crop&auto=format",
    status: "COMPLETED"
  },
  {
    id: 2,
    num: "03",
    title: "HRSYNC",
    subtitle: "HR Management System",
    accent: "#00f5c4",
    type: "Full Stack",
    year: "2024",
    desc: "Enterprise HR with automated payroll, attendance tracking, and performance reviews.",
    tags: ["React", "PostgreSQL", "Prisma", "JWT"],
    img: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?w=900&h=700&fit=crop&auto=format",
    status: "COMPLETED"
  },
];
