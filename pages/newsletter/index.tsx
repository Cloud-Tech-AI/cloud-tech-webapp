import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import NewsletterHero from '@/components/newsletter/NewsletterHero'
import NewsletterList from '@/components/newsletter/NewsletterList'
import NewsletterCategories from '@/components/newsletter/NewsletterCategories'
import { Newsletter } from '@/types'

interface NewsletterPageProps {
  newsletters: Newsletter[]
  categories: string[]
}

export default function NewsletterPage({ newsletters, categories }: NewsletterPageProps) {
  return (
    <>
      <NextSeo
        title="Everything About Cloud Tech Newsletter - Weekly Cloud Computing Insights"
        description="Subscribe to our weekly newsletter featuring the latest cloud computing trends, AWS, Azure, GCP updates, DevOps insights, and expert commentary from Adit Modi and Ishan Modi."
      />
      
      <NewsletterHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <NewsletterList newsletters={newsletters} />
          </div>
          <div className="lg:col-span-1">
            <NewsletterCategories categories={categories} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Actual newsletter data - Latest 4 issues (#45-48)
  const newsletters: Newsletter[] = [
    {
      id: '48',
      title: 'Everything About Cloud & Tech — Newsletter #48',
      excerpt: 'ResOps (Reliability Operations) rising as 2025 must-have discipline, practical AI + cloud architectures, AWS announcements including Regional NAT Gateway and EKS performance monitoring, plus hands-on workshops and community highlights.',
      content: 'For the full newsletter content with detailed insights, practical architectures, and hands-on examples, please visit the LinkedIn newsletter.',
      publishedAt: '2025-11-24',
      category: 'Cloud Tech',
      tags: ['resops', 'reliability', 'aws', 'eks', 'ai', 'bedrock', 'mcp'],
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      url: 'https://www.linkedin.com/newsletters/everything-about-cloud-tech-7079093941148540928/',
      subscribers: 12
    },
    {
      id: '47',
      title: 'Everything About Cloud & Tech — Newsletter #47',
      excerpt: 'Aurora I/O-Optimized with unlimited I/Os, AWS Backup for EKS with cross-account support, Amazon Bedrock AgentCore Runtime, Kiroween 2025 Hackathon with $100K prize pool, and community workshops.',
      content: 'For the full newsletter content with detailed insights, practical architectures, and hands-on examples, please visit the LinkedIn newsletter.',
      publishedAt: '2025-11-17',
      category: 'Cloud Tech',
      tags: ['aurora', 'eks', 'backup', 'bedrock', 'hackathon', 'ai'],
      readTime: 5,
      image: 'https://substackcdn.com/image/fetch/$s_!-hxT!,w_848,h_444,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F718c8d8b-9ad8-4b36-8674-9c2e758b5275_2000x1600.png',
      url: 'https://substack.com/home/post/p-178873863',
      subscribers: 12
    },
    {
      id: '46',
      title: 'Everything About Cloud & Tech — Newsletter #46',
      excerpt: 'Legacy Modernization Patterns with leave-and-layer approaches, Agentic AI at Scale with AgentCore Gateway, AWS Capabilities by Region Tool, Claude Code workshops, and Road to re:Invent series.',
      content: 'For the full newsletter content with detailed insights, practical architectures, and hands-on examples, please visit the LinkedIn newsletter.',
      publishedAt: '2025-11-10',
      category: 'Cloud Tech',
      tags: ['legacy-modernization', 'agentic-ai', 'aws', 'claude', 'reinvent'],
      readTime: 5,
      image: 'https://substackcdn.com/image/fetch/$s_!WgVx!,w_848,h_444,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F08feb583-cc9a-4d17-a835-2b16169b55c6_2000x1600.png',
      url: 'https://substack.com/home/post/p-178329997',
      subscribers: 12
    },
    {
      id: '45',
      title: 'Everything About Cloud & Tech — Newsletter #45',
      excerpt: 'Deep dive on Change Data Capture (CDC) with Debezium, agentic automation with IBM watsonx Orchestrate, multi-cloud reality check, Amazon ECS Linear and Canary deployments, and community highlights.',
      content: 'For the full newsletter content with detailed insights, practical architectures, and hands-on examples, please visit the LinkedIn newsletter.',
      publishedAt: '2025-11-03',
      category: 'Cloud Tech',
      tags: ['cdc', 'debezium', 'agentic-automation', 'ecs', 'multi-cloud'],
      readTime: 5,
      image: 'https://substackcdn.com/image/fetch/$s_!0r9s!,w_848,h_444,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0d55f2d4-b9e5-4743-87cd-e8a4a4140d0d_2000x1600.png',
      url: 'https://substack.com/home/post/p-177716171',
      subscribers: 12
    }
  ]

  const categories = ['AWS', 'Azure', 'GCP', 'Kubernetes', 'DevOps', 'Security', 'AI/ML', 'Cost Optimization', 'Serverless']

  return {
    props: {
      newsletters,
      categories
    }
  }
}
