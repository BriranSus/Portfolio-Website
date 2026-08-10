import { useEffect, useState } from "react";

export interface PageType {
  id: string;
  label: string;
  num: string;
}

const PAGES: PageType[] = [
  { id: "hero", label: "Hero", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "services", label: "Services", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "stack", label: "Stack", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export function PageButton() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let currentActive = "hero";

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          currentActive = sec.id;
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-40 pointer-events-auto select-none">
      {PAGES.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <div key={item.id} className="relative flex items-center group">
            {/* Tooltip on hover for inactive buttons */}
            {!isActive && (
              <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#000c1a]/90 border border-[#00f5c4]/30 text-[#edeae1] font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg backdrop-blur-md">
                {item.num} — {item.label}
              </span>
            )}

            {/* Stylized Navigation Button */}
            <button
              onClick={() => scrollTo(item.id)}
              className={`transition-all duration-500 rounded-full flex items-center justify-center font-['DM_Mono'] cursor-pointer ${
                isActive
                  ? "px-3.5 py-1.5 bg-[#00f5c4]/15 border border-[#00f5c4] text-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.35)] text-xs tracking-[0.12em] uppercase font-bold"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-[#00f5c4] hover:scale-125"
              }`}
            >
              {isActive && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-ping" />
                  <span>{item.label}</span>
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
