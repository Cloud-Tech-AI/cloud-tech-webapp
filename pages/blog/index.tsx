import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import BlogList from '@/components/blog/BlogList'
import BlogCategories from '@/components/blog/BlogCategories'
import { BlogPost } from '@/types'

interface BlogPageProps {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogPage({ posts, categories }: BlogPageProps) {
  return (
    <>
      <NextSeo
        title="Cloud Tech Blog - Latest Insights and Tutorials"
        description="Stay updated with the latest cloud computing trends, tutorials, and insights from industry experts. Learn about AWS, Azure, GCP, DevOps, and more."
      />
      
      <BlogHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogList posts={posts} />
          </div>
          <div className="lg:col-span-1">
            <BlogCategories categories={categories} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Mock data - replace with actual data fetching
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with AWS Lambda: A Complete Guide',
      excerpt: 'Learn how to build and deploy serverless functions with AWS Lambda. This comprehensive guide covers everything from basic concepts to advanced patterns.',
      content: `# Getting Started with AWS Lambda: A Complete Guide

AWS Lambda is a serverless computing service that lets you run code without provisioning or managing servers. In this guide, we'll explore everything you need to know to get started with Lambda.

## What is AWS Lambda?

AWS Lambda is a compute service that runs your code in response to events and automatically manages the underlying compute resources for you. You can use AWS Lambda to extend other AWS services with custom logic, or create your own back-end services.

## Key Benefits

- **No server management**: AWS handles all the infrastructure
- **Automatic scaling**: Your functions scale automatically
- **Pay per use**: You only pay for the compute time you consume
- **Built-in fault tolerance**: Lambda maintains compute capacity across multiple Availability Zones

## Getting Started

### 1. Create Your First Lambda Function

\`\`\`python
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
\`\`\`

### 2. Configure Triggers

Lambda functions can be triggered by various AWS services:
- API Gateway
- S3 events
- DynamoDB streams
- CloudWatch events

### 3. Best Practices

- Keep your functions small and focused
- Use environment variables for configuration
- Implement proper error handling
- Monitor with CloudWatch

## Conclusion

AWS Lambda is a powerful tool for building serverless applications. Start small, experiment, and gradually build more complex systems as you become comfortable with the service.`,
      author: 'Adit Modi',
      publishedAt: '2024-01-15',
      category: 'AWS',
      tags: ['aws', 'lambda', 'serverless', 'tutorial'],
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Kubernetes Security: Protecting Your Cluster',
      excerpt: 'Discover essential security practices for Kubernetes clusters. Learn about RBAC, network policies, and container security to keep your applications safe.',
      content: `# Kubernetes Security: Protecting Your Cluster

Security is paramount when running production workloads on Kubernetes. This guide covers essential security practices to protect your cluster and applications.

## Security Fundamentals

### 1. Role-Based Access Control (RBAC)

RBAC is crucial for controlling who can access what in your cluster:

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
\`\`\`

### 2. Network Policies

Control traffic flow between pods:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
\`\`\`

### 3. Container Security

- Use minimal base images
- Scan images for vulnerabilities
- Run containers as non-root users
- Use security contexts

## Best Practices

1. **Keep Kubernetes Updated**: Regularly update your cluster
2. **Use Secrets Management**: Never hardcode sensitive data
3. **Monitor and Audit**: Enable audit logging
4. **Implement Pod Security Standards**: Use Pod Security Policies or Pod Security Standards

## Conclusion

Kubernetes security requires a multi-layered approach. Implement these practices to build a secure foundation for your applications.`,
      author: 'Ishan Modi',
      publishedAt: '2024-01-10',
      category: 'Kubernetes',
      tags: ['kubernetes', 'security', 'devops', 'best-practices'],
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Multi-Cloud Architecture: Benefits and Challenges',
      excerpt: 'Explore the advantages and complexities of multi-cloud strategies. Learn when to use multiple cloud providers and how to manage the complexity.',
      content: `# Multi-Cloud Architecture: Benefits and Challenges

Multi-cloud strategies are becoming increasingly popular as organizations seek to avoid vendor lock-in and leverage the best services from different providers.

## What is Multi-Cloud?

Multi-cloud refers to using multiple cloud computing services from different providers within a single architecture. This might include AWS, Azure, Google Cloud, and others.

## Benefits

### 1. Avoid Vendor Lock-in
- Reduce dependency on a single provider
- Maintain negotiating power
- Flexibility to switch services

### 2. Best-of-Breed Services
- Use the strongest service from each provider
- Optimize for specific workloads
- Access to latest innovations

### 3. Risk Mitigation
- Improved disaster recovery
- Reduced single points of failure
- Geographic distribution

## Challenges

### 1. Complexity
- Multiple management interfaces
- Different APIs and services
- Increased operational overhead

### 2. Cost Management
- Difficult to track costs across providers
- Complex pricing models
- Potential for cost overruns

### 3. Security and Compliance
- Multiple security models
- Consistent policy enforcement
- Compliance across providers

## Best Practices

1. **Start Simple**: Begin with a clear use case
2. **Use Cloud-Agnostic Tools**: Terraform, Kubernetes, etc.
3. **Implement Strong Governance**: Policies and procedures
4. **Monitor Everything**: Costs, performance, security

## Conclusion

Multi-cloud can provide significant benefits but requires careful planning and execution. Consider your specific needs and capabilities before embarking on a multi-cloud journey.`,
      author: 'Adit Modi',
      publishedAt: '2024-01-05',
      category: 'Cloud Strategy',
      tags: ['multi-cloud', 'architecture', 'strategy', 'aws', 'azure', 'gcp'],
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop'
    }
  ]

  const categories = ['AWS', 'Azure', 'GCP', 'Kubernetes', 'DevOps', 'Security', 'Cloud Strategy', 'Serverless']

  return {
    props: {
      posts,
      categories
    }
  }
}
