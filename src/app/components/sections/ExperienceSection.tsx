import { useState, useRef } from "react";
import { EXPERIENCES } from "../../data/experienceData";
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    const newIdx = Math.max(0, Math.min(EXPERIENCES.length - 1, idx));
    setActiveIndex(newIdx);
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // gap-6 (24px)
        scrollContainerRef.current.scrollTo({
          left: newIdx * (cardWidth + gap),
          behavior: "smooth",
        });
      }
    }
  };

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24;
        const scrollPos = scrollContainerRef.current.scrollLeft;
        const newIdx = Math.round(scrollPos / (cardWidth + gap));
        if (newIdx !== activeIndex && newIdx >= 0 && newIdx < EXPERIENCES.length) {
          setActiveIndex(newIdx);
        }
      }
    }
  };

  // Convert vertical scroll on the cards to horizontal scroll inside slider
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isAtLeftLimit = container.scrollLeft <= 5;
      const isAtRightLimit = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      // Only hijack wheel if scrolling horizontally within bounds
      if ((e.deltaY > 0 && !isAtRightLimit) || (e.deltaY < 0 && !isAtLeftLimit)) {
        e.stopPropagation();
        container.scrollBy({ left: e.deltaY > 0 ? 350 : -350, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="experience" className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        
        {/* Section Header with Navigation Controls */}
        <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#00f5c4]/20 mb-8 md:mb-10">
          <div>
            <div className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-[#00f5c4]">
              03 — TECHNICAL EXPERIENCE
            </div>
            <h2 className="font-['Archivo_Black'] text-4xl sm:text-6xl md:text-7xl text-[#edeae1] leading-none">
              CAREER PATH<span className="text-[#00f5c4]"></span>
            </h2>
          </div>

          {/* Right Header Navigation: Slider Index Counter & Left/Right Arrows */}
          <div className="flex items-center gap-4">
            <div className="text-xs md:text-sm font-['DM_Mono'] text-white/60 bg-[#000c1a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              [ 0{activeIndex + 1} / 0{EXPERIENCES.length} ]
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  activeIndex === 0
                    ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                    : "border-[#00f5c4]/40 text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_15px_rgba(0,245,196,0.2)] cursor-pointer"
                }`}
                aria-label="Previous Work Experience"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeIndex === EXPERIENCES.length - 1}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  activeIndex === EXPERIENCES.length - 1
                    ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                    : "border-[#00f5c4]/40 text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_15px_rgba(0,245,196,0.2)] cursor-pointer"
                }`}
                aria-label="Next Work Experience"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Snapping Scroll Track (Most-Left to Most-Right Bounded Slider) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 focus:outline-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EXPERIENCES.map((exp, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={`${exp.id}-${idx}`}
                className={`w-[320px] sm:w-[480px] md:w-[560px] lg:w-[620px] flex-shrink-0 snap-start section-card p-6 md:p-8 rounded-2xl bg-[#000c1a]/85 border transition-all duration-500 shadow-xl flex flex-col justify-between relative overflow-hidden group ${
                  isActive
                    ? "border-[#00f5c4]/50 shadow-[0_0_30px_rgba(0,245,196,0.15)]"
                    : "border-white/10 hover:border-white/30 opacity-85 hover:opacity-100"
                }`}
              >
                {/* Soft Ambient Glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: exp.accent }}
                />

                {/* Card Header: Company, Role & Duration */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-['DM_Mono'] text-xs">
                      <Briefcase className="w-3.5 h-3.5" style={{ color: exp.accent }} />
                      <span className="font-semibold">{exp.company}</span>
                    </div>

                    <span
                      className="font-['DM_Mono'] text-[10px] md:text-xs uppercase tracking-wider px-3 py-1 rounded-lg border backdrop-blur-md font-bold"
                      style={{
                        borderColor: `${exp.accent}55`,
                        color: exp.accent,
                        backgroundColor: `${exp.accent}15`,
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="font-['Archivo_Black'] text-xl sm:text-2xl md:text-3xl text-[#edeae1] mb-2 leading-tight">
                    {exp.role}
                  </h3>

                  {/* Meta details: Period & Location */}
                  <div className="flex items-center gap-4 text-white/50 font-['DM_Mono'] text-xs mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-white/40" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/40" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Contributions List */}
                  <div className="space-y-2.5 mb-6">
                    {exp.contributions.map((item, cIdx) => (
                      <div key={cIdx} className="stagger-item flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00f5c4] flex-shrink-0 mt-0.5" />
                        <p className="font-['DM_Mono'] text-xs md:text-sm text-white/75 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Used Footer */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-['DM_Mono'] text-[10px] md:text-xs uppercase tracking-wider px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Slider Progress Bar Indicator */}
        <div className="w-full bg-white/5 h-1.5 rounded-full mt-6 overflow-hidden border border-white/10 relative">
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
