const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
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
  // Remove basePath and assetPrefix for Amplify deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/cloud-tech-webapp-revamp' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/cloud-tech-webapp-revamp' : '',
}

module.exports = withBundleAnalyzer(nextConfig)
