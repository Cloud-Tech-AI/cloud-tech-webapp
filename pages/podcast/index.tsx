import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import PodcastHero from '@/components/podcast/PodcastHero'
import EpisodeList from '@/components/podcast/EpisodeList'
import PodcastSubscribe from '@/components/podcast/PodcastSubscribe'
import { Episode } from '@/types'

interface PodcastPageProps {
  episodes: Episode[]
}

export default function PodcastPage({ episodes }: PodcastPageProps) {
  return (
    <>
      <NextSeo
        title="Cloud Tech Podcast - Expert Insights on Cloud Computing"
        description="Listen to the Cloud Tech Podcast featuring industry experts discussing the latest trends in cloud computing, DevOps, and technology innovation."
      />
      
      <PodcastHero />
      <PodcastSubscribe />
      <EpisodeList episodes={episodes} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Mock data - replace with actual data fetching
  const episodes: Episode[] = [
    {
      id: '4',
      title: 'Cloud & Tech Monthly - November 2025',
      description: 'Adit and Ishan discuss the latest cloud computing trends, new AWS services, and technology updates.',
      audioUrl: 'https://example.com/episode-4.mp3',
      duration: '35:20',
      publishedAt: '2025-11-25',
      guests: [],
      tags: ['monthly', 'aws', 'trends'],
      type: 'monthly',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Monthly - November 2025

## Topics Covered
- AWS pre-re:Invent 2025 recap
- New Azure AI services
- Google Cloud updates
- Industry trends and predictions

## Hosts
**Adit Modi** - Co-Founder & Solution Architect
**Ishan Modi** - Co-Founder & ML Engineer
      `
    },
    {
      id: '3',
      title: 'AI in Cloud Infrastructure with Chirag Darji',
      description: 'Join us for an insightful conversation with AI expert Chirag Darji about integrating artificial intelligence into cloud infrastructure and operations.',
      audioUrl: 'https://example.com/episode-3.mp3',
      duration: '52:15',
      publishedAt: '2025-11-18',
      guests: ['Chirag Darji'],
      tags: ['ai', 'infrastructure', 'automation'],
      type: 'conversation',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Conversations: AI in Cloud Infrastructure

## Guest
**Chirag Darji** - Senior Engineering Manager at Avalara

## Topics Covered
- AI-driven infrastructure optimization
- Machine learning in DevOps
- Automated scaling and monitoring
- Future of AI in cloud computing
      `
    },
    {
      id: '2',
      title: 'Cloud & Tech Monthly - October 2025',
      description: 'Year-end review with Adit and Ishan covering the biggest cloud computing developments of 2025 and predictions for 2026.',
      audioUrl: 'https://example.com/episode-2.mp3',
      duration: '42:30',
      publishedAt: '2025-11-01',
      guests: [],
      tags: ['monthly', 'year-review', '2025'],
      type: 'monthly',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Monthly - October 2025

## Topics Covered
- 2025 cloud computing highlights
- Major service launches
- Industry acquisitions and partnerships
- 2026 predictions

## Hosts
**Adit Modi** - Co-Founder & Solution Architect
**Ishan Modi** - Co-Founder & ML Engineer
      `
    },
    {
      id: '1',
      title: 'Cloud & Tech Monthly - September 2025',
      description: 'Adit and Ishan discuss serverless computing trends, Kubernetes updates, and the latest in cloud security.',
      audioUrl: 'https://example.com/episode-1.mp3',
      duration: '38:45',
      publishedAt: '2025-10-03',
      guests: [],
      tags: ['monthly', 'serverless', 'kubernetes'],
      type: 'monthly',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Monthly - September 2025

## Topics Covered
- Serverless computing evolution
- Kubernetes 1.32 features
- Cloud security best practices
- Cost optimization strategies

## Hosts
**Adit Modi** - Co-Founder & Solution Architect
**Ishan Modi** - Co-Founder & ML Engineer
      `
    }
  ]

  return {
    props: {
      episodes
    }
  }
}
