import { useState, useRef } from "react";
import { PROJECTS } from "../../data/projectsData";
import { ChevronLeft, ChevronRight, ArrowUpRight, Radio } from "lucide-react";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    const newIdx = Math.max(0, Math.min(PROJECTS.length - 1, idx));
    setActiveIndex(newIdx);
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const gap = 32; // gap-8 (32px)
      scrollContainerRef.current.scrollTo({
        left: newIdx * (containerWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const gap = 32;
      const scrollPos = scrollContainerRef.current.scrollLeft;
      const newIdx = Math.round(scrollPos / (containerWidth + gap));
      if (newIdx !== activeIndex && newIdx >= 0 && newIdx < PROJECTS.length) {
        setActiveIndex(newIdx);
      }
    }
  };

  // Convert vertical scroll on cards into horizontal scrolling inside projects slider
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isAtLeftLimit = container.scrollLeft <= 5;
      const isAtRightLimit = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      if ((e.deltaY > 0 && !isAtRightLimit) || (e.deltaY < 0 && !isAtLeftLimit)) {
        e.stopPropagation();
        container.scrollBy({ left: e.deltaY > 0 ? container.clientWidth : -container.clientWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="projects" className="relative w-full h-full flex flex-col justify-between px-6 md:px-16 py-6 md:py-10 max-w-[1700px] mx-auto overflow-hidden">
      
      {/* Top Header HUD Navigation */}
      <div className="section-header w-full flex items-center justify-between z-20 relative mb-4">
        <div className="flex items-center gap-4">
          <div className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase text-[#00f5c4] flex items-center gap-2 bg-[#000c1a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#00f5c4]/30">
            <Radio className="w-4 h-4 text-[#00f5c4] animate-pulse" />
            04 — PROJECTS GALLERY
          </div>
          <div className="hidden sm:block text-xs md:text-sm font-['DM_Mono'] text-white/50 bg-[#000c1a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            [ 0{activeIndex + 1} / 0{PROJECTS.length} ]
          </div>
        </div>

        {/* Interactive Carousel & Arrow Navigation */}
        <div className="flex items-center gap-2 bg-[#000c1a]/90 backdrop-blur-md border border-[#00f5c4]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,245,196,0.15)]">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`transition-colors p-1 ${
              activeIndex === 0 ? "text-white/20 cursor-not-allowed" : "text-white/70 hover:text-[#00f5c4] cursor-pointer"
            }`}
            title="Previous Project"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>

          <div className="flex gap-1.5 items-center px-1">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-[#00f5c4] shadow-[0_0_10px_#00f5c4]"
                    : "w-2 bg-white/20 hover:bg-white/50"
                }`}
                title={`Go to ${proj.title}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={activeIndex === PROJECTS.length - 1}
            className={`transition-colors p-1 ${
              activeIndex === PROJECTS.length - 1 ? "text-white/20 cursor-not-allowed" : "text-white/70 hover:text-[#00f5c4] cursor-pointer"
            }`}
            title="Next Project"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Snapping Scroll Track (Original Full Size Card w-full min-w-full h-full) */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 focus:outline-none scroll-smooth flex-1 w-full items-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="w-full min-w-full h-full flex-shrink-0 snap-start snap-always section-card rounded-2xl relative overflow-hidden border border-[#00f5c4]/30 bg-[#000c1a]/85 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-10 shadow-[0_0_40px_rgba(0,12,26,0.9)] transition-all duration-500 hover:border-[#00f5c4]/60"
          >
            {/* Background Image & Submarine Glass Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={project.img}
                alt={project.subtitle}
                className="w-full h-full object-cover opacity-20 transition-all duration-700 scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(0,12,26,0.95) 0%, rgba(0,12,26,0.8) 55%, ${project.accent}25 100%)`,
                }}
              />
            </div>

            {/* Card Top Details */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-['Archivo_Black'] text-3xl md:text-6xl"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${project.accent}aa`,
                  }}
                >
                  {project.num}
                </span>
                <span className="font-['DM_Mono'] text-xs md:text-sm tracking-widest text-white/40 uppercase">
                  / 0{PROJECTS.length}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-['DM_Mono'] text-[10px] md:text-xs tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-lg border backdrop-blur-md font-bold"
                  style={{
                    borderColor: `${project.accent}55`,
                    color: project.accent,
                    backgroundColor: `${project.accent}15`,
                  }}
                >
                  {project.type}
                </span>
                <span className="font-['DM_Mono'] text-xs md:text-sm text-white/40">{project.year}</span>
              </div>
            </div>

            {/* Card Content & Description */}
            <div className="relative z-10 my-4 md:my-6">
              <h3 className="font-['Archivo_Black'] text-2xl sm:text-4xl md:text-5xl text-[#edeae1] mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="font-['DM_Mono'] text-xs sm:text-sm md:text-base text-[#00f5c4] font-medium mb-4">
                {project.subtitle}
              </p>
              <p className="font-['DM_Mono'] text-xs md:text-sm text-white/70 max-w-4xl leading-relaxed mb-6">
                {project.desc}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-['DM_Mono'] text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 font-['DM_Mono'] text-xs md:text-sm text-white/40">
                {project.status}
              </div>

              <a
                href={project.liveUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-['DM_Mono'] text-xs md:text-sm tracking-wider uppercase px-5 py-2.5 rounded-xl border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] transition-all duration-300 shadow-[0_0_20px_rgba(0,245,196,0.2)]"
              >
                <span>EXPLORE PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
