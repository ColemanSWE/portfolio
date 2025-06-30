import { getPortfolioData } from '../../lib/portfolio-data'
import { PortfolioCard, PortfolioGrid, Section } from '../../components/ui/PortfolioCard'
import { PortfolioButton, TechTag } from '../../components/ui/PortfolioButton'
import { ExternalLink, Github } from 'lucide-react'

export default async function ProjectsServer() {
  const { projects } = await getPortfolioData()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRODUCTION': return 'bg-green-400'
      case 'BETA': return 'bg-yellow-400'
      case 'DEVELOPMENT': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <Section id="projects" title="DEPLOYED SYSTEMS" bgColor="gray-50">
      <PortfolioGrid maxWidth="6xl">
        {projects.map((project, index) => (
          <PortfolioCard key={index}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold tracking-wide">{project.title}</h3>
              <span className={`portfolio-border ${getStatusColor(project.status)} px-3 py-1 text-sm font-bold`}>
                {project.status}
              </span>
            </div>
            
            <p className="portfolio-text text-sm mb-6">
              {project.description}
            </p>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2 tracking-wide">KEY FEATURES:</h4>
              <ul className="space-y-1">
                {project.features.map((feature, i) => (
                  <li key={i} className="text-sm font-bold">
                    → {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </div>
            
            <div className="flex gap-4">
              <PortfolioButton 
                href={project.github}
                icon={Github}
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                CODE
              </PortfolioButton>
              
              {project.live && (
                <PortfolioButton 
                  href={project.live}
                  variant="secondary"
                  icon={ExternalLink}
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LIVE
                </PortfolioButton>
              )}
            </div>
          </PortfolioCard>
        ))}
      </PortfolioGrid>
    </Section>
  )
} 