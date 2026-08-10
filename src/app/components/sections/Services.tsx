import { motion } from "framer-motion";
import { SERVICES } from "../../data/servicesData";

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#00f5c4]/20 mb-8">
          <div>
            <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-2 text-[#00f5c4]">
              02 — SERVICES
            </div>
            <h2 className="font-['Archivo_Black'] text-4xl md:text-6xl text-[#edeae1] leading-none">
              WHAT I DO<span className="text-[#ff2d6b]">.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#000c1a]/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#00f5c4]/40 transition-all duration-500 shadow-xl"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: s.accent }}
              />
              <div className="flex items-center justify-between mb-4">
                <span className="font-['DM_Mono'] text-xs font-bold" style={{ color: s.accent }}>
                  {s.num}
                </span>
                <div className="w-2 h-2 rounded-full" style={{ background: s.accent }} />
              </div>
              <h3 className="font-['Archivo_Black'] text-xl md:text-2xl text-[#edeae1] mb-2 whitespace-pre-line leading-tight">
                {s.title}
              </h3>
              <p className="font-['DM_Mono'] text-xs text-white/50 mb-6 leading-relaxed">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-['DM_Mono'] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
