/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no experimental flag needed
  
  // Enable experimental features for better SSR
  experimental: {
    serverComponentsExternalPackages: ['three', '@react-three/fiber'],
    optimizePackageImports: ['lucide-react'],
  },
  
  // Optimize images and static assets
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Enable compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Static optimization
  trailingSlash: false,
  
  // Webpack optimizations
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
        },
      },
    })
    return config
  },
}

module.exports = nextConfig 