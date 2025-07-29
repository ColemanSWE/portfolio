/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no experimental flag needed
  
  // Enable experimental features for better SSR
  experimental: {
    serverComponentsExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
    optimizePackageImports: ['lucide-react'],
    // Enable automatic static optimization
    esmExternals: true,
  },
  
  // Enable source maps in development
  productionBrowserSourceMaps: false,
  
  // Optimize images and static assets
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
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
  generateEtags: true,
  
  // Static optimization
  trailingSlash: false,
  
  // Optimize bundle
  swcMinify: true,
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/3d/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Enable source maps in development
    if (dev && !isServer) {
      config.devtool = 'eval-source-map'
    }
    
    // Font optimization
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
    
    // Optimize for performance
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            priority: 10,
            chunks: 'all',
          },
        },
      }
    }
    
    return config
  },
}

module.exports = nextConfig 