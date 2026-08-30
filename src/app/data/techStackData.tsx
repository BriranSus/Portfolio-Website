import { getAssetUrl } from '../utils/assetUrl';
import React from "react";

export interface TechItem {
  name: string;
  color: string;
  svg: React.ReactNode;
}

export const TECH: TechItem[] = [
  {
    name: "JavaScript",
    color: "#F7DF1E",
    svg: <img src={getAssetUrl("/stack_logos/javascript.webp")} alt="JavaScript" className="w-full h-full object-contain" />,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    svg: <img src={getAssetUrl("/stack_logos/typescript.webp")} alt="TypeScript" className="w-full h-full object-contain" />,
  },
  {
    name: "React.js",
    color: "#61DAFB",
    svg: <img src={getAssetUrl("/stack_logos/react.webp")} alt="React.js" className="w-full h-full object-contain" />,
  },
  {
    name: "Next.js",
    color: "#FFFFFF",
    svg: <img src={getAssetUrl("/stack_logos/next.webp")} alt="Next.js" className="w-full h-full object-contain" />,
  },
  {
    name: "Tailwind CSS",
    color: "#38BDF8",
    svg: <img src={getAssetUrl("/stack_logos/tailwind.webp")} alt="Tailwind CSS" className="w-full h-full object-contain" />,
  },
  {
    name: "Python",
    color: "#3776AB",
    svg: <img src={getAssetUrl("/stack_logos/python.webp")} alt="Python" className="w-full h-full object-contain" />,
  },
  {
    name: "Git",
    color: "#F05032",
    svg: <img src={getAssetUrl("/stack_logos/git.webp")} alt="Git" className="w-full h-full object-contain" />,
  },
  {
    name: "MySQL",
    color: "#00618A",
    svg: <img src={getAssetUrl("/stack_logos/mysql.webp")} alt="MySQL" className="w-full h-full object-contain" />,
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    svg: <img src={getAssetUrl("/stack_logos/postgresql.webp")} alt="PostgreSQL" className="w-full h-full object-contain" />,
  },
  {
    name: "PHP",
    color: "#777BB4",
    svg: <img src={getAssetUrl("/stack_logos/php.webp")} alt="PHP" className="w-full h-full object-contain" />,
  },
  {
    name: "Laravel",
    color: "#FF2D20",
    svg: <img src={getAssetUrl("/stack_logos/laravel.webp")} alt="Laravel" className="w-full h-full object-contain" />,
  },
  {
    name: "Figma",
    color: "#F24E1E",
    svg: <img src={getAssetUrl("/stack_logos/figma.webp")} alt="Figma" className="w-full h-full object-contain" />,
  },
];
