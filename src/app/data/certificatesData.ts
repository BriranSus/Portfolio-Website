export interface CertificateItem {
  id: string;
  num: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  image?: string; 
  category: "Web Development" | "Artificial Intelligence" | "Cloud & Backend" | "Computer Science";
  accent: string;
  skills: string[];
  description: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    num: "01",
    title: "Building LLM Applications With Prompt Engineering",
    issuer: "NVIDIA",
    issueDate: "May 2026",
    credentialId: "g-2IIRd1RO6ZWcYuaAXLtA",
    verifyUrl: "https://learn.nvidia.com/certificates?id=JhUMdFO5TtaHHTEHMbNMhg#",
    image: "/certificates/NvidiaLLM.png",
    category: "Artificial Intelligence",
    accent: "#00f5c4",
    skills: ["LLM", "Prompt Engineering"],
    description:
      "Mastery in orchestrating end-to-end AI applications, from advanced prompt engineering and large language model integration using NVIDIA's framework.",
  },
  {
    id: "cert-2",
    num: "02",
    title: "Asah Cohort React & Back-End with AI",
    issuer: "Dicoding Indonesia & Accenture",
    issueDate: "Jan 2026",
    credentialId: "ASAH/GRAD/XXVI-01/R005D5Y0151",
    verifyUrl: "",
    image: "/certificates/AsahCertificate.png",
    category: "Web Development",
    accent: "#ff2d6b",
    skills: ["React.js", "Express.js", "Javascript", "AWS", "Git"],
    description:
      "Comprehensive mastery in modern web architecture, transitioning from frontend reactive patterns with React.js to scalable backend services with Express.js, Database and AI model orchestration.",
  },
  {
    id: "cert-3",
    num: "03",
    title: "Best Asah Capstone Project",
    issuer: "Dicoding Indonesia & Accenture",
    issueDate: "Jan 2026",
    credentialId: "ASAH/CAPS/XXVI-01/R005D5Y0151",
    verifyUrl: "",
    image: "/certificates/BestCapstoneAsah.png",
    category: "Web Development",
    accent: "#b75fff",
    skills: ["Next.js", "Express.js", "Shadcn UI", "Tanstack", "Git", "Recharts"],
    description:
      "Best Asah Capstone Project Graduation is a recognition of the best capstone project in the Asah program organized by Dicoding Indonesia and Accenture.",
  },
  {
    id: "cert-4",
    num: "04",
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    issueDate: "Jan 2026",
    credentialId: "",
    verifyUrl: "https://www.credly.com/badges/44aea510-a717-4883-8d2f-1f4bcaa60898/linked_in_profile",
    image: "/certificates/AzureAIFundamentalsBadge.png",
    category: "Artificial Intelligence",
    accent: "#00f5c4",
    skills: ["Azure Bot Services", "Microsoft Azure Machine Learning", "Azure Cognitive Services"],
    description:
      "Fundamentals of AI concepts and services on Microsoft Azure, covering Azure Machine Learning, Azure Bot Service, Azure Cognitive Services, and responsible AI principles.",
  },
];
