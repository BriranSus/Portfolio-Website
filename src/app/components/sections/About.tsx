export function About() {
  return (
    <section id="about" className="relative w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-[clamp(1.5rem,4vw,3.5rem)] items-center">
          {/* Left Box Header */}
          <div className="section-header py-4 md:py-6 pr-0 md:pr-10 border-b md:border-b-0 md:border-r border-[#00f5c4]/20">
            <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-2 text-[#00f5c4]">
              02 — ABOUT
            </div>
            <div
              className="font-['Archivo_Black'] leading-none select-none mb-[clamp(0.75rem,2vh,1.5rem)]"
              style={{
                fontSize: "clamp(3.5rem, 6.5vw, 6.5rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,245,196,0.15)",
              }}
            >
              WHO
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { l: "Full Stack Developer", c: "#00f5c4" },
                { l: "SE Student", c: "#8c00ff" },
                { l: "Problem Solver", c: "#ff2d6b" },
              ].map(({ l, c }) => (
                <div
                  key={l}
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border w-fit backdrop-blur-md"
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

          {/* Right Text Content */}
          <div className="section-content py-2 md:py-4">
            <p
              className="font-['DM_Mono'] leading-relaxed text-white/70 mb-[clamp(1rem,2.5vh,2rem)]"
              style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
            >
              I{"'"}m a <span className="text-[#edeae1] font-semibold">Software Engineering student</span> bridging elegant frontends with performant backends. I focus on clean architecture, efficient databases, and interfaces that make complex systems feel <span className="text-[#00f5c4] font-semibold">effortlessly simple</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.5rem,1.2vh,1rem)]">
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
                  className="stagger-item flex items-center gap-3 p-[clamp(0.5rem,1.2vh,0.85rem)] rounded-lg border border-white/5 bg-white/[0.02]"
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
      </div>
    </section>
  );
}
