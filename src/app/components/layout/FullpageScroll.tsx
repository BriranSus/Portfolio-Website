import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionNav } from "../common/SectionNav";
import { Nav } from "./Nav";
import { useViewportScaler } from "../../hooks/useViewportScaler";

gsap.registerPlugin(Observer, ScrollTrigger);

interface FullpageScrollProps {
  children: React.ReactNode[];
  onSectionChange?: (index: number) => void;
  targetIndex?: number;
  ready?: boolean;
}

const SECTIONS = [
  { id: "hero", label: "01 — HERO" },
  { id: "about", label: "02 — ABOUT" },
  { id: "services", label: "03 — SERVICES" },
  { id: "projects", label: "04 — PROJECTS" },
  { id: "stack", label: "05 — STACK" },
  { id: "contact", label: "06 — CONTACT" },
];

export function FullpageScroll({ children, onSectionChange, targetIndex, ready = false }: FullpageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const { scale, isMobile } = useViewportScaler();
  const totalSections = React.Children.count(children);

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current || isMobile) return;

      // Set initial transparent radial gradient background for Hero section across full screen
      if (bgOverlayRef.current) {
        gsap.set(bgOverlayRef.current, {
          background: "radial-gradient(ellipse at 50% 30%, rgba(0, 245, 196, 0.08) 0%, rgba(2, 8, 23, 0.7) 70%)",
        });
      }

      const sectionElements = containerRef.current.querySelectorAll<HTMLElement>(".fullpage-section");

      // Set initial positions: section 0 is visible, all others are hidden below/above
      sectionElements.forEach((sec, idx) => {
        if (idx === 0) {
          gsap.set(sec, {
            display: "flex",
            opacity: 1,
            yPercent: 0,
            scale: 1,
            zIndex: 10,
          });
        } else {
          gsap.set(sec, {
            display: "none",
            opacity: 0,
            yPercent: 100,
            scale: 1,
            zIndex: 1,
          });
        }
      });

      // Create Observer for smooth wheel, touch, and pointer events on desktop
      const observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: 1,
        tolerance: 15,
        preventDefault: false,
        onDown: () => {
          if (!isAnimatingRef.current && activeIndexRef.current < totalSections - 1) {
            gotoSection(activeIndexRef.current + 1, 1);
          }
        },
        onUp: () => {
          if (!isAnimatingRef.current && activeIndexRef.current > 0) {
            gotoSection(activeIndexRef.current - 1, -1);
          }
        },
      });

      // Key navigation (ArrowDown, ArrowUp, PageDown, PageUp)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimatingRef.current) return;
        if (e.key === "ArrowDown" || e.key === "PageDown") {
          if (activeIndexRef.current < totalSections - 1) {
            gotoSection(activeIndexRef.current + 1, 1);
          }
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          if (activeIndexRef.current > 0) {
            gotoSection(activeIndexRef.current - 1, -1);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        observer.kill();
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    { scope: containerRef, dependencies: [totalSections, isMobile] }
  );

  const gotoSection = contextSafe((nextIndex: number, direction: number) => {
    if (
      isAnimatingRef.current ||
      nextIndex < 0 ||
      nextIndex >= totalSections ||
      nextIndex === activeIndexRef.current ||
      isMobile
    ) {
      return;
    }

    isAnimatingRef.current = true;
    const currentIndex = activeIndexRef.current;
    
    // Immediately update active index state for instant indicator & background sync
    setActiveIndex(nextIndex);
    activeIndexRef.current = nextIndex;
    if (onSectionChange) onSectionChange(nextIndex);

    const sectionElements = containerRef.current?.querySelectorAll<HTMLElement>(".fullpage-section");

    if (!sectionElements) return;

    const currentSec = sectionElements[currentIndex];
    const nextSec = sectionElements[nextIndex];

    // Background gradient shift effect across full screen backdrop
    const bgGrads = [
      "radial-gradient(ellipse at 50% 30%, rgba(0, 245, 196, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
      "radial-gradient(ellipse at 70% 50%, rgba(140, 0, 255, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
      "radial-gradient(ellipse at 30% 60%, rgba(255, 45, 107, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
      "radial-gradient(ellipse at 50% 50%, rgba(0, 245, 196, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
      "radial-gradient(ellipse at 80% 40%, rgba(140, 0, 255, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
      "radial-gradient(ellipse at 40% 70%, rgba(255, 45, 107, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
    ];

    if (bgOverlayRef.current) {
      gsap.to(bgOverlayRef.current, {
        background: bgGrads[nextIndex % bgGrads.length],
        duration: 1.2,
        ease: "power2.inOut",
      });
    }

    // Set initial position of next section
    gsap.set(nextSec, {
      display: "flex",
      opacity: 0,
      yPercent: direction > 0 ? 35 : -35,
      scale: direction > 0 ? 1.03 : 0.97,
      zIndex: 10,
    });

    gsap.set(currentSec, { zIndex: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSec, { display: "none" });
        isAnimatingRef.current = false;
      },
    });

    // 1. Parallax Out for current section
    tl.to(
      currentSec,
      {
        opacity: 0,
        yPercent: direction > 0 ? -25 : 25,
        scale: direction > 0 ? 0.95 : 1.05,
        duration: 0.85,
        ease: "power3.inOut",
      },
      0
    );

    // 2. Entrance for next section
    tl.to(
      nextSec,
      {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      0.15
    );

    // 3. Section Title Entrance (Fade from Top)
    const titles = nextSec.querySelectorAll(".section-title, .section-header, h2");
    if (titles.length > 0) {
      tl.fromTo(
        titles,
        { y: direction > 0 ? -40 : 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
        0.3
      );
    }

    // 4. Content / Cards Stagger Entrance (Fade from Bottom)
    const items = nextSec.querySelectorAll(
      ".section-content, .section-card, .stagger-item, p, .grid > div"
    );
    if (items.length > 0) {
      tl.fromTo(
        items,
        { y: direction > 0 ? 45 : -45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.06 },
        0.4
      );
    }
  });

  const handleSelectSection = (targetIdx: number) => {
    if (isMobile) {
      const sectionIds = ["hero", "about", "services", "projects", "stack", "contact"];
      const targetId = sectionIds[targetIdx];
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
      setActiveIndex(targetIdx);
      if (onSectionChange) onSectionChange(targetIdx);
      return;
    }

    if (targetIdx === activeIndexRef.current || isAnimatingRef.current) return;
    const direction = targetIdx > activeIndexRef.current ? 1 : -1;
    gotoSection(targetIdx, direction);
  };

  React.useEffect(() => {
    if (typeof targetIndex === "number" && targetIndex !== activeIndexRef.current) {
      handleSelectSection(targetIndex);
    }
  }, [targetIndex]);

  // Render Mobile Layout (<= 768px): Normal Vertical Scroll
  if (isMobile) {
    return (
      <div className="w-full min-h-screen overflow-y-auto bg-transparent py-16 px-4 flex flex-col gap-20 relative z-10">
        <Nav ready={ready} activeIndex={activeIndex} onSelectSection={handleSelectSection} />
        <SectionNav activeIndex={activeIndex} onSelectSection={handleSelectSection} sections={SECTIONS} />
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="w-full flex flex-col items-center justify-center">
            {child}
          </div>
        ))}
      </div>
    );
  }

  // Render Desktop Layout (> 768px): Auto-Scaled 1920x1080 Fixed Virtual Canvas
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-transparent z-10 select-none">
      {/* Full-width Top Navbar spanning 100% screen width with inner content scaled proportionally */}
      <Nav ready={ready} activeIndex={activeIndex} onSelectSection={handleSelectSection} scale={scale} />

      {/* Fixed Right Side Section Indicator dots scaled proportionally */}
      <SectionNav activeIndex={activeIndex} onSelectSection={handleSelectSection} sections={SECTIONS} scale={scale} />

      {/* Full screen backdrop gradient covering 100vw x 100vh with no side gaps */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0, 245, 196, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
        }}
      />

      {/* 1920x1080 Auto-Scaled Virtual Canvas Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-transparent shadow-2xl transition-transform duration-75"
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        {/* 1920x1080 Section Slides */}
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className="fullpage-section absolute inset-0 w-[1920px] h-[1080px] pt-16 flex flex-col justify-center items-center overflow-hidden"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
