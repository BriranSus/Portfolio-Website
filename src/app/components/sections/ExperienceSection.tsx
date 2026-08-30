import React, { useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { EXPERIENCES } from "../../data/experienceData";

export function ExperienceSection() {
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
    if (activeIndex < EXPERIENCES.length - 1) {
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
          left: e.deltaY > 0 ? 350 : -350,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      id="experience"
      className="relative w-full h-full flex flex-col justify-center px-3 sm:px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden"
    >
      <div className="w-full my-auto flex flex-col justify-center">
        {/* Header Bar */}
        <div className="section-header flex flex-row items-end justify-between gap-3 pb-2 sm:pb-3 md:pb-6 border-b border-[#00f5c4]/20 mb-2 sm:mb-4 md:mb-8 pr-0 md:pr-16">
          <div>
            <div className="font-['DM_Mono'] text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase mb-1 md:mb-2 text-[#00f5c4]">
              03 — EXPERIENCE
            </div>
            <h2 className="font-['Archivo_Black'] text-xl sm:text-4xl md:text-7xl text-[#edeae1] leading-none">
              CAREER PATH
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 md:gap-4">
            <div className="text-[10px] md:text-sm font-['DM_Mono'] text-white/60 bg-[#000c1a]/80 backdrop-blur-md px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-white/10 select-none pointer-events-none">
              [ 0{activeIndex + 1} / 0{EXPERIENCES.length} ]
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`p-1.5 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 ${
                  activeIndex === 0
                    ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                    : "border-[#00f5c4]/40 text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_15px_rgba(0,245,196,0.2)] cursor-pointer"
                }`}
                aria-label="Previous Work Experience"
              >
                <ChevronLeft className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeIndex === EXPERIENCES.length - 1}
                className={`p-1.5 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 ${
                  activeIndex === EXPERIENCES.length - 1
                    ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                    : "border-[#00f5c4]/40 text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_15px_rgba(0,245,196,0.2)] cursor-pointer"
                }`}
                aria-label="Next Work Experience"
              >
                <ChevronRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Snapping Cards Slider */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-1 sm:py-2 px-1 focus:outline-none scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-x",
          }}
        >
          {EXPERIENCES.map((exp, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={`${exp.id}-${idx}`}
                className={`w-[84vw] sm:w-[460px] md:w-[540px] lg:w-[600px] max-h-[58dvh] sm:max-h-[64dvh] md:max-h-none flex-shrink-0 snap-center md:snap-start section-card p-3.5 sm:p-5 md:p-8 rounded-2xl bg-[#000c1a]/90 backdrop-blur-xl border transition-all duration-500 shadow-xl flex flex-col justify-between relative overflow-hidden group ${
                  isActive
                    ? "border-[#00f5c4]/50 shadow-[0_0_30px_rgba(0,245,196,0.15)]"
                    : "border-white/10 hover:border-white/30 opacity-85 hover:opacity-100"
                }`}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: exp.accent }}
                />

                {/* Top Details */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap flex-shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 font-['DM_Mono'] text-[10px] md:text-xs">
                      <Briefcase className="w-3 h-3" style={{ color: exp.accent }} />
                      <span className="font-semibold">{exp.company}</span>
                    </div>

                    <span
                      className="font-['DM_Mono'] text-[8.5px] md:text-xs uppercase tracking-wider px-2 py-0.5 rounded-md md:rounded-lg border backdrop-blur-md font-bold"
                      style={{
                        borderColor: `${exp.accent}55`,
                        color: exp.accent,
                        backgroundColor: `${exp.accent}15`,
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="font-['Archivo_Black'] text-base sm:text-xl md:text-3xl text-[#edeae1] mb-1 leading-tight flex-shrink-0 line-clamp-1 md:line-clamp-none">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-3 text-white/50 font-['DM_Mono'] text-[9.5px] md:text-xs mb-2 md:mb-5 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-white/40" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/40" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Scrollable Contributions Area on Mobile */}
                  <div
                    className="space-y-1.5 md:space-y-2.5 mb-2 md:mb-6 overflow-y-auto max-h-[140px] sm:max-h-[190px] md:max-h-none pr-1 no-scrollbar flex-1"
                    style={{
                      WebkitOverflowScrolling: "touch",
                      scrollbarWidth: "none",
                    }}
                  >
                    {exp.contributions.map((item, cIdx) => (
                      <div key={cIdx} className="stagger-item flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#00f5c4] flex-shrink-0 mt-0.5" />
                        <p className="font-['DM_Mono'] text-[10.5px] sm:text-xs md:text-sm text-white/75 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Stack Tags */}
                <div className="flex flex-wrap gap-1 md:gap-2 pt-2 md:pt-3 border-t border-white/10 flex-shrink-0">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-['DM_Mono'] text-[8.5px] md:text-xs uppercase tracking-wider px-2 py-0.5 rounded-md md:rounded-lg bg-white/5 border border-white/10 text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-1 md:h-1.5 rounded-full mt-2 sm:mt-3 md:mt-6 overflow-hidden border border-white/10 relative">
          <div
            className="h-full bg-[#00f5c4] transition-all duration-500 shadow-[0_0_12px_rgba(0,245,196,0.8)]"
            style={{
              width: `${((activeIndex + 1) / EXPERIENCES.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}