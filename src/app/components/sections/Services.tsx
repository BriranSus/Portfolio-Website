import { SERVICES } from "../../data/servicesData";

export function Services() {
  return (
    <section id="services" className="relative w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        {/* Section Header */}
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#00f5c4]/20 mb-[clamp(1rem,2.5vh,1.75rem)]">
          <div>
            <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-2 text-[#00f5c4]">
              03 — SERVICES
            </div>
            <h2
              className="font-['Archivo_Black'] text-[#edeae1] leading-none"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
            >
              WHAT I DO<span className="text-[#ff2d6b]">.</span>
            </h2>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2.5vh,1.75rem)]">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="section-card p-[clamp(1.25rem,2.5vh,2rem)] rounded-2xl bg-[#000c1a]/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#00f5c4]/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: s.accent }}
              />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['DM_Mono'] text-xs font-bold" style={{ color: s.accent }}>
                    {s.num}
                  </span>
                  <div className="w-2 h-2 rounded-full" style={{ background: s.accent }} />
                </div>
                <h3
                  className="font-['Archivo_Black'] text-[#edeae1] mb-2 whitespace-pre-line leading-tight"
                  style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)" }}
                >
                  {s.title}
                </h3>
                <p className="font-['DM_Mono'] text-xs text-white/60 mb-4 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-['DM_Mono'] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
