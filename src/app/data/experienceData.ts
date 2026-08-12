export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  accent: string;
  contributions: string[];
  technologies: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "PT Charoen Pokphand Indonesia. Tbk",
    role: "Full Stack Web Developer Intern",
    period: "2026 — Present",
    duration: "1 Year",
    location: "Indonesia",
    accent: "#00f5c4",
    contributions: [
      "Architected and developed a full-stack purchase data management system handling enterprise material tracking.",
      "Built responsive user interfaces with React and TypeScript integrated with robust REST APIs in Laravel.",
      "Optimized database queries in PostgreSQL, reducing data load times by 35% across inventory reports.",
    ],
    technologies: ["React.js", "TypeScript", "Laravel", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    company: "Asah led by Dicoding Indonesia",
    role: "Cohort React & Back-End with AI",
    period: "2025 — 2026",
    duration: "6 Months",
    location: "Online",
    accent: "#00f5c4",
    contributions: [
      "Gaining comprehensive skills in web development, progressing from foundational technologies such as HTML, CSS, and JavaScript to advanced frameworks like React.js and backend development using Express.js, and also database implementation using PostgreSQL.",
      "Applying theoretical knowledge through hands-on projects to build a professional portfolio.",
      "Participating in mentor-led classes and receiving personalized guidance from industry experts to ensure project success and skill mastery.",
      "Participated in a Capstone Project alongside 4 other teammates. Contributed as a Frontend Developer using Next.js, shadcnUI, and TailwindCSS.",
    ],
    technologies: ["React.js", "Express.js", "PostgreSQL", "Next.js", "Tailwind CSS"],
  },
];
