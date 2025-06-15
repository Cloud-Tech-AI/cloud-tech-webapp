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
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cloud-tech-webapp-revamp' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/cloud-tech-webapp-revamp' : '',
}

module.exports = nextConfig
