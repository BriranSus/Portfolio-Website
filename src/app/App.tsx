import { useState } from "react";
import { ThreeBackground } from "./canvas/ThreeBackground";
import { CustomCursor } from "./components/common/CustomCursor";
import { Preloader } from "./components/common/Preloader";
import { FullpageScroll } from "./components/layout/FullpageScroll";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { StackSection } from "./components/sections/StackSection";
import { CertificatesSection } from "./components/sections/CertificatesSection";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [targetSection, setTargetSection] = useState<number | undefined>(undefined);

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      <ThreeBackground activeIndex={activeSection} />
      <CustomCursor />
      <Preloader onDone={() => setReady(true)} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <FullpageScroll
          ready={ready}
          targetIndex={targetSection}
          onSectionChange={(idx) => {
            setActiveSection(idx);
            setTargetSection(undefined);
          }}
        >
          <Hero ready={ready} onSelectSection={(idx) => setTargetSection(idx)} />
          <About />
          <ExperienceSection />
          <ProjectsSection />
          <StackSection />
          <CertificatesSection />
          <Contact />
        </FullpageScroll>
      </div>
    </div>
  );
}
