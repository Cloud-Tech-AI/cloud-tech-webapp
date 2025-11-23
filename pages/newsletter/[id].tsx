import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import NewsletterDetail from '@/components/newsletter/NewsletterDetail'
import { Newsletter } from '@/types'

interface NewsletterDetailPageProps {
  newsletter: Newsletter
}

export default function NewsletterDetailPage({ newsletter }: NewsletterDetailPageProps) {
  return (
    <>
      <NextSeo
        title={`${newsletter.title} - Cloud Tech Newsletter`}
        description={newsletter.excerpt}
        openGraph={{
          title: newsletter.title,
          description: newsletter.excerpt,
          images: [
            {
              url: newsletter.image,
              width: 800,
              height: 400,
              alt: newsletter.title,
            },
          ],
        }}
      />
      
      <NewsletterDetail newsletter={newsletter} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Actual newsletter IDs for issues #45-48
  const newsletterIds = ['45', '46', '47', '48']
  
  const paths = newsletterIds.map((id) => ({
    params: { id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  
  // Actual newsletter data - Issues #45-48
  const newsletters: Newsletter[] = [
    {
      id: '48',
      title: 'Everything About Cloud & Tech — Newsletter #48',
      excerpt: 'ResOps (Reliability Operations) rising as 2025 must-have discipline, practical AI + cloud architectures, AWS announcements including Regional NAT Gateway and EKS performance monitoring, plus hands-on workshops and community highlights.',
      content: `# Everything About Cloud & Tech — Newsletter #48 (November 24, 2025)

## Key Highlights:

### 🔧 ResOps (Reliability Operations)
Rising as a 2025 must-have discipline for cloud scale resiliency:
- Automated recovery systems
- Chaos engineering practices
- Bulkhead patterns implementation
- SLO-driven operations becoming the norm

### ⭐ Starred Content - Practical AI + Cloud Architectures:
- **FastMCP + Kiro**: A spec-first way to build real MCP servers
- **Agentic Insurance Claims Processing on EKS**: LangGraph + Ollama + Terraform one-command deploy
- **WhatsApp AI Assistant on AWS**: Event-driven, production-grade Bedrock architecture with rate control, voice flow, and guardrails

### 🌐 AWS Announcements:
- Regional NAT Gateway
- Weighted Target Groups for NLB
- Billing Transfer for multi-org setups
- CloudFront fixed pricing
- EKS performance monitoring
- Kiro CLI launch
- Lambda Tenant Isolation Mode
- Simplified org-wide security with Control Tower

### 🎓 Hands-on Workshops:
Amazon Bedrock fundamentals → multimodal, RAG, agents, plus open-source integrations for real production patterns.

### 👥 Community Corner:
- TEAM OSS tool for temporary access with approvals in IAM Identity Center
- Insights from Amarathon Geek Talk 2025 — deploying open-source LLMs cost-efficiently on AWS single-GPU P5.4xlarge setups

### 💡 Highlights:
- Running trillion-parameter models on AWS with EFA optimizations
- Cloud security maturity: public cloud now viewed as stronger for compliance + defense
- Independent validation of EKS zero-operator-access for sensitive workloads

**Impact**: Edition #48 reinforces the newsletter's signature style — practical, builder-first insights across cloud + GenAI, actionable patterns for production workloads, and strong focus on community learning.

---

*For the complete newsletter with detailed technical insights, code examples, and hands-on tutorials, [read the full edition on LinkedIn](https://www.linkedin.com/newsletters/everything-about-cloud-tech-7079093941148540928/).*`,
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
      content: `# Everything About Cloud & Tech — Newsletter #47 (November 17, 2025)

## Key Highlights:

### 💾 Aurora I/O-Optimized:
Pay more for storage and instances, but I/Os become effectively unlimited — ideal for chatty workloads and predictable costs.

### 🛡️ AWS Backup for EKS:
Centralized, policy-driven backup of EKS clusters (EBS, EFS, S3) with cross-account/region support — spin up clusters directly from backups.

### 🤖 Amazon Bedrock AgentCore Runtime:
Deploy agents directly via code zip or container — fast prototyping plus full container deployments.

### 🏆 Kiroween 2025 Hackathon:
$100K prize pool, Halloween-themed AI coding challenge, live now.

### 🇮🇳 AI for Bharat Hackathon:
Two-phase program for Indian developers; workshop at AWS User Group Vadodara on 6th December.

### 🎓 Workshops Spotlight:
- Hands-on Amazon Bedrock
- Open Platform for Enterprise AI (OPEA) on AWS
- Strands Agents workshops

### 👥 Community Corner:
- AWS Students Community Day 2025 (Vadodara, 13th Dec)
- HashiTalks 2026 Call for Proposals
- aws-news.com by Luc van Donkersgoed
- Road to re:Invent series updates

### 💡 Highlights:
Cost-efficient deployment of open-source AI stacks (Ollama, vLLM, Kubernetes) while maintaining OpenAI-compatible APIs.

### 🧠 Mindset Corner:
Emphasis on being a self-starter — take initiative, act, and inspire others through action.

**Impact**: Edition #47 continues the practitioner-first focus — practical tips, hands-on learning, community highlights, and actionable insights for cloud builders and AI developers.

---

*For the complete newsletter with detailed technical insights, code examples, and hands-on tutorials, [read the full edition on Substack](https://substack.com/home/post/p-178873863).*`,
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
      content: `# Everything About Cloud & Tech — Newsletter #46 (November 10, 2025)

## Key Highlights:

### 🏗️ Legacy Modernization Patterns:
Deep dive into leave-and-layer and strangler fig approaches — evolving legacy apps with event-driven extensions or gradual microservice migration instead of risky rewrites.

### 🤖 Agentic AI at Scale:
AgentCore Gateway now unifies multiple MCP servers on Amazon Bedrock, simplifying discovery, authentication, and management for enterprise-grade AI agents.

### 🌍 AWS "Capabilities by Region" Tool:
Interactive matrix to compare service availability, APIs, and CloudFormation support across regions — enabling faster global rollout planning.

### 🎓 Workshop Spotlight:
Claude Code in Action on AWS — hands-on demos in AI-driven development, automated PR reviews, and MCP integration for smarter workflows.

### 👥 Community Picks:
- LEAP-Stacks by Basil Fateen for one-click GenAI prototypes on AWS
- aws-news.com by Luc van Donkersgoed — a clean, searchable hub for AWS updates

### 📅 Service Lifecycle Updates:
AWS announces maintenance and sunset phases for several offerings (CodeCatalyst, FinSpace, Proton etc.) — check migration guides for continuity.

### 📚 Prescriptive Guidance:
Fresh AWS design-pattern library covering circuit breakers, event sourcing, sagas, and transactional outbox — practical blueprints for modernization.

### 🚀 Road to re:Invent Series:
Simplifying complex AWS concepts into analogy-driven explainers for builders and leaders preparing for re:Invent season.

### 🧠 Mindset Corner:
A reflection on the relentless pursuit of excellence — progress over perfection, curiosity over comfort.

**Impact**: Edition #46 continues the shift toward a practitioner-first brief — compact, architecture-driven, and focused on patterns, community, and continuous learning for AWS and cloud-native builders.

---

*For the complete newsletter with detailed technical insights, code examples, and hands-on tutorials, [read the full edition on Substack](https://substack.com/home/post/p-178329997).*`,
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
      content: `# Everything About Cloud & Tech — Newsletter #45 (November 3, 2025)

## Key Highlights:

### 🔄 Deep dive on Change Data Capture (CDC) with Debezium:
Powering near real-time data flows across caches, warehouses, and services using WAL-based event streams.

### 🤖 Spotlight on agentic automation:
IBM watsonx Orchestrate on AWS and analysis of Perplexity Comet vs OpenAI Atlas — insights into the evolving AI-browser and workflow space.

### 🌍 Multi-cloud reality check:
Correlated AWS–Azure Downdetector spikes expose shared dependencies; resilience comes from architecture, not provider count.

### 🚀 Amazon ECS adds Linear and Canary deployments:
Gradual traffic shifting, automated rollbacks, and safer release controls now built in.

### 👥 Community highlights:
- HashiTalks India 2025
- AWS User Group West Midlands
- Launch of the Bangalore HashiCorp User Group

### 📚 Book pick:
The Accidental CTO by Subhash Choudhary — pragmatic lessons from building and scaling real-world distributed systems.

**Impact**: Strengthened the newsletter's role as a practitioner-first digest for AWS, cloud-native, and GenAI builders — blending technical depth, community insights, and continuous learning.

---

*For the complete newsletter with detailed technical insights, code examples, and hands-on tutorials, [read the full edition on Substack](https://substack.com/home/post/p-177716171).*`,
      publishedAt: '2025-11-03',
      category: 'Cloud Tech',
      tags: ['cdc', 'debezium', 'agentic-automation', 'ecs', 'multi-cloud'],
      readTime: 5,
      image: 'https://substackcdn.com/image/fetch/$s_!0r9s!,w_848,h_444,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0d55f2d4-b9e5-4743-87cd-e8a4a4140d0d_2000x1600.png',
      url: 'https://substack.com/home/post/p-177716171',
      subscribers: 12
    }
  ]
  
  const newsletter = newsletters.find(n => n.id === id)
  
  if (!newsletter) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      newsletter,
    },
  }
}
