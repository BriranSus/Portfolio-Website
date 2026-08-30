import React, { useRef, useState, useEffect } from "react";
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
  { id: "experience", label: "03 — EXPERIENCE" },
  { id: "projects", label: "04 — PROJECTS" },
  { id: "stack", label: "05 — STACK" },
  { id: "certificates", label: "06 — CERTS" },
  { id: "contact", label: "07 — CONTACT" },
];

export function FullpageScroll({
  children,
  onSectionChange,
  targetIndex,
  ready = false,
}: FullpageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const { scale, isMobile } = useViewportScaler();
  const totalSections = React.Children.count(children);

  // Background gradients array shared across mobile & desktop
  const bgGrads = [
    "radial-gradient(ellipse at 50% 30%, rgba(0, 245, 196, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
    "radial-gradient(ellipse at 70% 50%, rgba(183, 95, 255, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
    "radial-gradient(ellipse at 30% 60%, rgba(255, 45, 107, 0.08) 0%, rgba(2, 8, 23, 0.75) 70%)",
    "radial-gradient(ellipse at 50% 50%, rgba(0, 245, 196, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
    "radial-gradient(ellipse at 80% 40%, rgba(183, 95, 255, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
    "radial-gradient(ellipse at 35% 55%, rgba(0, 245, 196, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
    "radial-gradient(ellipse at 40% 70%, rgba(255, 45, 107, 0.09) 0%, rgba(2, 8, 23, 0.75) 70%)",
  ];

  // IntersectionObserver for mobile snap scrolling
  useEffect(() => {
    if (!isMobile || !mobileContainerRef.current) return;

    const sections = mobileContainerRef.current.querySelectorAll(".mobile-snap-section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute("data-section-index");
            if (idxStr !== null) {
              const idx = parseInt(idxStr, 10);
              if (idx !== activeIndexRef.current) {
                setActiveIndex(idx);
                activeIndexRef.current = idx;
                if (onSectionChange) onSectionChange(idx);

                if (bgOverlayRef.current) {
                  bgOverlayRef.current.style.background = bgGrads[idx % bgGrads.length];
                }
              }
            }
          }
        });
      },
      {
        root: mobileContainerRef.current,
        threshold: 0.5,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [isMobile, totalSections]);

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current || isMobile) return;

      if (bgOverlayRef.current) {
        gsap.set(bgOverlayRef.current, {
          background: bgGrads[0],
        });
      }

      const sectionElements = containerRef.current.querySelectorAll<HTMLElement>(".fullpage-section");

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

    setActiveIndex(nextIndex);
    activeIndexRef.current = nextIndex;
    if (onSectionChange) onSectionChange(nextIndex);

    const sectionElements = containerRef.current?.querySelectorAll<HTMLElement>(".fullpage-section");

    if (!sectionElements) return;

    const currentSec = sectionElements[currentIndex];
    const nextSec = sectionElements[nextIndex];

    if (bgOverlayRef.current) {
      gsap.to(bgOverlayRef.current, {
        background: bgGrads[nextIndex % bgGrads.length],
        duration: 1.2,
        ease: "power2.inOut",
      });
    }

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

    const titles = nextSec.querySelectorAll(".section-title, .section-header, h2");
    if (titles.length > 0) {
      tl.fromTo(
        titles,
        { y: direction > 0 ? -40 : 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
        0.3
      );
    }

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
      const targetSec = mobileContainerRef.current?.querySelector(
        `[data-section-index="${targetIdx}"]`
      );
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: "smooth" });
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

  // Mobile Layout (<= 768px): Native Vertical Snap Scrolling
  if (isMobile) {
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-transparent z-10 select-none">
        {/* Full screen backdrop gradient covering 100vw x 100vh */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700"
          style={{
            background: bgGrads[activeIndex % bgGrads.length],
          }}
        />

        {/* Mobile Top Navigation */}
        <Nav ready={ready} activeIndex={activeIndex} onSelectSection={handleSelectSection} />

        {/* Mobile Vertical Snap Scroll Container */}
        <div
          ref={mobileContainerRef}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative z-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              data-section-index={idx}
              id={SECTIONS[idx]?.id}
              className="mobile-snap-section w-full min-h-[100dvh] h-[100dvh] snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden pt-3 pb-20 px-3 sm:px-6"
            >
              <div className="w-full h-full flex flex-col justify-center items-center overflow-y-auto no-scrollbar">
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Layout (> 768px): Auto-Scaled 1600x900 Virtual Canvas with GSAP Observer
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-transparent z-10 select-none">
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000"
        style={{
          background: bgGrads[activeIndex % bgGrads.length],
        }}
      />

      <div
        ref={containerRef}
        className="relative overflow-hidden bg-transparent shadow-2xl transition-transform duration-75"
        style={{
          width: 1600,
          height: 900,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <Nav ready={ready} activeIndex={activeIndex} onSelectSection={handleSelectSection} />

        <SectionNav activeIndex={activeIndex} onSelectSection={handleSelectSection} sections={SECTIONS} />

        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className="fullpage-section absolute inset-0 w-[1600px] h-[900px] pt-16 flex flex-col justify-center items-center overflow-hidden"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}