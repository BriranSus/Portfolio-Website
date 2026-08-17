import { useState } from "react";
import { MagBtn } from "../common/MagBtn";
import { SplitChars } from "../common/TextAnimations";
import { User, ShieldCheck, Sparkles, ArrowDownRight } from "lucide-react";

export function Hero({
  ready,
  onSelectSection,
}: {
  ready: boolean;
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
    <section id="hero" className="relative w-full h-full flex flex-col justify-between px-6 md:px-16 py-8 md:py-12 max-w-[1600px] mx-auto overflow-hidden">
      <div className="section-content w-full flex-1 flex flex-col justify-between relative z-10 mx-auto my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center my-auto">
          <div className="lg:col-span-6 flex flex-col justify-center max-w-[680px] ml-auto w-full relative z-10">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/30 w-fit mb-6 shadow-[0_0_20px_rgba(0,245,196,0.15)]"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(-10px)",
                transition: "all .8s ease .4s",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5c4] animate-ping" />
              <span className="font-['DM_Mono'] text-xs tracking-[0.25em] text-[#00f5c4] uppercase font-bold">
                ◈ FULLSTACK DEVELOPER & AI Enthusiast
              </span>
            </div>

            <div style={{ position: "relative", zIndex: 2, marginBottom: "1.5rem" }}>
              <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <div className="font-['Archivo_Black'] text-4xl sm:text-6xl md:text-[88px] tracking-[-0.03em]" style={{ color: "#edeae1" }}>
                  <SplitChars text="ALEXANDER" delay={0.1} active={ready} />
                </div>
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <div
                  className="font-['Archivo_Black'] text-4xl sm:text-6xl md:text-[88px] tracking-[-0.03em]"
                  style={{ color: "transparent", WebkitTextStroke: "2px #00f5c4" }}
                >
                  <SplitChars text="BRIAN" delay={0.2} active={ready} />
                </div>
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <div
                  className="font-['Archivo_Black'] text-4xl sm:text-6xl md:text-[88px] tracking-[-0.03em]"
                  style={{ color: "#00f5c4" }}
                >
                  <SplitChars
                    text="SUSANTO"
                    delay={0.32}
                    active={ready}
                  />
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-4 mt-6 flex-wrap"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(15px)",
                transition: "all .8s ease .8s",
              }}
            >
              <MagBtn
                onClick={() => go("projects")}
                className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-xl transition-all border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_25px_rgba(0,245,196,0.25)] flex items-center gap-2.5"
              >
                <span>View Work</span>
                <ArrowDownRight className="w-4.5 h-4.5" />
              </MagBtn>
              <MagBtn
                onClick={() => go("contact")}
                className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-xl transition-all border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-white/5"
              >
                Get In Touch
              </MagBtn>
            </div>

            <div
              className="mt-16 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(20px)",
                transition: "all .8s ease 1s",
              }}
            >
              {[
                ["5+", "PROJECTS BUILT"],
                ["10+", "TECH & TOOLS"],
                ["1+", "YEARS EXP."],
                ["100%", "OPEN TO LEARN"],
              ].map(([val, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="font-['Archivo_Black'] text-xl md:text-3xl text-[#edeae1]">{val}</span>
                  <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] text-white/40 mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-6 flex justify-center lg:justify-center relative z-10 my-4 lg:my-0"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) .6s",
            }}
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-[4/5] rounded-2xl p-5 md:p-6 bg-[#000c1a]/70 backdrop-blur-2xl border border-[#00f5c4]/30 shadow-[0_0_40px_rgba(0,12,26,0.9)] group transition-all duration-500 hover:border-[#00f5c4]/70 hover:shadow-[0_0_35px_rgba(0,245,196,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />

              <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-white/10 font-['DM_Mono'] text-[11px]">
                <div className="flex items-center gap-1.5 text-[#00f5c4]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>USER PROFILE</span>
                </div>
                <span className="text-white/40 tracking-wider">INDONESIA</span>
              </div>

              <div className="relative z-10 flex-1 my-3 rounded-xl overflow-hidden border border-white/10 bg-[#000611] flex items-center justify-center group-hover:border-[#00f5c4]/40 transition-colors">
                {!imgError ? (
                  <img
                    src="/profile.JPG"
                    alt="Alexander Brian Susanto"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/40 flex items-center justify-center mb-3">
                      <User className="w-7 h-7 text-[#00f5c4]" />
                    </div>
                    <span className="font-['DM_Mono'] text-xs text-white/80 font-bold mb-1">
                      Alexander Brian Susanto
                    </span>
                    <span className="font-['DM_Mono'] text-[9px] text-white/40 max-w-[200px]">
                      Place your photo at <code className="text-[#00f5c4]">public/profile.JPG</code>
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00f5c4]/5 to-transparent animate-pulse" />
              </div>

              <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between font-['DM_Mono'] text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-pulse shadow-[0_0_8px_#00f5c4]" />
                  <span className="text-white/80 tracking-wider">OPEN TO WORK</span>
                </div>
                <Sparkles className="w-4 h-4 text-[#00f5c4]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
