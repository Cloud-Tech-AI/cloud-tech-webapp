import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import BlogPostDetail from '@/components/blog/BlogPostDetail'
import { BlogPost } from '@/types'

interface BlogPostPageProps {
  post: BlogPost
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <>
      <NextSeo
        title={`${post.title} - Cloud Tech Blog`}
        description={post.excerpt}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          images: [
            {
              url: post.image,
              width: 800,
              height: 400,
              alt: post.title,
            },
          ],
        }}
      />
      
      <BlogPostDetail post={post} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Actual blog post IDs from Dev.to
  const postIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
  
  const paths = postIds.map((id) => ({
    params: { id }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  
  // Actual blog posts from Dev.to
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Introduction to Containers with AWS',
      excerpt: 'Learn the fundamentals of containerization and how to get started with containers on AWS. Explore Docker, ECS, and EKS services.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-15',
      category: 'AWS',
      tags: ['aws', 'containers', 'docker', 'ecs', 'eks'],
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/introduction-to-containers-with-aws-og4'
    },
    {
      id: '2',
      title: "Beginner's Guide into the Field of DevOps",
      excerpt: 'A comprehensive introduction to DevOps practices, tools, and methodologies. Perfect for those starting their DevOps journey.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-12',
      category: 'DevOps',
      tags: ['devops', 'beginner', 'ci-cd', 'automation'],
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/beginner-s-guide-into-the-field-of-devops-17kk'
    },
    {
      id: '3',
      title: 'How to Get Cloud Certified',
      excerpt: 'Your roadmap to cloud certifications. Learn about different certification paths and how to prepare effectively.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-10',
      category: 'Certification',
      tags: ['certification', 'cloud', 'career', 'aws', 'azure'],
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/how-to-get-cloud-certified-ill'
    },
    {
      id: '4',
      title: 'Starting Your Journey with Big Data Analytics',
      excerpt: 'Explore the world of big data analytics. Learn about tools, technologies, and best practices for handling large datasets.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-08',
      category: 'Big Data',
      tags: ['big-data', 'analytics', 'hadoop', 'spark'],
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/starting-your-journey-with-big-data-analytics-5ceo'
    },
    {
      id: '5',
      title: 'How to Get Microsoft Azure Certified',
      excerpt: 'Complete guide to Microsoft Azure certifications. Learn about different certification tracks and preparation strategies.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-05',
      category: 'Azure',
      tags: ['azure', 'certification', 'microsoft', 'cloud'],
      readTime: 9,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/how-to-get-microsoft-azure-certified-26dk'
    },
    {
      id: '6',
      title: 'How to Get Oracle Cloud Infrastructure (OCI) Certified',
      excerpt: 'Your guide to Oracle Cloud Infrastructure certifications. Learn about OCI services and certification preparation.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-03',
      category: 'Oracle Cloud',
      tags: ['oracle', 'oci', 'certification', 'cloud'],
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/how-to-get-oracle-cloud-infrastructure-oci-certified-2pac'
    },
    {
      id: '7',
      title: "Getting Started with Google Cloud Platform: A Beginner's Guide",
      excerpt: 'Introduction to Google Cloud Platform services and features. Perfect for beginners looking to start with GCP.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2024-01-01',
      category: 'GCP',
      tags: ['gcp', 'google-cloud', 'beginner', 'cloud'],
      readTime: 11,
      image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/getting-started-with-google-cloud-platform-a-beginner-s-guide-28k7'
    },
    {
      id: '8',
      title: "Journey into Alibaba Cloud: A Beginner's Guide",
      excerpt: 'Explore Alibaba Cloud services and capabilities. Learn how to get started with this growing cloud platform.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-28',
      category: 'Alibaba Cloud',
      tags: ['alibaba-cloud', 'beginner', 'cloud', 'asia'],
      readTime: 9,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/journey-into-alibaba-cloud-a-beginner-s-guide-3dki'
    },
    {
      id: '9',
      title: 'Top 10 Cloud Providers and How to Get Started with Them',
      excerpt: 'Comprehensive overview of the top cloud providers in the market. Compare features, pricing, and getting started guides.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-25',
      category: 'Cloud Strategy',
      tags: ['cloud-providers', 'comparison', 'aws', 'azure', 'gcp'],
      readTime: 15,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/top-10-cloud-providers-and-how-to-get-started-with-them-58il'
    },
    {
      id: '10',
      title: "What is Cloud Computing: A Beginner's Guide",
      excerpt: 'Fundamental introduction to cloud computing concepts, service models, and deployment types. Perfect for beginners.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-22',
      category: 'Cloud Fundamentals',
      tags: ['cloud-computing', 'beginner', 'fundamentals', 'iaas', 'paas', 'saas'],
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/what-is-cloud-computing-a-beginner-s-guide-37ne'
    },
    {
      id: '11',
      title: 'Top 10 AWS Services That Are Used by Everyone in the Cloud Industry',
      excerpt: 'Discover the most popular AWS services that every cloud professional should know. Essential services for any AWS journey.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-20',
      category: 'AWS',
      tags: ['aws', 'services', 'ec2', 's3', 'lambda'],
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/top-10-aws-services-that-are-used-by-everyone-in-the-cloud-industry-4l23'
    },
    {
      id: '12',
      title: 'Learning This Tools Will Boost Your Journey into DevOps',
      excerpt: 'Essential DevOps tools every practitioner should master. From CI/CD to monitoring, discover the tools that matter.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-18',
      category: 'DevOps',
      tags: ['devops', 'tools', 'jenkins', 'docker', 'kubernetes'],
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/learning-this-tools-will-boost-your-journey-into-devops-5gdp'
    },
    {
      id: '13',
      title: "How to Get Started with Azure DevOps: Beginner's Guide",
      excerpt: 'Complete introduction to Azure DevOps services. Learn about pipelines, repos, boards, and more.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-15',
      category: 'Azure',
      tags: ['azure', 'devops', 'pipelines', 'ci-cd'],
      readTime: 11,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/how-to-get-started-with-azure-devops-beginner-s-guide-3lj7'
    },
    {
      id: '14',
      title: 'Deploying a Containerized App in Google GKE',
      excerpt: 'Step-by-step guide to deploying containerized applications on Google Kubernetes Engine. From setup to production.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-12',
      category: 'GCP',
      tags: ['gcp', 'gke', 'kubernetes', 'containers'],
      readTime: 13,
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/deploying-a-containerized-app-in-google-gke-1kl9'
    },
    {
      id: '15',
      title: 'The Advantages of Adopting Cloud Computing Services',
      excerpt: 'Explore the key benefits of cloud adoption for businesses. Cost savings, scalability, and innovation opportunities.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-10',
      category: 'Cloud Strategy',
      tags: ['cloud-computing', 'benefits', 'business', 'strategy'],
      readTime: 9,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/the-advantages-of-adopting-cloud-computing-services-2275'
    },
    {
      id: '16',
      title: 'IaaS vs PaaS vs SaaS',
      excerpt: 'Understanding the three main cloud service models. Learn the differences, use cases, and examples of each model.',
      content: 'For the complete article with detailed examples and hands-on tutorials, visit the full post on Dev.to.',
      author: 'Adit Modi',
      publishedAt: '2023-12-08',
      category: 'Cloud Fundamentals',
      tags: ['iaas', 'paas', 'saas', 'cloud-models'],
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      url: 'https://dev.to/cloudtech/iaas-vs-paas-vs-saas-41d2'
    }
  ]
  
  const post = posts.find(p => p.id === id)
  
  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
