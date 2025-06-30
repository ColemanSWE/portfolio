'use client'

import { useState } from 'react'
import { Experience } from '../../lib/portfolio-data'
import { PortfolioCard } from '../../components/ui/PortfolioCard'
import { TechTag } from '../../components/ui/PortfolioButton'

export default function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3)

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        {visibleExperiences.map((exp, index) => (
          <PortfolioCard key={index}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold tracking-wide">{exp.title}</h3>
              <span className="portfolio-border bg-red-400 px-3 py-1 text-sm font-bold">
                {exp.duration}
              </span>
            </div>
            
            <div className="text-xl font-bold mb-4 tracking-wide">
              {exp.company}{exp.location && ` • ${exp.location}`}
            </div>
            
            <div className="space-y-2 mb-6">
              {exp.description.map((desc: string, i: number) => (
                <p key={i} className="portfolio-text text-sm">
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
          <button
            onClick={() => setShowAll(!showAll)}
            className="portfolio-border bg-yellow-400 px-6 py-3 text-lg font-bold hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            {showAll ? 'SHOW LESS ▲' : `SHOW MORE (${experiences.length - 3} MORE POSITIONS) ▼`}
          </button>
        </div>
      )}
    </>
  )
} 