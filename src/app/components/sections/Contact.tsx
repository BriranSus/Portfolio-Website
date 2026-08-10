import React from "react";
import { SplitWords } from "../common/TextAnimations";
import { Footer } from "../layout/Footer";

export function Contact() {
  return (
    <section id="contact" className="relative w-full h-full flex flex-col justify-between pt-8 md:pt-12 pb-6 px-6 md:px-16 max-w-[1700px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        <div className="border-t border-[#00f5c4]/20 pt-8 md:pt-10">
          <div className="section-header font-['DM_Mono'] text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 text-[#00f5c4]">
            06 — CONTACT
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
            <div className="section-header">
              <SplitWords
                text="LET'S"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em] text-4xl sm:text-6xl md:text-[90px]"
                style={{ color: "#edeae1" }}
                delay={0.05}
              />
              <SplitWords
                text="BUILD"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em] text-4xl sm:text-6xl md:text-[90px]"
                style={{ color: "transparent", WebkitTextStroke: "2px #00f5c4" } as React.CSSProperties}
                delay={0.15}
              />
              <SplitWords
                text="SOMETHING."
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em] text-4xl sm:text-6xl md:text-[90px]"
                style={{ color: "#edeae1" }}
                delay={0.25}
              />
            </div>
            <div className="section-content flex flex-col md:min-w-[280px]">
              {[
                { label: "EMAIL", val: "briansusanto144@gmail.com", href: "mailto:briansusanto144@gmail.com" },
                { label: "GITHUB", val: "github.com/BriranSus", href: "https://github.com/BriranSus" },
                { label: "LINKEDIN", val: "linkedin.com/in/alexander-brian-susanto", href: "https://linkedin.com/in/alexander-brian-susanto-11419b260" },
              ].map(({ label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="stagger-item group flex flex-col gap-1 py-3 md:py-4 border-t border-white/10"
                >
                  <span className="font-['DM_Mono'] text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/30">
                    {label}
                  </span>
                  <span className="font-['DM_Mono'] text-xs md:text-base transition-colors group-hover:text-[#00f5c4] text-white/70">
                    {val} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="section-content mt-8 md:mt-10 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#00f5c4]" />
            <span className="font-['DM_Mono'] text-xs md:text-sm tracking-[0.15em] uppercase text-[#00f5c4]/70">
              Currently available for opportunities
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
