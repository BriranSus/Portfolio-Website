import { SERVICES } from "../../data/servicesData";

export function Services() {
  return (
    <section id="services" className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        {/* Section Header */}
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#00f5c4]/20 mb-8 md:mb-10">
          <div>
            <div className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-[#00f5c4]">
              03 — SERVICES
            </div>
            <h2 className="font-['Archivo_Black'] text-4xl sm:text-6xl md:text-7xl text-[#edeae1] leading-none">
              WHAT I DO<span className="text-[#ff2d6b]">.</span>
            </h2>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="section-card p-6 md:p-8 rounded-2xl bg-[#000c1a]/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#00f5c4]/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              <div
                className="absolute top-0 right-0 w-36 h-36 pointer-events-none rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: s.accent }}
              />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['DM_Mono'] text-xs md:text-sm font-bold" style={{ color: s.accent }}>
                    {s.num}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.accent }} />
                </div>
                <h3 className="font-['Archivo_Black'] text-xl sm:text-2xl md:text-3xl text-[#edeae1] mb-3 whitespace-pre-line leading-tight">
                  {s.title}
                </h3>
                <p className="font-['DM_Mono'] text-xs md:text-sm text-white/60 mb-6 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-3 border-t border-white/5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-['DM_Mono'] text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white/70"
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
