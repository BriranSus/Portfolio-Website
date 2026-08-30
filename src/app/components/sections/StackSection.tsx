import { motion } from "framer-motion";
import { TECH } from "../../data/techStackData";

export function StackSection() {
  const items = [
    "JAVASCRIPT",
    "TYPESCRIPT",
    "REACT.JS",
    "NEXT.JS",
    "TAILWIND CSS",
    "PYTHON",
    "GIT",
    "MYSQL",
    "POSTGRESQL",
    "PHP",
    "LARAVEL",
    "FIGMA",
  ];
  const rep = [...items, ...items, ...items, ...items];

  return (
    <section
      id="stack"
      className="relative w-full h-full flex flex-col justify-center py-2 sm:py-6 md:py-10 max-w-[1700px] mx-auto overflow-hidden"
    >
      <div className="w-full my-auto">
        {/* Infinite Ambient Marquee */}
        <div className="w-full py-2 sm:py-3 border-y border-[#00f5c4]/10 bg-[#00f5c4]/[0.02] mb-3 sm:mb-6 md:mb-8 overflow-hidden flex select-none">
          <motion.div
            className="flex gap-8 sm:gap-12 whitespace-nowrap flex-shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {rep.map((item, i) => (
              <span
                key={i}
                className="font-['DM_Mono'] text-[10px] sm:text-xs tracking-[0.3em] uppercase flex-shrink-0"
                style={{
                  color:
                    i % 3 === 0
                      ? "rgba(0,245,196,0.6)"
                      : i % 3 === 1
                      ? "rgba(183,95,255,0.5)"
                      : "rgba(237,234,225,0.25)",
                }}
              >
                {item}&nbsp;&nbsp;—
              </span>
            ))}
          </motion.div>
        </div>

        {/* Section Header */}
        <div className="px-4 sm:px-6 md:px-16 w-full">
          <div className="section-header pb-2 sm:pb-4 md:pb-6 border-b border-[#00f5c4]/20 mb-3 sm:mb-6 md:mb-10">
            <div className="font-['DM_Mono'] text-[11px] md:text-sm tracking-[0.3em] uppercase mb-1.5 md:mb-3 text-[#00f5c4]">
              05 — STACK
            </div>
            <h2 className="font-['Archivo_Black'] text-2xl sm:text-5xl md:text-7xl text-[#edeae1] leading-none">
              TECH & TOOLS
            </h2>
          </div>

          {/* Tools Grid: 3 cols on mobile, 6 cols on desktop */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3.5 md:gap-6">
            {TECH.map(({ name, color, svg }) => (
              <div
                key={name}
                className="section-card group flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/5 bg-[#000c1a]/60 backdrop-blur-md cursor-default transition-all duration-300 hover:scale-105 hover:border-white/20"
                style={{
                  borderColor: "rgba(237,234,225,0.06)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${color}0d`;
                  el.style.borderColor = `${color}33`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(0,12,26,0.6)";
                  el.style.borderColor = "rgba(237,234,225,0.06)";
                }}
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {svg}
                </div>
                <span className="font-['DM_Mono'] text-[8px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors text-center truncate w-full">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}