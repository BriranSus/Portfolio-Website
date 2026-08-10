import { useState, useEffect } from "react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DUR = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setCount(Math.floor(e * 100));
      if (p < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => setReveal(true), 200);
        setTimeout(() => {
          setGone(true);
          onDone();
        }, 1600);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="fixed inset-0 flex" style={{ zIndex: 200 }}>
      <div
        className="relative flex-1 flex flex-col justify-between p-8 overflow-hidden"
        style={{
          background: "#000c1a",
          transform: reveal ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 1.1s cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase" style={{ color: "#00f5c4" }}>
          ◈&nbsp;&nbsp;Portfolio
        </div>
        <div>
          <div
            className="font-['Archivo_Black'] leading-none mb-4 select-none"
            style={{
              fontSize: "clamp(5rem,18vw,14rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,245,196,0.07)",
            }}
          >
            {String(count).padStart(3, "0")}
          </div>
          <div style={{ height: 1, background: "rgba(237,234,225,0.06)", marginBottom: 2 }} />
          <div style={{ width: `${count}%`, height: 1, background: "#00f5c4", transition: "width .05s linear" }} />
        </div>
      </div>
      <div
        className="relative flex-1 flex flex-col items-end justify-between p-8"
        style={{
          background: "#000c1a",
          transform: reveal ? "translateX(100%)" : "translateX(0)",
          transition: "transform 1.1s cubic-bezier(0.76,0,0.24,1)",
          borderLeft: "1px solid rgba(237,234,225,0.04)",
        }}
      >
        <div className="font-['DM_Mono'] text-xs tracking-[0.3em] uppercase text-right" style={{ color: "rgba(237,234,225,0.18)" }}>
          Loading
        </div>
        <div className="text-right">
          <div
            className="font-['Archivo_Black'] leading-none mb-4"
            style={{ fontSize: "clamp(5rem,18vw,14rem)", color: "#edeae1", letterSpacing: "-0.04em" }}
          >
            {String(count).padStart(3, "0")}
          </div>
          <div className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(237,234,225,0.15)" }}>
            Full Stack Developer
          </div>
        </div>
      </div>
    </div>
  );
}
