import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cur-dot")!;
    const ring = document.getElementById("cur-ring")!;
    let mx = -100,
      my = -100,
      lx = -100,
      ly = -100;
    let hovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    const interactiveEls = document.querySelectorAll("a,button,[data-mag]");
    const handleEnter = () => {
      hovering = true;
    };
    const handleLeave = () => {
      hovering = false;
    };
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    let raf: number;
    const tick = () => {
      lx += (mx - lx) * 0.1;
      ly += (my - ly) * 0.1;
      if (dot) {
        dot.style.left = `${mx}px`;
        dot.style.top = `${my}px`;
      }
      if (ring) {
        ring.style.left = `${lx}px`;
        ring.style.top = `${ly}px`;
        ring.style.width = hovering ? "52px" : "36px";
        ring.style.height = hovering ? "52px" : "36px";
        ring.style.borderColor = hovering ? "#00f5c4" : "rgba(237,234,225,0.32)";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        id="cur-dot"
        className="fixed pointer-events-none hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00f5c4",
          zIndex: 9999,
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        id="cur-ring"
        className="fixed pointer-events-none hidden md:block"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(237,234,225,0.32)",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition: "width .3s,height .3s,border-color .3s",
        }}
      />
      <style>{`@media(hover:hover){*{cursor:none!important}}`}</style>
    </>
  );
}
