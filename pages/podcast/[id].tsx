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
      title: 'The Future of Serverless Computing',
      description: 'Join us as we explore the latest trends in serverless architecture with industry expert Adit Modi. We discuss AWS Lambda, Azure Functions, and the future of event-driven computing.',
      audioUrl: 'https://example.com/episode-1.mp3',
      duration: '45:30',
      publishedAt: '2024-01-15',
      guests: ['Adit Modi', 'Jane Doe'],
      tags: ['serverless', 'aws', 'azure'],
      showNotes: `
# Episode 1: The Future of Serverless Computing

## Topics Covered
- Introduction to serverless architecture
- AWS Lambda best practices
- Azure Functions vs AWS Lambda
- Cost optimization strategies
- Future trends in serverless

## Resources Mentioned
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Azure Functions Guide](https://docs.microsoft.com/en-us/azure/azure-functions/)
- [Serverless Framework](https://www.serverless.com/)

## Guest Information
**Adit Modi** - Senior Cloud Architect at TechCorp
- Twitter: @johnsmith
- LinkedIn: linkedin.com/in/johnsmith

**Jane Doe** - DevOps Engineer at CloudCo
- Twitter: @janedoe
- LinkedIn: linkedin.com/in/janedoe
      `
    },
    {
      id: '2',
      title: 'Kubernetes Security Best Practices',
      description: 'A deep dive into securing your Kubernetes clusters with security expert Sarah Johnson. Learn about RBAC, network policies, and container security.',
      audioUrl: 'https://example.com/episode-2.mp3',
      duration: '52:15',
      publishedAt: '2024-01-08',
      guests: ['Sarah Johnson'],
      tags: ['kubernetes', 'security', 'devops'],
      showNotes: `
# Episode 2: Kubernetes Security Best Practices

## Topics Covered
- Kubernetes RBAC implementation
- Network security policies
- Container image scanning
- Secrets management
- Security monitoring and alerting

## Resources Mentioned
- [Kubernetes Security Documentation](https://kubernetes.io/docs/concepts/security/)
- [Falco Security Monitoring](https://falco.org/)
- [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/)

## Guest Information
**Sarah Johnson** - Security Engineer at SecureTech
- Twitter: @sarahjohnson
- LinkedIn: linkedin.com/in/sarahjohnson
      `
    },
    {
      id: '3',
      title: 'Multi-Cloud Strategy and Management',
      description: 'Exploring multi-cloud architectures with cloud strategist Mike Chen. Learn how to manage workloads across AWS, Azure, and GCP effectively.',
      audioUrl: 'https://example.com/episode-3.mp3',
      duration: '48:45',
      publishedAt: '2024-01-01',
      guests: ['Mike Chen'],
      tags: ['multi-cloud', 'aws', 'azure', 'gcp'],
      showNotes: `
# Episode 3: Multi-Cloud Strategy and Management

## Topics Covered
- Benefits and challenges of multi-cloud
- Cloud-agnostic tooling
- Cost management across providers
- Data synchronization strategies
- Disaster recovery planning

## Resources Mentioned
- [Terraform Multi-Cloud](https://www.terraform.io/)
- [Kubernetes Multi-Cloud](https://kubernetes.io/)
- [Cloud Cost Management Tools](https://cloudcostmanagement.com/)

## Guest Information
**Mike Chen** - Cloud Strategy Consultant
- Twitter: @mikechen
- LinkedIn: linkedin.com/in/mikechen
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
