export interface ServiceItem {
  num: string;
  accent: string;
  title: string;
  desc: string;
  tags: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    num: "01",
    accent: "#00f5c4",
    title: "FULL STACK\nDEVELOPMENT",
    desc: "From database schema to polished UI.",
    tags: ["REST API", "Frontend", "Auth", "CRUD", "Dashboards", "Enterprise Apps"],
  },
  {
    num: "02",
    accent: "#8c00ff",
    title: "BACKEND\nENGINEERING",
    desc: "Reliable, maintainable, scalable systems.",
    tags: ["API Architecture", "PostgreSQL", "Query Optimization", "Caching", "Data Modeling", "Business Logic"],
  },
  {
    num: "03",
    accent: "#00f5c4",
    title: "FRONTEND\nENGINEERING",
    desc: "Component-driven, responsive, interactive.",
    tags: ["React", "TypeScript", "Responsive", "Data Viz", "Component Libraries", "Dark Mode"],
  },
  {
    num: "04",
    accent: "#ff2d6b",
    title: "UI / UX\nDESIGN",
    desc: "Requirements into intuitive interfaces.",
    tags: ["Wireframing", "Figma", "Dashboard Design", "Design Systems", "User Flow"],
  },
];
