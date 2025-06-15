import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
})

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  publishedDate: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  featuredImage: {
    url: string
    alt: string
  }
  tags: string[]
  category: string
  readingTime: number
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface PodcastEpisode {
  title: string
  slug: string
  description: string
  audioUrl: string
  duration: string
  publishedDate: string
  episodeNumber: number
  season: number
  guests: Array<{
    name: string
    bio: string
    avatar: string
    social: {
      twitter?: string
      linkedin?: string
    }
  }>
  transcript?: string
  showNotes: string
  tags: string[]
}

export interface SpeakingEvent {
  title: string
  slug: string
  description: string
  eventDate: string
  location: string
  venue: string
  eventType: 'conference' | 'workshop' | 'webinar' | 'meetup'
  registrationUrl?: string
  slidesUrl?: string
  recordingUrl?: string
  status: 'upcoming' | 'completed' | 'cancelled'
  tags: string[]
}

// Blog Posts
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishedDate'] as any,
      limit: limit || 100,
    })

    return entries.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishedDate: item.fields.publishedDate,
      author: item.fields.author,
      featuredImage: item.fields.featuredImage,
      tags: item.fields.tags || [],
      category: item.fields.category,
      readingTime: item.fields.readingTime || 5,
      seo: item.fields.seo || {},
    }))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    } as any)

    if (entries.items.length === 0) return null

    const item = entries.items[0] as any
    return {
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishedDate: item.fields.publishedDate,
      author: item.fields.author,
      featuredImage: item.fields.featuredImage,
      tags: item.fields.tags || [],
      category: item.fields.category,
      readingTime: item.fields.readingTime || 5,
      seo: item.fields.seo || {},
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// Podcast Episodes
export async function getPodcastEpisodes(limit?: number): Promise<PodcastEpisode[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'podcastEpisode',
      order: ['-fields.publishedDate'] as any,
      limit: limit || 100,
    })

    return entries.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      audioUrl: item.fields.audioUrl,
      duration: item.fields.duration,
      publishedDate: item.fields.publishedDate,
      episodeNumber: item.fields.episodeNumber,
      season: item.fields.season || 1,
      guests: item.fields.guests || [],
      transcript: item.fields.transcript,
      showNotes: item.fields.showNotes,
      tags: item.fields.tags || [],
    }))
  } catch (error) {
    console.error('Error fetching podcast episodes:', error)
    return []
  }
}

// Speaking Events
export async function getSpeakingEvents(): Promise<SpeakingEvent[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'speakingEvent',
      order: ['fields.eventDate'] as any,
    })

    return entries.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      eventDate: item.fields.eventDate,
      location: item.fields.location,
      venue: item.fields.venue,
      eventType: item.fields.eventType,
      registrationUrl: item.fields.registrationUrl,
      slidesUrl: item.fields.slidesUrl,
      recordingUrl: item.fields.recordingUrl,
      status: item.fields.status,
      tags: item.fields.tags || [],
    }))
  } catch (error) {
    console.error('Error fetching speaking events:', error)
    return []
  }
}

// Search functionality
export async function searchContent(query: string): Promise<{
  blogPosts: BlogPost[]
  podcastEpisodes: PodcastEpisode[]
  speakingEvents: SpeakingEvent[]
}> {
  try {
    const [blogPosts, podcastEpisodes, speakingEvents] = await Promise.all([
      client.getEntries({
        content_type: 'blogPost',
        query,
        limit: 10,
      } as any),
      client.getEntries({
        content_type: 'podcastEpisode',
        query,
        limit: 10,
      } as any),
      client.getEntries({
        content_type: 'speakingEvent',
        query,
        limit: 10,
      } as any),
    ])

    return {
      blogPosts: blogPosts.items.map((item: any) => ({
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        publishedDate: item.fields.publishedDate,
        author: item.fields.author,
        featuredImage: item.fields.featuredImage,
        tags: item.fields.tags || [],
        category: item.fields.category,
        readingTime: item.fields.readingTime || 5,
        seo: item.fields.seo || {},
      })),
      podcastEpisodes: podcastEpisodes.items.map((item: any) => ({
        title: item.fields.title,
        slug: item.fields.slug,
        description: item.fields.description,
        audioUrl: item.fields.audioUrl,
        duration: item.fields.duration,
        publishedDate: item.fields.publishedDate,
        episodeNumber: item.fields.episodeNumber,
        season: item.fields.season || 1,
        guests: item.fields.guests || [],
        transcript: item.fields.transcript,
        showNotes: item.fields.showNotes,
        tags: item.fields.tags || [],
      })),
      speakingEvents: speakingEvents.items.map((item: any) => ({
        title: item.fields.title,
        slug: item.fields.slug,
        description: item.fields.description,
        eventDate: item.fields.eventDate,
        location: item.fields.location,
        venue: item.fields.venue,
        eventType: item.fields.eventType,
        registrationUrl: item.fields.registrationUrl,
        slidesUrl: item.fields.slidesUrl,
        recordingUrl: item.fields.recordingUrl,
        status: item.fields.status,
        tags: item.fields.tags || [],
      })),
    }
  } catch (error) {
    console.error('Error searching content:', error)
    return {
      blogPosts: [],
      podcastEpisodes: [],
      speakingEvents: [],
    }
  }
}
