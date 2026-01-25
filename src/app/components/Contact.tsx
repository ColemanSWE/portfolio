"use client";

import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { useStaggeredReveal } from "../../hooks/useScrollReveal";
import { useTilt } from "../../hooks/useTilt";
import {
  PortfolioCard,
  PortfolioGrid,
  Section,
} from "../../components/ui/PortfolioCard";
import { PortfolioButton } from "../../components/ui/PortfolioButton";
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

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "info@colemanro.se",
      href: "mailto:info@colemanro.se",
    },
    {
      icon: Github,
      label: "GITHUB",
      value: "github.com/colemanswe",
      href: "https://github.com/colemanswe",
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "linkedin.com/in/coleman-rose",
      href: "https://linkedin.com/in/coleman-rose",
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "HELSINKI, FINLAND 🇫🇮",
      href: null,
    },
  ];

  const { containerRef, visibleItems } = useStaggeredReveal(
    contacts.length + 1,
    200
  );

  return (
    <Section id="contact" title="ESTABLISH CONNECTION" bgColor="rainbow-subtle">
      <div className="max-w-4xl mx-auto">
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="max-w-4xl mx-auto"
        >
          <TiltCard
            className={`text-center mb-12 scroll-reveal ${visibleItems[0] ? "revealed" : ""}`}
          >
            <PortfolioCard className="!bg-transparent !backdrop-blur-none !border-0 !shadow-none !m-0">
              <div className="space-y-6">
                <div className="text-xl font-bold tracking-wide text-white leading-relaxed">
                  READY TO ARCHITECT YOUR NEXT DIGITAL SOLUTION?
                </div>
                <div className="text-lg font-bold tracking-wide text-gray-300 leading-relaxed">
                  AVAILABLE FOR FULL-TIME POSITIONS, CONTRACT WORK, AND
                  CONSULTANCY. SPECIALIZING IN REACT ECOSYSTEMS AND SCALABLE
                  BACKEND ARCHITECTURES.
                </div>
              </div>
            </PortfolioCard>
          </TiltCard>

          <PortfolioGrid>
            {contacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <TiltCard
                  key={index}
                  className={`text-center scroll-reveal ${visibleItems[index + 1] ? "revealed" : ""}`}
                >
                  <PortfolioCard className="!bg-transparent !backdrop-blur-none !border-0 !shadow-none !m-0">
                    <div className="flex justify-center mb-6">
                      <div className="glass-morphism-bright p-6 rounded-full">
                        <IconComponent size={32} className="text-cyan-400" />
                      </div>
                    </div>
                    <div className="font-bold mb-4 tracking-wide text-white text-lg">
                      {contact.label}
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 break-all font-medium"
                        target={
                          contact.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          contact.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <div className="text-gray-300 break-all font-medium">
                        {contact.value}
                      </div>
                    )}
                  </PortfolioCard>
                </TiltCard>
              );
            })}
          </PortfolioGrid>

          <div className="text-center mt-12">
            <PortfolioButton
              href="mailto:info@colemanro.se"
              variant="primary"
              size="lg"
            >
              SEND MESSAGE
            </PortfolioButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
