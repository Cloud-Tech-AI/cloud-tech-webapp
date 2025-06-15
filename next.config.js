const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'picsum.photos'],
    unoptimized: true
  },
  trailingSlash: true,
  output: 'export',
  distDir: 'out',
  // Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Handle build errors gracefully
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Amplify-specific configurations
  env: {
    CUSTOM_KEY: 'my-value',
  },
  // Ensure proper static export
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/blog': { page: '/blog' },
      '/podcast': { page: '/podcast' },
      '/speaking': { page: '/speaking' },
    }
  },
}

module.exports = withBundleAnalyzer(nextConfig)
