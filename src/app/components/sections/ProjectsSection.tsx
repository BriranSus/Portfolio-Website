import { useState } from "react";
import { PROJECTS } from "../../data/projectsData";
import { ChevronLeft, ChevronRight, ArrowUpRight, Radio } from "lucide-react";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = PROJECTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  };

  return (
    <section id="projects" className="relative w-full h-full flex flex-col justify-between py-4 md:py-8 max-w-[1440px] mx-auto overflow-hidden">
      {/* Top Header HUD */}
      <div className="section-header w-full flex items-center justify-between z-20 relative mb-3">
        <div className="flex items-center gap-4">
          <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase text-[#00f5c4] flex items-center gap-2 bg-[#000c1a]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#00f5c4]/30">
            <Radio className="w-3.5 h-3.5 text-[#00f5c4] animate-pulse" />
            04 — PROJECTS GALLERY
          </div>
          <div className="hidden sm:block text-xs font-['DM_Mono'] text-white/50 bg-[#000c1a]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
            [ HABITAT BAY 0{activeIndex + 1} / 0{PROJECTS.length} ]
          </div>
        </div>

        {/* Interactive Carousel Navigation */}
        <div className="flex items-center gap-2 bg-[#000c1a]/90 backdrop-blur-md border border-[#00f5c4]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,245,196,0.15)]">
          <button
            onClick={handlePrev}
            className="text-white/70 hover:text-[#00f5c4] transition-colors p-1 cursor-pointer"
            title="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5 items-center px-1">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]"
                    : "w-1.5 bg-white/20 hover:bg-white/50"
                }`}
                title={`Go to ${proj.title}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="text-white/70 hover:text-[#00f5c4] transition-colors p-1 cursor-pointer"
            title="Next Project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Active Project Card Showcase */}
      <div className="section-card flex-1 w-full my-auto rounded-2xl relative overflow-hidden border border-[#00f5c4]/30 bg-[#000c1a]/85 backdrop-blur-2xl flex flex-col justify-between p-[clamp(1.25rem,2.8vh,2.25rem)] shadow-[0_0_40px_rgba(0,12,26,0.9)] transition-all duration-500 hover:border-[#00f5c4]/60">
        {/* Background Image & Submarine Glass Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeProject.img}
            alt={activeProject.subtitle}
            className="w-full h-full object-cover opacity-20 transition-all duration-700 scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(0,12,26,0.95) 0%, rgba(0,12,26,0.8) 55%, ${activeProject.accent}25 100%)`,
            }}
          />
        </div>

        {/* Card Top Details */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-baseline gap-3">
            <span
              className="font-['Archivo_Black']"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.5rem)",
                color: "transparent",
                WebkitTextStroke: `1px ${activeProject.accent}aa`,
              }}
            >
              {activeProject.num}
            </span>
            <span className="font-['DM_Mono'] text-xs tracking-widest text-white/40 uppercase">
              / 0{PROJECTS.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="font-['DM_Mono'] text-[10px] md:text-xs tracking-[0.2em] uppercase px-3 py-1 rounded border backdrop-blur-md"
              style={{
                borderColor: `${activeProject.accent}55`,
                color: activeProject.accent,
                backgroundColor: `${activeProject.accent}15`,
              }}
            >
              {activeProject.type}
            </span>
            <span className="font-['DM_Mono'] text-xs text-white/40">{activeProject.year}</span>
          </div>
        </div>

        {/* Card Content & Description */}
        <div className="relative z-10 my-[clamp(0.5rem,1.8vh,1.25rem)]">
          <h3
            className="font-['Archivo_Black'] text-[#edeae1] mb-1.5 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 3rem)" }}
          >
            {activeProject.title}
          </h3>
          <p className="font-['DM_Mono'] text-xs md:text-sm text-[#00f5c4] font-medium mb-3">
            {activeProject.subtitle}
          </p>
          <p
            className="font-['DM_Mono'] text-white/70 max-w-3xl leading-relaxed mb-4 line-clamp-3"
            style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
          >
            {activeProject.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {activeProject.tags.map((t) => (
              <span
                key={t}
                className="font-['DM_Mono'] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 font-['DM_Mono'] text-xs text-white/40">
            <span>STATUS: COMPLETED</span>
          </div>

          <a
            href={activeProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-['DM_Mono'] text-xs tracking-wider uppercase px-4 py-2 rounded-lg border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] transition-all duration-300 shadow-[0_0_15px_rgba(0,245,196,0.2)]"
          >
            <span>EXPLORE PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
