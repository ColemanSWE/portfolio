"use client";

import { useStaggeredReveal } from "../../hooks/useScrollReveal";
import { useTilt } from "../../hooks/useTilt";
import {
  PortfolioCard,
  PortfolioGrid,
  Section,
} from "../../components/ui/PortfolioCard";
import { TechTag } from "../../components/ui/PortfolioButton";
import { HolographicBorder } from "../../components/ui/HolographicBorder";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const tiltRef = useTilt<HTMLDivElement>({ maxTilt: 8, scale: 1.02 });

  return (
    <div ref={tiltRef} className={className}>
      <HolographicBorder>{children}</HolographicBorder>
    </div>
  );
}

export default function Skills() {
  const skills = {
    FRONTEND: [
      "REACT",
      "TYPESCRIPT",
      "JAVASCRIPT",
      "NEXT.JS",
      "REDUX",
      "HTML5",
      "CSS3",
      "TAILWIND",
      "MATERIAL UI",
      "ANT DESIGN",
      "BOOTSTRAP",
      "LIT.JS",
      "THREE.JS",
    ],
    BACKEND: [
      "NODE.JS",
      "NEST.JS",
      "PYTHON",
      "RUBY ON RAILS",
      "GRAPHQL",
      "REST APIS",
    ],
    TESTING: ["JEST", "CYPRESS", "REACT TESTING LIBRARY"],
    TOOLS: [
      "GIT",
      "GITHUB ACTIONS",
      "AWS",
      "CI/CD",
      "CONTENTFUL CMS",
      "BROWSER APIS",
    ],
  };

  const { containerRef, visibleItems } = useStaggeredReveal(
    Object.keys(skills).length,
    200
  );

  return (
    <Section id="skills" title="TECHNICAL ARSENAL" bgColor="rainbow-subtle">
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto"
      >
        <PortfolioGrid maxWidth="6xl">
          {Object.entries(skills).map(([category, skillList], index) => (
            <TiltCard
              key={index}
              className={`scroll-reveal ${visibleItems[index] ? "revealed" : ""}`}
            >
              <PortfolioCard className="!bg-transparent !backdrop-blur-none !border-0 !shadow-none !m-0">
                <h3 className="text-2xl font-bold mb-8 tracking-wide text-center bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillList.map((skill, i) => (
                    <TechTag
                      key={i}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      {skill}
                    </TechTag>
                  ))}
                </div>
              </PortfolioCard>
            </TiltCard>
          ))}
        </PortfolioGrid>
      </div>
    </Section>
  );
}
