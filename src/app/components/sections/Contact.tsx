import React from "react";
import { SplitWords } from "../common/TextAnimations";
import { Footer } from "../layout/Footer";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full h-full flex flex-col justify-between px-4 sm:px-6 md:px-16 pt-2 sm:pt-4 pb-3 sm:pb-6 max-w-[1700px] mx-auto overflow-hidden"
    >
      <div className="w-full my-auto">
        {/* Section Header */}
        <div className="section-header pb-2 sm:pb-4 md:pb-6 border-b border-[#00f5c4]/20 mb-3 sm:mb-6 md:mb-10">
          <div className="font-['DM_Mono'] text-[11px] md:text-sm tracking-[0.3em] uppercase mb-1.5 md:mb-3 text-[#00f5c4]">
            07 — CONTACT
          </div>
        </div>

        {/* Main Content: Big Typography on Left + Contact Links on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="section-header flex flex-col">
              <SplitWords
                text="LET'S"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em] text-3xl sm:text-5xl md:text-[80px]"
                style={{ color: "#edeae1" }}
                delay={0.05}
              />
              <SplitWords
                text="BUILD"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em] text-3xl sm:text-5xl md:text-[80px]"
                style={{ color: "transparent", WebkitTextStroke: "2px #00f5c4" } as React.CSSProperties}
                delay={0.15}
              />
              <SplitWords
                text="SOMETHING"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em] text-3xl sm:text-5xl md:text-[80px]"
                style={{ color: "#00f5c4" }}
                delay={0.25}
              />
            </div>

            <div className="section-content mt-3 sm:mt-6 md:mt-8 flex items-center gap-2.5 sm:gap-3">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-pulse bg-[#00f5c4]" />
              <span className="font-['DM_Mono'] text-[10px] sm:text-xs md:text-sm tracking-[0.15em] uppercase text-[#00f5c4]/80">
                Currently available for opportunities & collaborations
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Links */}
          <div className="lg:col-span-5 section-content flex flex-col justify-center mb-4 sm:mb-8 lg:mb-20">
            {[
              { label: "EMAIL", val: "briansusanto144@gmail.com", href: "mailto:briansusanto144@gmail.com" },
              { label: "GITHUB", val: "github.com/BriranSus", href: "https://github.com/BriranSus" },
              { label: "LINKEDIN", val: "linkedin.com/in/alexander-brian-susanto", href: "https://linkedin.com/in/alexander-brian-susanto-11419b260" },
            ].map(({ label, val, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="stagger-item group flex flex-col gap-0.5 sm:gap-1 py-2.5 sm:py-3.5 md:py-4 border-t border-white/10 hover:border-[#00f5c4]/40 transition-colors cursor-pointer"
              >
                <span className="font-['DM_Mono'] text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/40 group-hover:text-[#00f5c4] transition-colors">
                  {label}
                </span>
                <span className="font-['DM_Mono'] text-[11px] sm:text-xs md:text-base transition-colors group-hover:text-[#00f5c4] text-white/70 flex items-center justify-between">
                  <span>{val}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00f5c4]" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}