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
    <section id="stack" className="relative w-full h-full flex flex-col justify-center py-6 md:py-10 max-w-[1700px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        <div className="w-full py-3 border-y border-[#00f5c4]/10 bg-[#00f5c4]/[0.02] mb-8 overflow-hidden flex select-none">
          <motion.div
            className="flex gap-12 whitespace-nowrap flex-shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {rep.map((item, i) => (
              <span
                key={i}
                className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase flex-shrink-0"
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

        <div className="px-6 md:px-16 w-full">
          <div className="section-header pb-6 border-b border-[#00f5c4]/20 mb-8 md:mb-10">
            <div className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-[#00f5c4]">
              05 — STACK
            </div>
            <h2 className="font-['Archivo_Black'] text-4xl sm:text-6xl md:text-7xl text-[#edeae1] leading-none">
              TOOLS
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {TECH.map(({ name, color, svg }) => (
              <div
                key={name}
                className="section-card group flex flex-col items-center justify-center gap-3 p-5 md:p-6 rounded-2xl border border-white/5 bg-[#000c1a]/60 backdrop-blur-md cursor-default transition-all duration-300 hover:scale-105 hover:border-white/20"
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
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {svg}
                </div>
                <span className="font-['DM_Mono'] text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
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
