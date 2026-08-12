export function About() {
  return (
    <section id="about" className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-center">
          {/* Left Box Header */}
          <div className="section-header py-4 md:py-8 pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-[#00f5c4]/20">
            <div className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-[#00f5c4]">
              02 — ABOUT
            </div>
            <div
              className="font-['Archivo_Black'] text-5xl md:text-8xl leading-none select-none mb-6"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #00f5c4",
              }}
            >
              MY ROLE
            </div>
            <div className="flex flex-col gap-3">
              {[
                { l: "Full Stack Developer", c: "#ff2d6b" },
                { l: "CS Student", c: "#b75fff" },
                { l: "Machine Learning Engineer", c: "#00f5c4" },
              ].map(({ l, c }) => (
                <div
                  key={l}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border w-fit backdrop-blur-md"
                  style={{ border: `1px solid ${c}33`, background: `${c}08` }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  <span className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.1em]" style={{ color: c }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Text Content */}
          <div className="section-content py-4 md:py-6">
            <p className="font-['DM_Mono'] text-sm md:text-lg leading-relaxed text-white/70 mb-8">
              I{"'"}m a <span className="text-[#edeae1] font-semibold">Computer Science Student minoring in Intelligent Systems</span>, passionate about Full-Stack Web Engineering and Artificial Intelligence. With hands-on experience using React.js, Laravel API, and Python, I enjoy turning complex data and ideas into <span className="text-[#00f5c4] font-semibold">functional and user-friendly applications.</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {[
                "Problem Solving",
                "System Design",
                "Database Management",
                "RESTful API Development",
                "Frontend Engineering",
                "AI Application Development",
              ].map((item, i) => (
                <div
                  key={item}
                  className="stagger-item flex items-center gap-3.5 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <span className="font-['DM_Mono'] text-sm font-bold" style={{ color: ["#00f5c4", "#b75fff", "#ff2d6b"][i % 3] }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-['DM_Mono'] text-xs md:text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
