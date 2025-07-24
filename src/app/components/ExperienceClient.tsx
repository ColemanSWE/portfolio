'use client'

import { useState } from 'react'
import { Experience } from '../../lib/portfolio-data'
import { PortfolioCard } from '../../components/ui/PortfolioCard'
import { TechTag, PortfolioButton } from '../../components/ui/PortfolioButton'

export default function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3)

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        {visibleExperiences.map((exp, index) => (
          <PortfolioCard key={index}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold tracking-wide text-white">{exp.title}</h3>
              <div className="glass-morphism-bright px-4 py-2 text-base font-bold text-cyan-400 border border-cyan-400/30">
                {exp.duration}
              </div>
            </div>
            
            <div className="text-xl font-bold mb-4 tracking-wide text-gray-300">
              {exp.company}{exp.location && ` • ${exp.location}`}
            </div>
            
            <div className="space-y-2 mb-6">
              {exp.description.map((desc: string, i: number) => (
                <p key={i} className="text-gray-300 font-medium leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech: string, i: number) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </div>
          </PortfolioCard>
        ))}
      </div>
      
      {experiences.length > 3 && (
        <div className="text-center mt-12">
          <PortfolioButton
            onClick={() => setShowAll(!showAll)}
            variant="secondary"
            size="lg"
          >
            {showAll ? 'SHOW LESS ▲' : `SHOW MORE (${experiences.length - 3} MORE POSITIONS) ▼`}
          </PortfolioButton>
        </div>
      )}
    </>
  )
} 