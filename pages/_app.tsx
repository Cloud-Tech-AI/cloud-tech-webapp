import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import Layout from '@/components/Layout'

const defaultSEO = {
  title: 'Cloud Tech - Cloud Computing Community & Resources',
  description: 'Join the Cloud Tech community for the latest in cloud computing, DevOps, and technology. Listen to our podcast, read our blog, and connect with fellow cloud enthusiasts.',
  canonical: 'https://cloud-tech-ai.github.io/cloud-tech-webapp-revamp/',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloud-tech-ai.github.io/cloud-tech-webapp-revamp/',
    siteName: 'Cloud Tech',
    title: 'Cloud Tech - Cloud Computing Community & Resources',
    description: 'Join the Cloud Tech community for the latest in cloud computing, DevOps, and technology. Listen to our podcast, read our blog, and connect with fellow cloud enthusiasts.',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630/3b82f6/ffffff?text=Cloud+Tech',
        width: 1200,
        height: 630,
        alt: 'Cloud Tech',
      },
    ],
  },
  twitter: {
    handle: '@cloudtech',
    site: '@cloudtech',
    cardType: 'summary_large_image',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
