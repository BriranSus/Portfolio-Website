import { useState, useEffect } from "react";

export interface ViewportScalerState {
  scale: number;
  isMobile: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

const DESKTOP_BASE_WIDTH = 1920;
const DESKTOP_BASE_HEIGHT = 1080;
const MOBILE_BREAKPOINT = 768;

export function useViewportScaler(): ViewportScalerState {
  const [state, setState] = useState<ViewportScalerState>(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const h = typeof window !== "undefined" ? window.innerHeight : 1080;
    const isMob = w <= MOBILE_BREAKPOINT;
    const s = isMob ? 1 : Math.min(w / DESKTOP_BASE_WIDTH, h / DESKTOP_BASE_HEIGHT);
    return {
      scale: s,
      isMobile: isMob,
      viewportWidth: w,
      viewportHeight: h,
    };
  });

  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const isMob = w <= MOBILE_BREAKPOINT;
        const s = isMob ? 1 : Math.min(w / DESKTOP_BASE_WIDTH, h / DESKTOP_BASE_HEIGHT);

        setState({
          scale: s,
          isMobile: isMob,
          viewportWidth: w,
          viewportHeight: h,
        });
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return state;
}
