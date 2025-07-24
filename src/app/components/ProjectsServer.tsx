import { getPortfolioData } from '../../lib/portfolio-data'
import { PortfolioCard, PortfolioGrid, Section } from '../../components/ui/PortfolioCard'
import { PortfolioButton, TechTag } from '../../components/ui/PortfolioButton'
import { ExternalLink, Github } from 'lucide-react'

export default async function ProjectsServer() {
  const { projects } = await getPortfolioData()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRODUCTION': return 'bg-green-400 text-white'
      case 'BETA': return 'bg-yellow-400 text-white'
      case 'DEVELOPMENT': return 'bg-red-400 text-white'
      default: return 'bg-gray-400 text-white'
    }
  }

  return (
    <Section id="projects" title="DEPLOYED SYSTEMS" bgColor="rainbow-grid">
      <PortfolioGrid maxWidth="6xl">
        {projects.map((project, index) => (
          <PortfolioCard key={index}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold tracking-wide text-white">{project.title}</h3>
              <div className={`glass-morphism-bright px-4 py-2 text-base font-bold border border-white/20 ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
            </div>
            
            <p className="text-gray-300 font-medium leading-relaxed mb-6">
              {project.description}
            </p>
            
            <div className="mb-6">
              <h4 className="font-bold mb-3 tracking-wide text-white">KEY FEATURES:</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="text-base font-medium text-gray-300">
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
              {project.github && (
                <PortfolioButton 
                  href={project.github}
                  variant="secondary"
                  size="sm"
                  icon={Github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CODE
                </PortfolioButton>
              )}
              {project.live && (
                <PortfolioButton 
                  href={project.live}
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LIVE DEMO
                </PortfolioButton>
              )}
            </div>
          </PortfolioCard>
        ))}
      </PortfolioGrid>
    </Section>
  )
} 