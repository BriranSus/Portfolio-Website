import { getAssetUrl } from '../../utils/assetUrl';
import React, { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Radio, ExternalLink } from "lucide-react";
import { PROJECTS } from "../../data/projectsData";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[index] as HTMLElement;
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROJECTS.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const centerPos = container.scrollLeft + container.clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const diff = Math.abs(centerPos - elCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });

      if (closestIdx !== activeIndex) {
        setActiveIndex(closestIdx);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isAtLeftLimit = container.scrollLeft <= 5;
      const isAtRightLimit =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      if ((e.deltaY > 0 && !isAtRightLimit) || (e.deltaY < 0 && !isAtLeftLimit)) {
        e.stopPropagation();
        container.scrollBy({
          left: e.deltaY > 0 ? container.clientWidth : -container.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full h-full flex flex-col justify-center px-3 sm:px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* MOBILE VIEW (<= 768px): Centered 2-Column Scrollable Small Cards          */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col w-full my-auto justify-center">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#00f5c4]/20 mb-2.5">
          <div>
            <div className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#00f5c4] flex items-center gap-1.5">
              04 — PROJECTS
            </div>
            <h2 className="font-['Archivo_Black'] text-xl text-[#edeae1] leading-tight">
              FEATURED WORK
            </h2>
          </div>
          <div className="font-['DM_Mono'] text-[10px] text-white/50 bg-[#000c1a]/80 px-2.5 py-1 rounded-lg border border-white/10">
            {PROJECTS.length} PROJECTS
          </div>
        </div>

        {/* 2-Column Scrollable Small Cards Grid Centered */}
        <div
          className="grid grid-cols-2 gap-2.5 overflow-y-auto max-h-[56dvh] sm:max-h-[62dvh] no-scrollbar pr-0.5 pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#000c1a]/85 backdrop-blur-xl border border-white/10 p-2.5 shadow-lg transition-all duration-300 hover:border-[#00f5c4]/50 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-full blur-xl opacity-20"
                style={{ background: project.accent }}
              />

              {/* Top: Square Thumbnail Image Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#000611] border border-white/10 mb-2">
                <img
                  src={getAssetUrl(project.img)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000c1a] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Year Badge */}
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded font-['DM_Mono'] text-[8px] bg-[#000c1a]/90 backdrop-blur-md border border-white/10 text-white/60">
                  {project.year}
                </div>
              </div>

              {/* Middle: Content Information */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-['Archivo_Black'] text-xs text-[#edeae1] leading-tight line-clamp-1 mb-0.5 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-['DM_Mono'] text-[9px] text-[#00f5c4] font-medium line-clamp-1 mb-1.5">
                    {project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="font-['DM_Mono'] text-[7.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Explore Link Button */}
                <a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-2 rounded-lg border border-[#00f5c4]/40 bg-[#00f5c4]/10 text-[#00f5c4] font-['DM_Mono'] text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-[#00f5c4] hover:text-[#020817] transition-all shadow-[0_0_10px_rgba(0,245,196,0.15)] cursor-pointer mt-1"
                >
                  <span>Explore</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (> 768px): Full Horizontal Snapping Card Slider              */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col w-full h-full justify-between">
        {/* Desktop Header Bar */}
        <div className="section-header w-full flex items-center justify-between z-20 relative mb-4 pr-16">
          <div className="flex items-center gap-4">
            <div className="font-['DM_Mono'] text-sm tracking-[0.3em] uppercase text-[#00f5c4] flex items-center gap-2 bg-[#000c1a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#00f5c4]/30 select-none pointer-events-none">
              04 — PROJECTS
            </div>
            <div className="text-sm font-['DM_Mono'] text-white/50 bg-[#000c1a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 select-none pointer-events-none">
              [ 0{activeIndex + 1} / 0{PROJECTS.length} ]
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#000c1a]/90 backdrop-blur-md border border-[#00f5c4]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,245,196,0.15)]">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`transition-colors p-1 ${
                activeIndex === 0
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/70 hover:text-[#00f5c4] cursor-pointer"
              }`}
              title="Previous Project"
              aria-label="Previous Project"
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
                  aria-label={`Go to ${proj.title}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === PROJECTS.length - 1}
              className={`transition-colors p-1 ${
                activeIndex === PROJECTS.length - 1
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/70 hover:text-[#00f5c4] cursor-pointer"
              }`}
              title="Next Project"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Desktop Horizontal Snapping Cards Slider */}
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
              className="w-full min-w-full h-full flex-shrink-0 snap-start snap-always section-card rounded-2xl relative overflow-hidden border border-[#00f5c4]/30 bg-[#000c1a]/90 backdrop-blur-2xl flex flex-col justify-between p-10 shadow-[0_0_40px_rgba(0,12,26,0.9)] transition-all duration-500 hover:border-[#00f5c4]/60"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={getAssetUrl(project.img)}
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

              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-['Archivo_Black'] text-4xl md:text-6xl"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${project.accent}aa`,
                    }}
                  >
                    {project.num}
                  </span>
                  <span className="font-['DM_Mono'] text-sm tracking-widest text-white/40 uppercase">
                    / 0{PROJECTS.length}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-lg border backdrop-blur-md font-bold"
                    style={{
                      borderColor: `${project.accent}55`,
                      color: project.accent,
                      backgroundColor: `${project.accent}15`,
                    }}
                  >
                    {project.type}
                  </span>
                  <span className="font-['DM_Mono'] text-sm text-white/40">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="relative z-10 my-6">
                <h3 className="font-['Archivo_Black'] text-3xl md:text-5xl text-[#edeae1] mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="font-['DM_Mono'] text-base text-[#00f5c4] font-medium mb-4">
                  {project.subtitle}
                </p>
                <p className="font-['DM_Mono'] text-sm text-white/70 max-w-4xl leading-relaxed mb-6">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="font-['DM_Mono'] text-xs uppercase tracking-wider px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 font-['DM_Mono'] text-sm text-white/40">
                  {project.status}
                </div>

                <a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-['DM_Mono'] text-sm tracking-wider uppercase px-5 py-2.5 rounded-xl border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] transition-all duration-300 shadow-[0_0_20px_rgba(0,245,196,0.2)] cursor-pointer"
                >
                  <span>EXPLORE PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}