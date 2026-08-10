import React, { useState } from "react";
import { MagBtn } from "../common/MagBtn";
import { SplitChars } from "../common/TextAnimations";
import { User, ShieldCheck, Sparkles, ArrowDownRight } from "lucide-react";

export function Hero({ ready }: { ready: boolean }) {
  const [imgError, setImgError] = useState(false);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative w-full h-full flex flex-col justify-between px-4 sm:px-8 md:px-12 py-[clamp(0.75rem,2vh,2rem)] max-w-[1440px] mx-auto overflow-hidden">
      <div className="section-content w-full flex-1 flex flex-col justify-between relative z-10 mx-auto my-auto">
        
        {/* Main Grid: Left Name & Bio, Right Holographic Profile Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(1rem,3vw,2.5rem)] items-center my-auto">
          
          {/* LEFT COLUMN: Name Typography & Intro */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            
            {/* Top Developer Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/30 w-fit mb-[clamp(0.75rem,2vh,1.5rem)] shadow-[0_0_15px_rgba(0,245,196,0.15)]"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(-10px)",
                transition: "all .8s ease .4s",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-ping" />
              <span className="font-['DM_Mono'] text-[10px] tracking-[0.25em] text-[#00f5c4] uppercase font-bold">
                ◈ FULLSTACK DEVELOPER
              </span>
            </div>

            {/* Name Headline */}
            <div style={{ position: "relative", zIndex: 2, marginBottom: "clamp(0.75rem, 2vh, 1.25rem)" }}>
              <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <div className="font-['Archivo_Black'] tracking-[-0.03em]" style={{ fontSize: "clamp(2.4rem, 5.2vw, 5.2rem)", color: "#edeae1" }}>
                  <SplitChars text="ALEXANDER" delay={0.1} active={ready} />
                </div>
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <div
                  className="font-['Archivo_Black'] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(2.4rem, 5.2vw, 5.2rem)", color: "transparent", WebkitTextStroke: "2px #00f5c4" }}
                >
                  <SplitChars text="BRIAN" delay={0.2} active={ready} />
                </div>
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <div
                  className="font-['Archivo_Black'] tracking-[-0.03em]"
                  style={{
                    fontSize: "clamp(2.4rem, 5.2vw, 5.2rem)",
                    color: "#00f5c4",
                  }}
                >
                  <SplitChars
                    text="SUSANTO"
                    delay={0.32}
                    active={ready}
                  />
                </div>
              </div>
            </div>

            {/* CTAs & Quick Buttons */}
            <div
              className="flex items-center gap-4 mt-[clamp(0.75rem,2.5vh,1.75rem)] flex-wrap"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(15px)",
                transition: "all .8s ease .8s",
              }}
            >
              <MagBtn
                onClick={() => go("projects")}
                className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg transition-all border border-[#00f5c4] text-[#00f5c4] bg-[#00f5c4]/10 hover:bg-[#00f5c4] hover:text-[#020817] shadow-[0_0_20px_rgba(0,245,196,0.2)] flex items-center gap-2"
              >
                <span>View Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </MagBtn>
              <MagBtn
                onClick={() => go("contact")}
                className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg transition-all border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-white/5"
              >
                Get In Touch
              </MagBtn>
            </div>

          </div>

          {/* RIGHT COLUMN: Holographic Glass Profile Photo Card */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end relative z-10"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) .6s",
            }}
          >
            <div className="relative w-full max-w-[clamp(280px,26vw,420px)] aspect-[4/5] rounded-2xl p-4 md:p-5 bg-[#000c1a]/70 backdrop-blur-2xl border border-[#00f5c4]/30 shadow-[0_0_40px_rgba(0,12,26,0.9)] group transition-all duration-500 hover:border-[#00f5c4]/70 hover:shadow-[0_0_35px_rgba(0,245,196,0.25)] flex flex-col justify-between overflow-hidden">
              
              {/* Corner Rivets */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00f5c4]/50" />

              {/* Top Photo Card Header */}
              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 font-['DM_Mono'] text-[10px]">
                <div className="flex items-center gap-1.5 text-[#00f5c4]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>USER PROFILE</span>
                </div>
                <span className="text-white/40 tracking-wider">INDONESIA</span>
              </div>

              {/* Center Photo Display Container */}
              <div className="relative z-10 flex-1 my-2 rounded-xl overflow-hidden border border-white/10 bg-[#000611] flex items-center justify-center group-hover:border-[#00f5c4]/40 transition-colors">
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
                      Place your photo at <code className="text-[#00f5c4]">public/profile.png</code> or <code className="text-[#00f5c4]">public/profile.jpg</code>
                    </span>
                  </div>
                )}

                {/* Subsea Scanline Beam Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00f5c4]/5 to-transparent animate-pulse" />
              </div>

              {/* Bottom Photo Card Status Strip */}
              <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between font-['DM_Mono'] text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-pulse shadow-[0_0_8px_#00f5c4]" />
                  <span className="text-white/80 tracking-wider">OPEN TO WORK</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-[#00f5c4]" />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div
          className="mt-[clamp(0.75rem,2vh,1.75rem)] pt-[clamp(0.5rem,1.5vh,1.25rem)] border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
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
              <span className="font-['Archivo_Black'] text-lg md:text-2xl text-[#edeae1]">{val}</span>
              <span className="font-['DM_Mono'] text-[9px] tracking-[0.2em] text-white/40 mt-0.5">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
