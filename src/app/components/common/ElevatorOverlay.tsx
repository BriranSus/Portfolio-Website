import { useEffect, useState } from "react";
import { Activity, Thermometer } from "lucide-react";

export function ElevatorOverlay() {
  const [depth, setDepth] = useState(12);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [time, setTime] = useState("");

  // Live time ticker
  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update depth meter & scroll progress dynamically as user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / scrollMax));
      setScrollProgress(progress);
      // Depth ranges from 12m at surface down to 260m at ocean seabed
      const calculatedDepth = Math.round(12 + progress * 248);
      setDepth(calculatedDepth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic telemetry calculations based on depth
  const tempNum = 26.4 - scrollProgress * 22.2;
  const temp = tempNum.toFixed(1); // 26.4°C down to 4.2°C
  const ph = (8.1 - scrollProgress * 0.5).toFixed(1); // 8.1 pH down to 7.6 pH
  const press = (1.0 + depth * 0.098).toFixed(1); // 1.0 BAR up to 26.5 BAR

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* Acrylic Glass Glare & Light Reflection */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 30%, rgba(0,245,196,0.015) 65%, transparent 100%)",
        }}
      />
      
      {/* Outer Glass Vignette Blur / Shadow */}
      <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,10,22,0.85)] z-10" />

      {/* FUTURISTIC SUBSEA TELEMETRY HUD (Transparent Glassmorphic HUD) */}
      <div className="absolute top-16 md:top-18 right-6 md:right-10 z-20 hidden sm:flex items-center gap-4 bg-[#000c1a]/40 backdrop-blur-2xl border border-white/15 px-4 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] font-['DM_Mono'] transition-all duration-300 hover:border-[#00f5c4]/40">
        
        {/* Left Data Panel */}
        <div className="flex flex-col gap-1 text-[9px] tracking-wider pr-4 border-r border-white/10">
          <div className="flex items-center gap-1.5 text-[#00f5c4] font-bold uppercase text-[10px] pb-0.5">
            <Activity className="w-3.5 h-3.5 animate-pulse text-[#00f5c4]" />
            SYSTEM READY
          </div>
          <div className="text-white/70 flex items-center justify-between gap-4">
            <span className="text-white/40">TIME</span>
            <span className="text-white font-semibold">{time || "12:00:00"}</span>
          </div>
          <div className="text-white/70 flex items-center justify-between gap-4">
            <span className="text-white/40">pH WATER</span>
            <span className="text-[#00f5c4] font-semibold">{ph}</span>
          </div>
          <div className="text-white/70 flex items-center justify-between gap-4">
            <span className="text-white/40">PRESSURE</span>
            <span className="text-[#00f5c4] font-semibold">{press} BAR</span>
          </div>
        </div>

        {/* Thermometer Temperature Gauge Module */}
        <div className="flex items-center gap-3 pl-1">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
            {/* Thermometer Icon & Visual Tube Indicator */}
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-5 h-5 text-[#00f5c4] animate-pulse" />
              <div className="w-1.5 h-8 bg-white/10 rounded-full overflow-hidden flex flex-col justify-end p-0.5 border border-white/20">
                <div
                  className="w-full bg-gradient-to-t from-[#3b82f6] to-[#00f5c4] rounded-full transition-all duration-300"
                  style={{ height: `${Math.max(15, (tempNum / 30) * 100)}%` }}
                />
              </div>
            </div>
            {/* Temperature Value */}
            <div className="flex flex-col text-left">
              <span className="text-[8px] text-white/40 uppercase tracking-widest">WATER TEMP</span>
              <span className="text-sm font-bold text-white tracking-tight">
                {temp}<span className="text-xs text-[#00f5c4]">°C</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM FLOOR ELEVATOR DECK & CONTROL STRIP */}
      <div className="absolute bottom-0 inset-x-0 h-10 md:h-14 bg-gradient-to-t from-[#06101e] via-[#08182b] to-transparent border-t border-[#00f5c4]/30 z-20 flex items-center justify-between px-6 md:px-12">
        {/* Telemetry Control Panel (Bottom Left) */}
        <div className="flex items-center gap-4">
          <div className="relative w-7 h-7 rounded-full border border-[#00f5c4]/40 flex items-center justify-center bg-[#000c1a]/80">
            <div className="w-full h-0.5 bg-[#00f5c4]/40 animate-spin" style={{ animationDuration: "3s" }} />
            <div className="absolute w-1 h-1 rounded-full bg-[#00f5c4]" />
          </div>
          <div className="flex flex-col">
            <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] text-[#00f5c4] font-bold">
              SONAR RADAR ACTIVE
            </span>
            <span className="font-['DM_Mono'] text-[9px] text-white/50">
              {scrollProgress > 0.65
                ? "DEEP BEDROCK SEDIMENT — SUBSEA FOUNDATION"
                : "SUBSEA RESEARCH HABITAT SCANNER"}
            </span>
          </div>
        </div>

        {/* Live Depth Bar (Bottom Right) */}
        <div className="flex items-center gap-4 bg-[#000c1a]/90 border border-[#00f5c4]/30 px-4 py-1.5 rounded-lg backdrop-blur-md shadow-lg">
          <div className="flex flex-col items-end">
            <span className="font-['DM_Mono'] text-[9px] text-white/40 tracking-wider uppercase">
              CURRENT DEPTH
            </span>
            <span className="font-['DM_Mono'] text-xs font-bold text-[#00f5c4] tracking-widest">
              {depth} METERS BELOW SURFACE
            </span>
          </div>
          <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#00f5c4] to-[#8c00ff] transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* LEFT ELEVATOR SUPPORT COLUMN WITH RIVETS */}
      <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-gradient-to-r from-[#051120] via-[#091a2f] to-transparent border-r border-[#00f5c4]/30 z-20 flex flex-col justify-between py-12 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] shadow-[0_0_6px_#00f5c4]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
      </div>

      {/* RIGHT ELEVATOR SUPPORT COLUMN WITH RIVETS */}
      <div className="absolute right-0 top-0 bottom-0 w-4 md:w-6 bg-gradient-to-l from-[#051120] via-[#091a2f] to-transparent border-l border-[#00f5c4]/30 z-20 flex flex-col justify-between py-12 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] shadow-[0_0_6px_#00f5c4]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 border border-white/40" />
      </div>
    </div>
  );
}
