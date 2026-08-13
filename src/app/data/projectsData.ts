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
  img: any;
  status: string;
  liveUrl: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 0,
    num: "01",
    title: "TRANSCRIPTX",
    subtitle: "AI Transcript & Summarizer",
    accent: "#b75fff",
    type: "Frontend",
    year: "2025",
    desc: "TranscriptX focuses on two main features, which are automatic document summarization and audio transcription. By integrating with AI models, TranscriptX delivers accurate, fast, and context-aware outputs, helping users efficiently process large volumes of information.",
    tags: ["React", "Typescript", "TailwindCSS"],
    img: "/projects/Transcriptx.webp",
    status: "COMPLETED",
    liveUrl: "https://github.com/BriranSus/TranscriptX-FE"
  },
  {
    id: 1,
    num: "02",
    title: "BRAIN-TUMOR-NET",
    subtitle: "Brain Tumor Detection Web Application",
    accent: "#00f5c4",
    type: "Frontend + Machine Learning Engineer",
    year: "2025",
    desc: "Brain Tumor Net is a web-based application that is integrated with Artificial Intelligence to assist in the detection of brain tumors from medical imaging data. The system leverage deep learning model to analyze MRI scans, helping patients better understand their brain condition.",
    tags: ["React", "TypeScript", "Python", "TailwindCSS"],
    img: "/projects/braintumornet.jpeg",
    status: "COMPLETED",
    liveUrl: "https://github.com/BriranSus/Brain-Tumor-Net-FE",
  },
  {
    id: 2,
    num: "03",
    title: "HYDROSENSE",
    subtitle: "Potable Water Detection Web Application",
    accent: "#b75fff",
    type: "Frontend",
    year: "2024",
    desc: "HydroSense is an AI-Integrated website to predict whether water is potable (drinkable) or not.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    img: "/projects/hydrosense.webp",
    status: "COMPLETED",
    liveUrl: "https://github.com/BriranSus/HydroSense-FE",
  },
];
