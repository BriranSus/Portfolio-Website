import { useState, useEffect } from "react";
import { MagBtn } from "../common/MagBtn";
import { Anchor } from "lucide-react";

export interface NavDestination {
  id: string;
  code: string;
  label: string;
  depth: string;
}

const DESTINATIONS: NavDestination[] = [
  { id: "hero", code: "00", label: "HERO", depth: "12M" },
  { id: "about", code: "01", label: "ABOUT", depth: "60M" },
  { id: "services", code: "02", label: "SERVICES", depth: "78M" },
  { id: "projects", code: "03", label: "PROJECTS", depth: "110M" },
  { id: "stack", code: "04", label: "STACK", depth: "250M" },
  { id: "contact", code: "05", label: "CONTACT", depth: "260M" },
];

export function Nav({ ready }: { ready: boolean }) {
  const [activeId, setActiveId] = useState("hero");
  const [divingTo, setDivingTo] = useState<string | null>(null);

  // Active section tracking via scroll position
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 3;
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "hero";

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          current = sec.id;
        }
      });

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const autoDive = (id: string) => {
    setDivingTo(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setDivingTo(null), 1200);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 pointer-events-auto select-none"
      style={{
        transform: ready ? "translateY(0)" : "translateY(-100%)",
        transition: "transform .8s cubic-bezier(0.16,1,0.3,1) .2s",
      }}
    >
      {/* Holographic Header Bar */}
      <div className="bg-[#000c1a]/90 backdrop-blur-xl border-b border-[#00f5c4]/30 px-4 md:px-8 py-2.5 flex items-center justify-between shadow-[0_4px_25px_rgba(0,245,196,0.15)]">
        
        {/* Left: Cab & Auto-Dive System Status */}
        <button
          onClick={() => autoDive("hero")}
          className="flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00f5c4]/10 border border-[#00f5c4]/40 flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(0,245,196,0.2)]">
            <Anchor className="w-4 h-4 text-[#00f5c4] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-['DM_Mono'] text-[10px] tracking-[0.25em] text-[#00f5c4] uppercase font-bold flex items-center gap-1.5">
              ◈ NAVIGATION SYSTEM
            </span>
            <span className="font-['DM_Mono'] text-[9px] text-white/50 tracking-wider">
              {divingTo ? `AUTO-DIVING TO [${divingTo.toUpperCase()}]...` : "DESTINATION PANEL"}
            </span>
          </div>
        </button>

        {/* Center: Holographic Destination Buttons */}
        <div className="hidden lg:flex items-center gap-2 bg-[#000611]/80 border border-[#00f5c4]/20 p-1.5 rounded-full shadow-inner">
          {DESTINATIONS.map((dest) => {
            const isActive = activeId === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => autoDive(dest.id)}
                className={`relative px-3.5 py-1.5 rounded-full font-['DM_Mono'] text-[11px] tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#00f5c4]/20 border border-[#00f5c4] text-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.35)] font-bold scale-105"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-ping" />
                )}
                <span>{dest.code} {dest.label}</span>
                <span className="text-[9px] opacity-40">[{dest.depth}]</span>
              </button>
            );
          })}
        </div>

        {/* Right: CTA Hire Me Button */}
        <div className="flex items-center gap-4">
          <MagBtn
            onClick={() => autoDive("contact")}
            className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-lg border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#000c1a] transition-all duration-300 shadow-[0_0_15px_rgba(0,245,196,0.2)]"
          >
            HIRE ME
          </MagBtn>
        </div>

      </div>

      {/* Mobile Holographic Destination Bar (Medium & Small Screens) */}
      <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-2 bg-[#000a16]/95 border-b border-[#00f5c4]/20 no-scrollbar">
        {DESTINATIONS.map((dest) => {
          const isActive = activeId === dest.id;
          return (
            <button
              key={dest.id}
              onClick={() => autoDive(dest.id)}
              className={`flex-shrink-0 px-3 py-1 rounded-full font-['DM_Mono'] text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00f5c4]/20 border border-[#00f5c4] text-[#00f5c4] font-bold"
                  : "bg-white/5 border border-white/10 text-white/60"
              }`}
            >
              {dest.code} {dest.label} [{dest.depth}]
            </button>
          );
        })}
      </div>
    </header>
  );
}
