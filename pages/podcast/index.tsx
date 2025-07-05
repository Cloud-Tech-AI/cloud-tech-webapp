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
      id: '1',
      title: 'The Future of Serverless Computing',
      description: 'Join us as we explore the latest trends in serverless architecture. Adit and Ishan discuss AWS Lambda, Azure Functions, and the future of event-driven computing.',
      audioUrl: 'https://example.com/episode-1.mp3',
      duration: '45:30',
      publishedAt: '2024-01-15',
      guests: ['Adit Modi', 'Ishan Modi'],
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

## Hosts
**Adit Modi** - Co-Founder & Lead Cloud Architect
- LinkedIn: https://www.linkedin.com/in/adit-n-modi/

**Ishan Modi** - Co-Founder & ML Engineer
- LinkedIn: https://www.linkedin.com/in/ishan-modi-5765521a1/
      `
    },
    {
      id: '2',
      title: 'Kubernetes Security Best Practices',
      description: 'A deep dive into securing your Kubernetes clusters. Adit and Ishan cover RBAC, network policies, and container security best practices.',
      audioUrl: 'https://example.com/episode-2.mp3',
      duration: '52:15',
      publishedAt: '2024-01-08',
      guests: ['Adit Modi', 'Ishan Modi'],
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

## Hosts
**Adit Modi** - Co-Founder & Lead Cloud Architect
- LinkedIn: https://www.linkedin.com/in/adit-n-modi/

**Ishan Modi** - Co-Founder & ML Engineer
- LinkedIn: https://www.linkedin.com/in/ishan-modi-5765521a1/
      `
    },
    {
      id: '3',
      title: 'Multi-Cloud Strategy and Management',
      description: 'Exploring multi-cloud architectures with Adit and Ishan. Learn how to manage workloads across AWS, Azure, and GCP effectively.',
      audioUrl: 'https://example.com/episode-3.mp3',
      duration: '48:45',
      publishedAt: '2024-01-01',
      guests: ['Adit Modi', 'Ishan Modi'],
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

## Hosts
**Adit Modi** - Co-Founder & Lead Cloud Architect
- LinkedIn: https://www.linkedin.com/in/adit-n-modi/

**Ishan Modi** - Co-Founder & ML Engineer
- LinkedIn: https://www.linkedin.com/in/ishan-modi-5765521a1/
      `
    }
  ]

  return {
    props: {
      episodes
    }
  }
}
