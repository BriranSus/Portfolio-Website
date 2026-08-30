import { getAssetUrl } from '../../utils/assetUrl';
import { useState } from "react";
import { ArrowDownRight, ShieldCheck, Sparkles, User } from "lucide-react";
import { SplitChars } from "../common/TextAnimations";
import { MagBtn } from "../common/MagBtn";

export function Hero({
  ready = true,
  onSelectSection,
}: {
  ready?: boolean;
  onSelectSection?: (index: number) => void;
}) {
  const [imgError, setImgError] = useState(false);

  const go = (id: string) => {
    const idMap: Record<string, number> = {
      hero: 0,
      about: 1,
      experience: 2,
      projects: 3,
      stack: 4,
      certificates: 5,
      contact: 6,
    };
    if (typeof idMap[id] === "number" && onSelectSection) {
      onSelectSection(idMap[id]);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-16 py-2 sm:py-4 md:py-8 max-w-[1920px] mx-auto overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* MOBILE HERO VIEW (lg:hidden): Centered Cohesive Avatar + Typography       */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col items-center text-center w-full my-auto justify-center">
        {/* Prominent Large Circular Avatar with Zoomed Photo */}
        <div className="relative mb-2 sm:mb-3">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#00f5c4] via-[#00f5c4]/30 to-[#b75fff]/40 shadow-[0_0_40px_rgba(0,245,196,0.45)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#000611] border-2 border-white/25">
              {!imgError ? (
                <img
                  src={getAssetUrl("/profile.JPG")}
                  alt="Alexander Brian Susanto"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover scale-125 transition-transform duration-500" style={{ objectPosition: "48% 40%" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#000c1a]">
                  <User className="w-12 h-12 text-[#00f5c4]" />
                </div>
              )}
            </div>
          </div>

          {/* Floating "Open To Work" Status Pill */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#000c1a]/95 backdrop-blur-md border border-[#00f5c4]/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,245,196,0.35)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-pulse shadow-[0_0_6px_#00f5c4]" />
            <span className="font-['DM_Mono'] text-[8.5px] sm:text-[9px] text-[#00f5c4] uppercase font-bold tracking-wider">
              OPEN TO WORK
            </span>
          </div>
        </div>

        {/* Developer Greeting Chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/30 mt-1 mb-1.5 shadow-[0_0_15px_rgba(0,245,196,0.15)]">
          <span className="font-['DM_Mono'] text-[9px] sm:text-[10px] tracking-[0.2em] text-[#00f5c4] uppercase font-bold">
            FULLSTACK DEVELOPER & AI ENTHUSIAST
          </span>
        </div>

        {/* Cohesive Centered Name Heading */}
        <div className="mb-1.5">
          <div className="overflow-hidden leading-[0.92]">
            <h1 className="font-['Archivo_Black'] text-3xl sm:text-5xl text-[#edeae1] tracking-tight">
              ALEXANDER
            </h1>
          </div>
          <div className="overflow-hidden leading-[0.92]">
            <h1
              className="font-['Archivo_Black'] text-3xl sm:text-5xl tracking-tight"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #00f5c4",
              }}
            >
              BRIAN
            </h1>
          </div>
          <div className="overflow-hidden leading-[0.92]">
            <h1 className="font-['Archivo_Black'] text-3xl sm:text-5xl text-[#00f5c4] tracking-tight">
              SUSANTO
            </h1>
          </div>
        </div>

        {/* Short Bio */}
        <p className="font-['DM_Mono'] text-[10.5px] sm:text-xs text-white/60 max-w-xs sm:max-w-md mx-auto mb-2 leading-relaxed">
          Building AI-integrated, high-performance web applications with seamless user experiences.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2.5 w-full mb-2">
          <MagBtn
            onClick={() => go("projects")}
            className="font-['DM_Mono'] text-[10px] sm:text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-xl border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_20px_rgba(0,245,196,0.25)] flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Work</span>
            <ArrowDownRight className="w-3.5 h-3.5" />
          </MagBtn>
          <MagBtn
            onClick={() => go("contact")}
            className="font-['DM_Mono'] text-[10px] sm:text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white bg-white/5 cursor-pointer"
          >
            Get In Touch
          </MagBtn>
        </div>

        {/* 4-Column Stats Row */}
        <div className="w-full max-w-xs sm:max-w-sm pt-2 border-t border-white/10 grid grid-cols-4 gap-2">
          {[
            ["5+", "PROJECTS"],
            ["10+", "STACK"],
            ["1+", "YEARS"],
            ["100%", "ADAPTIVE"],
          ].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-['Archivo_Black'] text-sm sm:text-base text-[#edeae1]">
                {val}
              </span>
              <span className="font-['DM_Mono'] text-[7.5px] sm:text-[8px] tracking-[0.1em] text-white/40 mt-0.5 uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP HERO VIEW (hidden lg:flex): Split Layout with Holographic Card    */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex section-content w-full flex-1 flex-col justify-center relative z-10 mx-auto my-auto">
        <div className="grid grid-cols-12 gap-8 items-center my-auto w-full">
          {/* Left Column: Bio, Heading, CTAs, Stats */}
          <div className="col-span-7 flex flex-col justify-center max-w-[720px] w-full relative z-10">
            {/* Top Developer Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/30 w-fit mb-4 shadow-[0_0_20px_rgba(0,245,196,0.15)]"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(-10px)",
                transition: "all .8s ease .4s",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-ping" />
              <span className="font-['DM_Mono'] text-xs tracking-[0.25em] text-[#00f5c4] uppercase font-bold">
                FULLSTACK DEVELOPER & AI ENTHUSIAST
              </span>
            </div>

            {/* Name Heading */}
            <div className="relative z-10 mb-6">
              <div className="overflow-hidden leading-[0.88]">
                <div
                  className="font-['Archivo_Black'] text-[84px] tracking-[-0.03em]"
                  style={{ color: "#edeae1" }}
                >
                  <SplitChars text="ALEXANDER" delay={0.1} active={ready} />
                </div>
              </div>
              <div className="overflow-hidden leading-[0.88]">
                <div
                  className="font-['Archivo_Black'] text-[84px] tracking-[-0.03em]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "2px #00f5c4",
                  }}
                >
                  <SplitChars text="BRIAN" delay={0.2} active={ready} />
                </div>
              </div>
              <div className="overflow-hidden leading-[0.88]">
                <div
                  className="font-['Archivo_Black'] text-[84px] tracking-[-0.03em]"
                  style={{ color: "#00f5c4" }}
                >
                  <SplitChars text="SUSANTO" delay={0.32} active={ready} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="flex items-center gap-4 mt-4 flex-wrap"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(15px)",
                transition: "all .8s ease .8s",
              }}
            >
              <MagBtn
                onClick={() => go("projects")}
                className="font-['DM_Mono'] text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-xl transition-all border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_25px_rgba(0,245,196,0.25)] flex items-center gap-2 cursor-pointer"
              >
                <span>View Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </MagBtn>
              <MagBtn
                onClick={() => go("contact")}
                className="font-['DM_Mono'] text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-xl transition-all border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-white/5 cursor-pointer"
              >
                Get In Touch
              </MagBtn>
            </div>

            {/* Statistics Row */}
            <div
              className="mt-12 pt-6 border-t border-white/10 grid grid-cols-4 gap-6"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(20px)",
                transition: "all .8s ease 1s",
              }}
            >
              {[
                ["5+", "PROJECTS"],
                ["10+", "TECH & TOOLS"],
                ["1+", "YEARS EXP"],
                ["100%", "ADAPTIVE"],
              ].map(([val, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="font-['Archivo_Black'] text-3xl text-[#edeae1]">
                    {val}
                  </span>
                  <span className="font-['DM_Mono'] text-[10px] tracking-[0.15em] text-white/40 mt-0.5 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Holographic Profile Photo Card */}
          <div
            className="col-span-5 flex justify-center relative z-10"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) .5s",
            }}
          >
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl p-6 bg-[#000c1a]/70 backdrop-blur-2xl border border-[#00f5c4]/30 shadow-[0_0_30px_rgba(0,12,26,0.9)] group transition-all duration-500 hover:border-[#00f5c4]/70 hover:shadow-[0_0_35px_rgba(0,245,196,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />

              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 font-['DM_Mono'] text-[11px]">
                <div className="flex items-center gap-1 text-[#00f5c4]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>USER PROFILE</span>
                </div>
                <span className="text-white/40 tracking-wider">INDONESIA</span>
              </div>

              <div className="relative z-10 flex-1 my-3 rounded-xl overflow-hidden border border-white/10 bg-[#000611] flex items-center justify-center group-hover:border-[#00f5c4]/40 transition-colors">
                {!imgError ? (
                  <img
                    src={getAssetUrl("/profile.JPG")}
                    alt="Alexander Brian Susanto"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/40 flex items-center justify-center mb-1.5">
                      <User className="w-4 h-4 text-[#00f5c4]" />
                    </div>
                    <span className="font-['DM_Mono'] text-[10px] text-white/80 font-bold mb-0.5">
                      Alexander Brian
                    </span>
                    <span className="font-['DM_Mono'] text-[7.5px] text-white/40">
                      public/profile.JPG
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00f5c4]/5 to-transparent animate-pulse" />
              </div>

              <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between font-['DM_Mono'] text-[11px]">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-pulse shadow-[0_0_6px_#00f5c4]" />
                  <span className="text-white/80 tracking-wider">OPEN TO WORK</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-[#00f5c4]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}