import { getPortfolioData } from '../../lib/portfolio-data'
import { Section } from '../../components/ui/PortfolioCard'
import ExperienceClient from './ExperienceClient'

export default async function ExperienceServer() {
  const { experiences } = await getPortfolioData()
  
  return (
    <Section id="experience" title="OPERATIONAL HISTORY" bgColor="rainbow-grid">
      <ExperienceClient experiences={experiences} />
    </Section>
  )
} 