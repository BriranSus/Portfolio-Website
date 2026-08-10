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
    <section id="stack" className="relative py-20 md:py-28 w-full overflow-hidden">
      {/* Ticker Top */}
      <div className="w-full py-3 border-y border-[#00f5c4]/10 bg-[#00f5c4]/[0.02] mb-12 overflow-hidden flex select-none">
        <motion.div
          className="flex gap-10 whitespace-nowrap flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {rep.map((item, i) => (
            <span
              key={i}
              className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase flex-shrink-0"
              style={{
                color:
                  i % 3 === 0
                    ? "rgba(0,245,196,0.6)"
                    : i % 3 === 1
                    ? "rgba(140,0,255,0.5)"
                    : "rgba(237,234,225,0.25)",
              }}
            >
              {item}&nbsp;&nbsp;—
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 md:px-12 max-w-[1400px] mx-auto w-full"
      >
        <div className="pb-6 border-b border-[#00f5c4]/20 mb-8">
          <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-2 text-[#00f5c4]">
            04 — STACK
          </div>
          <h2 className="font-['Archivo_Black'] text-4xl md:text-6xl text-[#edeae1]">
            TOOLS<span className="text-[#8c00ff]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {TECH.map(({ name, color, svg }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/5 bg-[#000c1a]/60 backdrop-blur-md cursor-default transition-all duration-300 hover:scale-105 hover:border-white/20"
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
              <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">{svg}</div>
              <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
