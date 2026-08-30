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
  { id: "experience", label: "03 — EXPERIENCE" },
  { id: "projects", label: "04 — PROJECTS" },
  { id: "stack", label: "05 — STACK" },
  { id: "certificates", label: "06 — CERTS" },
  { id: "contact", label: "07 — CONTACT" },
];

export function SectionNav({
  activeIndex,
  onSelectSection,
  sections = DEFAULT_SECTIONS,
  scale = 1,
}: SectionNavProps) {
  return (
    <nav
      className="hidden md:flex fixed lg:absolute right-4 lg:right-6 top-1/2 z-40 flex-col items-end gap-2.5 pointer-events-auto select-none transition-transform duration-75"
      style={{
        transform: scale !== 1 ? `translateY(-50%) scale(${scale})` : "translateY(-50%)",
        transformOrigin: "center right",
      }}
      aria-label="Section Navigation"
    >
      {sections.map((section, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div key={section.id} className="relative flex items-center justify-end py-0.5">
            <button
              onClick={() => onSelectSection(idx)}
              className="group relative flex items-center justify-center w-5 h-5 rounded-full cursor-pointer focus:outline-none"
              aria-label={section.label}
            >
              {/* Tooltip Label: ONLY triggers when hovering directly on the button */}
              <span className="pointer-events-none select-none absolute right-full mr-2.5 font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase transition-all duration-200 px-2.5 py-1 rounded-md bg-[#000c1a]/95 backdrop-blur-md border border-[#00f5c4]/45 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#00f5c4] whitespace-nowrap shadow-[0_0_20px_rgba(0,12,26,0.9)]">
                {section.label}
              </span>

              {/* Navigation Bullet Dot */}
              <span
                className={`block rounded-full transition-all duration-300 pointer-events-none ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#00f5c4] shadow-[0_0_12px_rgba(0,245,196,0.8)] scale-110"
                    : "w-1.5 h-1.5 bg-white/30 group-hover:bg-white/80 group-hover:scale-125"
                }`}
              />

              {isActive && (
                <span className="absolute inset-0 rounded-full border border-[#00f5c4] animate-ping opacity-40 pointer-events-none" />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}