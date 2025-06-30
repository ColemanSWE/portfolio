import { MetadataRoute } from 'next'
import { getPortfolioData } from '../lib/portfolio-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioData = await getPortfolioData()
  
  const baseUrl = 'https://colemanro.se'
  
  const projectPages = portfolioData.projects
    .filter(project => project.live)
    .map(project => ({
      url: project.live!,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    ...projectPages,
  ]
} 