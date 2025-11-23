import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import EpisodeDetail from '@/components/podcast/EpisodeDetail'
import { Episode } from '@/types'

interface EpisodePageProps {
  episode: Episode
}

export default function EpisodePage({ episode }: EpisodePageProps) {
  return (
    <>
      <NextSeo
        title={`${episode.title} - Cloud Tech Podcast`}
        description={episode.description}
      />
      
      <EpisodeDetail episode={episode} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Mock data - replace with actual data fetching
  const episodeIds = ['1', '2', '3']
  
  const paths = episodeIds.map((id) => ({
    params: { id }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  
  // Mock data - replace with actual data fetching
  const episodes: Episode[] = [
    {
      id: '1',
      title: 'Cloud & Tech Monthly #1',
      description: 'Adit and Ishan discuss the latest cloud computing trends, new AWS services, and technology updates.',
      audioUrl: 'https://example.com/episode-1.mp3',
      duration: '45:30',
      publishedAt: '2025-11-15',
      guests: [],
      tags: ['monthly', 'aws', 'trends'],
      type: 'monthly',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Monthly #1

## Topics Covered
- Latest AWS service updates
- Cloud computing trends
- Technology news and insights

## Hosts
**Adit Modi** - Co-Founder & Solution Architect
**Ishan Modi** - Co-Founder & ML Engineer
      `
    },
    {
      id: '2',
      title: 'Cloud & Tech Conversation #1',
      description: 'Join Adit and Ishan as they chat with industry expert Chirag Darji about AI in cloud infrastructure.',
      audioUrl: 'https://example.com/episode-2.mp3',
      duration: '52:15',
      publishedAt: '2025-11-08',
      guests: ['Chirag Darji'],
      tags: ['ai', 'infrastructure', 'conversation'],
      type: 'conversation',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Conversation #1

## Guest
**Chirag Darji** - Senior Engineering Manager

## Topics Covered
- AI in cloud infrastructure
- Machine learning operations
- Future of AI technology

## Hosts
**Adit Modi** - Co-Founder & Solution Architect
**Ishan Modi** - Co-Founder & ML Engineer
      `
    },
    {
      id: '3',
      title: 'Cloud & Tech Monthly #2',
      description: 'Adit and Ishan explore multi-cloud strategies and the latest developments in cloud security.',
      audioUrl: 'https://example.com/episode-3.mp3',
      duration: '48:45',
      publishedAt: '2025-11-01',
      guests: [],
      tags: ['monthly', 'multi-cloud', 'security'],
      type: 'monthly',
      youtubeUrl: 'https://www.youtube.com/@aboutcloudtech',
      showNotes: `
# Cloud & Tech Monthly #2

## Topics Covered
- Multi-cloud strategies
- Cloud security updates
- Industry news and analysis

## Hosts
**Adit Modi** - Co-Founder & Solution Architect
**Ishan Modi** - Co-Founder & ML Engineer
      `
    }
  ]
  
  const episode = episodes.find(ep => ep.id === id)
  
  if (!episode) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      episode
    }
  }
}
