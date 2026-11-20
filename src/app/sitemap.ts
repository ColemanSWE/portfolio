import { MetadataRoute } from 'next';

// One page: anchors (#game, #lab, …) and other sites' URLs don't belong in a sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://colemanro.se',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
