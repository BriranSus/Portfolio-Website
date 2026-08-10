import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-center">
          {/* Left Box */}
          <div className="py-8 pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-[#00f5c4]/20">
            <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-3 text-[#00f5c4]">
              01 — ABOUT
            </div>
            <div
              className="font-['Archivo_Black'] text-6xl md:text-8xl leading-none select-none mb-6"
              style={{ color: "transparent", WebkitTextStroke: "1px rgba(0,245,196,0.15)" }}
            >
              WHO
            </div>
            <div className="flex flex-col gap-3">
              {[
                { l: "Full Stack Developer", c: "#00f5c4" },
                { l: "SE Student", c: "#8c00ff" },
                { l: "Problem Solver", c: "#ff2d6b" },
              ].map(({ l, c }) => (
                <div
                  key={l}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border w-fit backdrop-blur-md"
                  style={{ border: `1px solid ${c}33`, background: `${c}08` }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                  <span className="font-['DM_Mono'] text-xs tracking-[0.1em]" style={{ color: c }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Text */}
          <div className="py-4">
            <p className="font-['DM_Mono'] text-sm md:text-base leading-relaxed mb-8 text-white/70">
              I{"'"}m a <span className="text-[#edeae1] font-semibold">Software Engineering student</span> bridging elegant frontends with performant backends. I focus on clean architecture, efficient databases, and interfaces that make complex systems feel <span className="text-[#00f5c4] font-semibold">effortlessly simple</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Problem decomposition",
                "System architecture",
                "Database design",
                "API contracts",
                "Component systems",
                "Performance profiling",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <span className="font-['DM_Mono'] text-xs font-bold" style={{ color: ["#00f5c4", "#8c00ff", "#ff2d6b"][i % 3] }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-['DM_Mono'] text-xs text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
