const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'picsum.photos'],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'export',  // enable static export via config
  // Remove distDir - Next.js will output static files to 'out' by default with output: 'export'

  // Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Amplify-specific environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },

  // Removed exportPathMap - Next.js 14+ automatically handles static exports
}

module.exports = withBundleAnalyzer(nextConfig)
