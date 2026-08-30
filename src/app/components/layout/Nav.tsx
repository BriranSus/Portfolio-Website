import { useState, useEffect, useRef } from "react";
import { MagBtn } from "../common/MagBtn";
import {
  Anchor,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Award,
  Mail,
  MoreHorizontal,
} from "lucide-react";

export interface NavDestination {
  id: string;
  code: string;
  label: string;
  icon?: any;
}

const DESTINATIONS: NavDestination[] = [
  { id: "home", code: "01", label: "HOME", icon: Anchor },
  { id: "about", code: "02", label: "ABOUT", icon: User },
  { id: "experience", code: "03", label: "EXPERIENCE", icon: Briefcase },
  { id: "projects", code: "04", label: "PROJECTS", icon: FolderGit2 },
  { id: "stack", code: "05", label: "STACK", icon: Cpu },
  { id: "certificates", code: "06", label: "CERTS", icon: Award },
  { id: "contact", code: "07", label: "CONTACT", icon: Mail },
];

const MOBILE_PRIMARY_TABS = [
  { id: "home", label: "Home", code: "01", icon: Anchor },
  { id: "about", label: "About", code: "02", icon: User },
  { id: "experience", label: "Exp", code: "03", icon: Briefcase },
  { id: "projects", label: "Projects", code: "04", icon: FolderGit2 },
];

const MOBILE_MORE_TABS = [
  { id: "stack", label: "Tech Stack", desc: "Languages & Frameworks", icon: Cpu },
  { id: "certificates", label: "Credentials", desc: "Honors & Certifications", icon: Award },
  { id: "contact", label: "Contact", desc: "Get In Touch Directly", icon: Mail },
];

export function Nav({
  ready,
  activeIndex = 0,
  onSelectSection,
  scale = 1,
}: {
  ready: boolean;
  activeIndex?: number;
  onSelectSection?: (index: number) => void;
  scale?: number;
}) {
  const [divingTo, setDivingTo] = useState<string | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const activeId = DESTINATIONS[activeIndex]?.id || "home";
  const isMoreActive = MOBILE_MORE_TABS.some((item) => item.id === activeId);

  // Close more menu on outside click/tap
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".mobile-more-toggle")
      ) {
        setShowMoreMenu(false);
      }
    };
    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMoreMenu]);

  const autoDive = (id: string) => {
    setDivingTo(id);
    setShowMoreMenu(false);
    const idx = DESTINATIONS.findIndex((d) => d.id === id);
    if (idx !== -1 && onSelectSection) {
      onSelectSection(idx);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => setDivingTo(null), 1200);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP TOP HEADER ONLY (>= 1024px) - Completely Hidden on Mobile        */}
      {/* ========================================================================= */}
      <header
        className="hidden lg:block fixed lg:absolute top-0 inset-x-0 w-full z-50 pointer-events-auto select-none"
        style={{
          transform: ready ? "translateY(0)" : "translateY(-100%)",
          transition: "transform .8s cubic-bezier(0.16,1,0.3,1) .2s",
        }}
      >
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <button
            onClick={() => autoDive("home")}
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
                {divingTo ? `AUTO-DIVING TO ${divingTo.toUpperCase()}...` : "DESTINATION PANEL"}
              </span>
            </div>
          </button>

          {/* Desktop Destination Chips */}
          <div className="flex items-center gap-2 bg-[#000611]/80 border border-[#00f5c4]/20 p-1.5 rounded-full shadow-inner">
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
                  <span>
                    {dest.code} {dest.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="flex items-center gap-4">
            <MagBtn
              onClick={() => autoDive("contact")}
              className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-lg border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#000c1a] transition-all duration-300 shadow-[0_0_15px_rgba(0,245,196,0.2)]"
            >
              HIRE ME
            </MagBtn>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR & MORE POPUP (< 1024px)                       */}
      {/* ========================================================================= */}
      <div className="lg:hidden pointer-events-auto select-none">
        {/* Holographic More Drawer / Floating Sheet */}
        {showMoreMenu && (
          <div
            ref={moreMenuRef}
            className="fixed bottom-20 inset-x-3 max-w-sm mx-auto p-3.5 rounded-2xl bg-[#000814]/95 backdrop-blur-2xl border border-[#00f5c4]/40 shadow-[0_0_50px_rgba(0,12,26,0.95)] z-50 animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            {/* Header of Drawer */}
            <div className="flex items-center gap-2 pb-2.5 border-b border-white/10 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-pulse" />
              <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase text-[#00f5c4] font-bold">
                MORE DESTINATIONS
              </span>
            </div>

            {/* Clean List of Remaining Destination Tabs (Tech Stack, Credentials, Contact) */}
            <div className="flex flex-col gap-1.5">
              {MOBILE_MORE_TABS.map((item) => {
                const isActive = activeId === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => autoDive(item.id)}
                    className={`flex items-center p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#00f5c4]/20 border border-[#00f5c4] text-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.25)]"
                        : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isActive ? "bg-[#00f5c4]/20 text-[#00f5c4]" : "bg-white/5 text-white/60"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-left flex flex-col">
                        <span className="font-['DM_Mono'] text-xs font-bold uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="font-['DM_Mono'] text-[9px] text-white/40">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating Glassmorphic Bottom Navigation Bar */}
        <nav
          className="fixed bottom-0 inset-x-0 z-50 bg-[#000814]/90 backdrop-blur-2xl border-t border-[#00f5c4]/25 shadow-[0_-8px_30px_rgba(0,0,0,0.85)] px-3 py-2 flex items-center justify-around safe-area-bottom"
          aria-label="Mobile Navigation Bar"
        >
          {/* Primary Tabs: Always maintain active section highlight */}
          {MOBILE_PRIMARY_TABS.map((tab) => {
            const isActive = activeId === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => autoDive(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive ? "text-[#00f5c4] scale-105" : "text-white/50 hover:text-white/80"
                }`}
              >
                <div className="relative">
                  <IconComponent className={`w-5 h-5 mb-0.5 ${isActive ? "animate-pulse" : ""}`} />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]" />
                  )}
                </div>
                <span
                  className={`font-['DM_Mono'] text-[9px] uppercase tracking-wider ${
                    isActive ? "font-bold text-[#00f5c4]" : "text-white/50"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* "More" Toggle Button */}
          <button
            onClick={() => setShowMoreMenu((prev) => !prev)}
            className={`mobile-more-toggle relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
              showMoreMenu || isMoreActive
                ? "text-[#00f5c4] scale-105"
                : "text-white/50 hover:text-white/80"
            }`}
            aria-label="Toggle More Navigation Options"
          >
            <div className="relative">
              <MoreHorizontal
                className={`w-5 h-5 mb-0.5 ${
                  showMoreMenu || isMoreActive ? "animate-pulse" : ""
                }`}
              />
              {isMoreActive && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]" />
              )}
            </div>
            <span
              className={`font-['DM_Mono'] text-[9px] uppercase tracking-wider ${
                showMoreMenu || isMoreActive ? "font-bold text-[#00f5c4]" : "text-white/50"
              }`}
            >
              More
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}