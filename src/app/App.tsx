import { useState } from "react";
import { ThreeBackground } from "./canvas/ThreeBackground";
import { CustomCursor } from "./components/common/CustomCursor";
import { PageButton } from "./components/common/PageButton";
import { Preloader } from "./components/common/Preloader";
import { ElevatorOverlay } from "./components/common/ElevatorOverlay";
import { Nav } from "./components/layout/Nav";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { StackSection } from "./components/sections/StackSection";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/layout/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="min-h-screen relative">
      <ThreeBackground />
      <ElevatorOverlay />
      <CustomCursor />
      <PageButton />
      <Preloader onDone={() => setReady(true)} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav ready={ready} />
        <main>
          <Hero ready={ready} />
          <About />
          <Services />
          <ProjectsSection />
          <StackSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
