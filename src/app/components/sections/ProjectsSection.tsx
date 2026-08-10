import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { PROJECTS } from "../../data/projectsData";
import { ChevronLeft, ChevronRight, ArrowUpRight, ShieldCheck, Radio } from "lucide-react";

export function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Framer Motion useScroll: offset ["start start", "end end"] ensures horizontal scroll begins
  // at the exact pixel top-0 pins, and ends at the exact pixel the section unpins.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic scroll distance based on deck's actual pixel width vs window viewport
  useEffect(() => {
    const updateScrollRange = () => {
      if (carouselRef.current) {
        const totalWidth = carouselRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const padding = window.innerWidth < 768 ? 24 : 48;
        setScrollRange(Math.max(0, totalWidth - viewportWidth + padding));
      }
    };

    updateScrollRange();
    const timer = setTimeout(updateScrollRange, 250);
    window.addEventListener("resize", updateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollRange);
    };
  }, []);

  // Update active card index based on scrollYProgress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const count = PROJECTS.length;
    const idx = Math.min(count - 1, Math.max(0, Math.floor(latest * count)));
    setActiveIndex(idx);
  });

  // Smooth transform horizontal x offset
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Jump to specific card by smoothly scrolling vertically to its target offset
  const scrollToCard = (index: number) => {
    if (!targetRef.current) return;
    const count = PROJECTS.length;
    const sectionTop = targetRef.current.offsetTop;
    const sectionHeight = targetRef.current.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (index / (count - 1)) * sectionHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    /* Outer Container: Subsea Base Chamber with Transparent Ocean Window Pass-through */
    <section
      id="projects"
      ref={targetRef}
      className="relative h-[300vh] bg-transparent"
      style={{ position: "relative" }}
    >
      {/* Top Metallic Bulkhead Wall Transition (Entering Underwater Station) */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#000c1a] via-[#000c1a]/80 to-transparent z-20 pointer-events-none border-t-2 border-[#00f5c4]/30 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 font-['DM_Mono'] text-[10px] tracking-[0.25em] text-[#00f5c4]/60 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-ping" />
          AIRLOCK DECK B-03 — SUBSEA STATION ENTRY
        </div>
        <div className="hidden md:flex items-center gap-6 font-['DM_Mono'] text-[10px] text-white/30 uppercase tracking-widest">
          <span>STRUCTURAL HULL: REINFORCED</span>
          <span>DEPTH: 140M</span>
        </div>
      </div>

      {/* Pinned Sticky full-screen container (Underwater Observation Deck) */}
      <div
        className="sticky top-0 flex flex-col justify-between h-screen overflow-hidden px-4 md:px-12 lg:px-16 pt-20 pb-8 w-full"
        style={{ position: "sticky", top: 0, height: "100vh", zIndex: 10 }}
      >
        {/* Submarine Glass Bay Backing (semi-transparent glass allowing Three.js ocean background to shine through) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#000c1a]/70 via-[#000c1a]/50 to-[#000c1a]/85 backdrop-blur-[2px] pointer-events-none" />

        {/* Left & Right Reinforced Submarine Steel Pillars */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#00142b] to-transparent border-r border-[#00f5c4]/20 z-20 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[#00142b] to-transparent border-l border-[#00f5c4]/20 z-20 pointer-events-none hidden md:block" />

        {/* Top Header HUD */}
        <div className="w-full flex items-center justify-between z-20 pointer-events-none relative">
          <div className="flex items-center gap-4">
            <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase text-[#00f5c4] flex items-center gap-2 bg-[#000c1a]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#00f5c4]/30">
              <Radio className="w-3.5 h-3.5 text-[#00f5c4] animate-pulse" />
              03 — UNDERWATER PROJECTS GALLERY
            </div>
            <div className="hidden sm:block text-xs font-['DM_Mono'] text-white/50 bg-[#000c1a]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              [ HABITAT BAY 0{activeIndex + 1} / 0{PROJECTS.length} ]
            </div>
          </div>

          {/* Interactive Navigation Quick Jump Dots */}
          <div className="pointer-events-auto flex items-center gap-2 bg-[#000c1a]/90 backdrop-blur-md border border-[#00f5c4]/30 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,245,196,0.15)]">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="text-white/60 hover:text-[#00f5c4] disabled:opacity-30 disabled:hover:text-white/60 transition-colors p-1 cursor-pointer"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 items-center px-1">
              {PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => scrollToCard(idx)}
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
              onClick={() => scrollToCard(Math.min(PROJECTS.length - 1, activeIndex + 1))}
              disabled={activeIndex === PROJECTS.length - 1}
              className="text-white/60 hover:text-[#00f5c4] disabled:opacity-30 disabled:hover:text-white/60 transition-colors p-1 cursor-pointer"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Progress Line Indicator */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f5c4] via-[#8c00ff] to-[#ff2d6b]"
            style={{ width: useTransform(progressPercent, (v) => `${v}%`) }}
          />
        </div>

        {/* Horizontal Moving Deck (Subsea Pods) */}
        <div className="w-full overflow-hidden my-auto py-2 z-10 relative">
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-2 md:pl-4 items-center"
          >
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="w-[88vw] md:w-[60vw] lg:w-[44vw] h-[60vh] flex-shrink-0 rounded-2xl relative overflow-hidden border border-[#00f5c4]/30 group bg-[#000c1a]/85 backdrop-blur-2xl flex flex-col justify-between p-5 md:p-8 shadow-[0_0_30px_rgba(0,12,26,0.9)] transition-all duration-500 hover:border-[#00f5c4]/70 hover:shadow-[0_0_35px_rgba(0,245,196,0.25)]"
              >
                {/* Background Image & Submarine Chamber Glass Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={proj.img}
                    alt={proj.subtitle}
                    className="w-full h-full object-cover opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,12,26,0.96) 0%, rgba(0,12,26,0.78) 55%, ${proj.accent}22 100%)`,
                    }}
                  />
                </div>

                {/* Submarine Rivets in Card Corners */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />

                {/* Card Top Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-['Archivo_Black'] text-3xl md:text-5xl"
                      style={{ color: "transparent", WebkitTextStroke: `1px ${proj.accent}aa` }}
                    >
                      {proj.num}
                    </span>
                    <span className="font-['DM_Mono'] text-xs tracking-widest text-white/40 uppercase">
                      / 0{PROJECTS.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-['DM_Mono'] text-[10px] md:text-xs tracking-[0.2em] uppercase px-3 py-1 rounded border backdrop-blur-md"
                      style={{ borderColor: `${proj.accent}55`, color: proj.accent, backgroundColor: `${proj.accent}15` }}
                    >
                      {proj.type}
                    </span>
                    <span className="font-['DM_Mono'] text-xs text-white/40">{proj.year}</span>
                  </div>
                </div>

                {/* Card Center Content */}
                <div className="relative z-10 my-auto py-2">
                  <div className="font-['DM_Mono'] text-xs md:text-sm font-semibold tracking-wider mb-1 flex items-center gap-2" style={{ color: proj.accent }}>
                    <ShieldCheck className="w-4 h-4" />
                    {proj.subtitle}
                  </div>
                  <h3 className="font-['Archivo_Black'] text-2xl md:text-4xl lg:text-5xl text-[#edeae1] mb-3 leading-tight tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="font-['DM_Mono'] text-xs md:text-sm leading-relaxed text-white/70 max-w-xl mb-4 line-clamp-3">
                    {proj.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="font-['DM_Mono'] text-[10px] md:text-xs tracking-[0.1em] uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="font-['DM_Mono'] text-[11px] text-white/40 tracking-wider">
                    MODULE HABITAT: #{proj.id + 1}
                  </div>
                  <a
                    href="#contact"
                    className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 group-hover:scale-105 cursor-pointer shadow-lg"
                    style={{
                      backgroundColor: `${proj.accent}20`,
                      border: `1px solid ${proj.accent}66`,
                      color: proj.accent,
                    }}
                  >
                    <span>Explore Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Horizontal Scroll Hint & Counter */}
        <div className="w-full flex items-center justify-between z-20 pointer-events-none relative">
          <div className="flex items-center gap-3 bg-[#000c1a]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
            <div className="w-6 h-1 rounded-full bg-[#00f5c4]/40 overflow-hidden">
              <div className="w-full h-full bg-[#00f5c4] animate-pulse" />
            </div>
            <span className="font-['DM_Mono'] text-[11px] tracking-[0.2em] uppercase text-white/70">
              Scroll down to explore subsea pods
            </span>
          </div>

          <div className="font-['DM_Mono'] text-xs tracking-widest text-[#00f5c4] bg-[#000c1a]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#00f5c4]/30">
            0{activeIndex + 1} / 0{PROJECTS.length}
          </div>
        </div>

      </div>

      {/* Bottom Metallic Bulkhead Wall Transition (Exiting to Deep Sea Floor) */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#000c1a] via-[#000c1a]/80 to-transparent z-20 pointer-events-none border-b-2 border-[#00f5c4]/30 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 font-['DM_Mono'] text-[10px] tracking-[0.25em] text-[#00f5c4]/60 uppercase">
          EXIT AIRLOCK — DESCENDING TO OCEAN DEEP STACK
        </div>
      </div>
    </section>
  );
}
