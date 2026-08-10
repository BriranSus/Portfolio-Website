import { motion } from "framer-motion";
import { SplitWords } from "../common/TextAnimations";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div className="border-t border-[#00f5c4]/20 pt-12">
          <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase mb-12 text-[#00f5c4]">
            05 — CONTACT
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <SplitWords
                text="LET'S"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem,8vw,7.5rem)", color: "#edeae1" }}
                delay={0.05}
              />
              <SplitWords
                text="BUILD"
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem,8vw,7.5rem)", color: "transparent", WebkitTextStroke: "2px #00f5c4" } as React.CSSProperties}
                delay={0.15}
              />
              <SplitWords
                text="SOMETHING."
                className="font-['Archivo_Black'] leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem,8vw,7.5rem)", color: "#edeae1" }}
                delay={0.25}
              />
            </div>
            <div className="flex flex-col md:min-w-[240px]">
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
                  className="group flex flex-col gap-1 py-4 border-t border-white/10"
                >
                  <span className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase text-white/30">
                    {label}
                  </span>
                  <span className="font-['DM_Mono'] text-sm transition-colors group-hover:text-[#00f5c4] text-white/70">
                    {val} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#00f5c4]" />
            <span className="font-['DM_Mono'] text-xs tracking-[0.15em] uppercase text-[#00f5c4]/70">
              Currently available for opportunities
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
