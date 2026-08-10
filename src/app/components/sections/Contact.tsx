import React from "react";
import { SplitWords } from "../common/TextAnimations";
import { Footer } from "../layout/Footer";

export function Contact() {
  return (
    <section id="contact" className="relative w-full h-full flex flex-col justify-between pt-[clamp(1rem,3vh,2.5rem)] pb-4 px-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="w-full my-auto">
        <div className="border-t border-[#00f5c4]/20 pt-[clamp(1rem,2.5vh,2rem)]">
          <div className="section-header font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-[clamp(0.75rem,2vh,1.5rem)] text-[#00f5c4]">
            06 — CONTACT
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-[clamp(1.5rem,3.5vw,3rem)] items-end">
            <div className="section-header">
              <SplitWords
                text="LET'S"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", color: "#edeae1" }}
                delay={0.05}
              />
              <SplitWords
                text="BUILD"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", color: "transparent", WebkitTextStroke: "2px #00f5c4" } as React.CSSProperties}
                delay={0.15}
              />
              <SplitWords
                text="SOMETHING."
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", color: "#edeae1" }}
                delay={0.25}
              />
            </div>
            <div className="section-content flex flex-col md:min-w-[240px]">
              {[
                { label: "EMAIL", val: "hello@devportfolio.id", href: "mailto:hello@devportfolio.id" },
                { label: "GITHUB", val: "github.com/dev", href: "https://github.com" },
                { label: "LINKEDIN", val: "linkedin.com/in/dev", href: "https://linkedin.com" },
              ].map(({ label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="stagger-item group flex flex-col gap-0.5 py-[clamp(0.4rem,1.2vh,0.85rem)] border-t border-white/10"
                >
                  <span className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase text-white/30">
                    {label}
                  </span>
                  <span className="font-['DM_Mono'] text-xs md:text-sm transition-colors group-hover:text-[#00f5c4] text-white/70">
                    {val} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="section-content mt-[clamp(1rem,2.5vh,2rem)] flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#00f5c4]" />
            <span className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase text-[#00f5c4]/70">
              Currently available for opportunities
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
