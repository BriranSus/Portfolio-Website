import React from "react";

interface SectionNavProps {
  activeIndex: number;
  onSelectSection: (index: number) => void;
  sections?: { id: string; label: string }[];
  scale?: number;
}

const DEFAULT_SECTIONS = [
  { id: "hero", label: "01 — HERO" },
  { id: "about", label: "02 — ABOUT" },
  { id: "services", label: "03 — SERVICES" },
  { id: "projects", label: "04 — PROJECTS" },
  { id: "stack", label: "05 — STACK" },
  { id: "contact", label: "06 — CONTACT" },
];

export function SectionNav({
  activeIndex,
  onSelectSection,
  sections = DEFAULT_SECTIONS,
  scale = 1,
}: SectionNavProps) {
  return (
    <nav
      className="fixed lg:absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 pointer-events-auto select-none"
      aria-label="Section Navigation"
    >
      {sections.map((section, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={section.id}
            onClick={() => onSelectSection(idx)}
            className="group relative flex items-center gap-3 py-1 cursor-pointer focus:outline-none"
            title={section.label}
          >
            {/* Tooltip Label on Hover */}
            <span
              className={`font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none px-2 py-0.5 rounded bg-[#000c1a]/80 backdrop-blur-md border border-white/10 ${isActive
                  ? "opacity-100 translate-x-0 text-[#00f5c4] border-[#00f5c4]/40"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white/60"
                }`}
            >
              {section.label}
            </span>

            {/* Indicator Dot / Pill */}
            <div className="relative flex items-center justify-center w-5 h-5">
              <span
                className={`block rounded-full transition-all duration-500 ${isActive
                    ? "w-3 h-3 bg-[#00f5c4] shadow-[0_0_12px_rgba(0,245,196,0.8)] scale-110"
                    : "w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-125"
                  }`}
              />
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-[#00f5c4] animate-ping opacity-40" />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
