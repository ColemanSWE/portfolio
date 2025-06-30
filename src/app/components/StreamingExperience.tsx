import { Suspense } from 'react'
import { getPortfolioData } from '../../lib/portfolio-data'
import { PortfolioCard, Section } from '../../components/ui/PortfolioCard'
import { TechTag } from '../../components/ui/PortfolioButton'

async function getExperienceDataSlow() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const { experiences } = await getPortfolioData()
  return experiences.slice(0, 3)
}

function ExperienceLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {[...Array(3)].map((_, index) => (
               <PortfolioCard key={index}>
           <div className="animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              <div className="h-3 bg-gray-300 rounded w-4/6"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 rounded w-16"></div>
              ))}
            </div>
          </div>
        </PortfolioCard>
      ))}
    </div>
  )
}

async function ExperienceData() {
  const experiences = await getExperienceDataSlow()
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {experiences.map((exp, index) => (
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
            {exp.description.map((desc, i) => (
              <p key={i} className="portfolio-text text-sm">
                {desc}
              </p>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <TechTag key={i}>{tech}</TechTag>
            ))}
          </div>
        </PortfolioCard>
      ))}
    </div>
  )
}

export default function StreamingExperience() {
  return (
    <Section id="experience-streaming" title="OPERATIONAL HISTORY (STREAMING)" bgColor="gray-50">
      <Suspense fallback={<ExperienceLoading />}>
        <ExperienceData />
      </Suspense>
    </Section>
  )
} 