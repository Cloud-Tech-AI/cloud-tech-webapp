export interface Episode {
  id: string
  title: string
  description: string
  audioUrl: string
  duration: string
  publishedAt: string
  guests: string[]
  tags: string[]
  showNotes: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  readTime: number
  image: string
}

export interface Newsletter {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  category: string
  tags: string[]
  readTime: number
  image: string
  linkedinUrl?: string
  subscribers?: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface NewsletterSubscription {
  email: string
  name?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
