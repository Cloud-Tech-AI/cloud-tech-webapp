import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import SpeakingHero from '@/components/speaking/SpeakingHero'
import EventsList from '@/components/speaking/EventsList'
import SpeakingRequest from '@/components/speaking/SpeakingRequest'
import { SpeakingEvent } from '@/types'

interface SpeakingPageProps {
  upcomingEvents: SpeakingEvent[]
  pastEvents: SpeakingEvent[]
}

export default function SpeakingPage({ upcomingEvents, pastEvents }: SpeakingPageProps) {
  return (
    <>
      <NextSeo
        title="Speaking Engagements - Cloud Tech"
        description="Join our experts at conferences, meetups, and events worldwide. Learn about upcoming speaking engagements and past presentations on cloud computing and DevOps."
      />
      
      <SpeakingHero />
      <EventsList upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <SpeakingRequest />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Mock data - replace with actual data fetching
  const upcomingEvents: SpeakingEvent[] = [
    {
      id: '1',
      title: 'AWS re:Invent 2024',
      description: 'Presenting "Serverless at Scale: Lessons from Production" at the world\'s largest cloud computing conference.',
      date: '2024-12-02',
      location: 'Las Vegas, NV',
      venue: 'Venetian Convention Center',
      type: 'conference',
      speaker: 'John Smith',
      topic: 'Serverless Architecture',
      registrationUrl: 'https://reinvent.awsevents.com/',
      slidesUrl: null,
      videoUrl: null,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'KubeCon + CloudNativeCon',
      description: 'Workshop on "Kubernetes Security Best Practices" covering RBAC, network policies, and container security.',
      date: '2024-11-15',
      location: 'Chicago, IL',
      venue: 'McCormick Place',
      type: 'workshop',
      speaker: 'Sarah Johnson',
      topic: 'Kubernetes Security',
      registrationUrl: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/',
      slidesUrl: null,
      videoUrl: null,
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Cloud Tech Meetup - San Francisco',
      description: 'Monthly meetup discussing "Multi-Cloud Strategies for Enterprise" with hands-on examples and case studies.',
      date: '2024-10-25',
      location: 'San Francisco, CA',
      venue: 'TechHub SF',
      type: 'meetup',
      speaker: 'Mike Chen',
      topic: 'Multi-Cloud Architecture',
      registrationUrl: 'https://www.meetup.com/cloud-tech-sf/',
      slidesUrl: null,
      videoUrl: null,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop'
    }
  ]

  const pastEvents: SpeakingEvent[] = [
    {
      id: '4',
      title: 'DevOps World 2023',
      description: 'Keynote presentation on "The Future of Infrastructure as Code" exploring trends in IaC and automation.',
      date: '2023-09-12',
      location: 'New York, NY',
      venue: 'Javits Center',
      type: 'keynote',
      speaker: 'John Smith',
      topic: 'Infrastructure as Code',
      registrationUrl: null,
      slidesUrl: 'https://example.com/slides/devops-world-2023.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'DockerCon 2023',
      description: 'Technical session on "Container Security in Production" covering scanning, runtime protection, and compliance.',
      date: '2023-05-08',
      location: 'Los Angeles, CA',
      venue: 'Los Angeles Convention Center',
      type: 'conference',
      speaker: 'Sarah Johnson',
      topic: 'Container Security',
      registrationUrl: null,
      slidesUrl: 'https://example.com/slides/dockercon-2023.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=400&fit=crop'
    },
    {
      id: '6',
      title: 'Google Cloud Next 2023',
      description: 'Panel discussion on "Hybrid and Multi-Cloud Strategies" with industry leaders and practitioners.',
      date: '2023-08-29',
      location: 'San Francisco, CA',
      venue: 'Moscone Center',
      type: 'panel',
      speaker: 'Mike Chen',
      topic: 'Hybrid Cloud',
      registrationUrl: null,
      slidesUrl: 'https://example.com/slides/google-cloud-next-2023.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop'
    }
  ]

  return {
    props: {
      upcomingEvents,
      pastEvents
    }
  }
}
