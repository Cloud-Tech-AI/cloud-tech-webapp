import { NextSeo } from 'next-seo'
import Hero from '@/components/Hero'
import FeaturedContent from '@/components/FeaturedContent'
import Newsletter from '@/components/Newsletter'
import CommunityStats from '@/components/CommunityStats'
import UpcomingEvents from '@/components/UpcomingEvents'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Cloud Tech - Your Gateway to Cloud Computing Excellence"
        description="Join thousands of cloud professionals in our community. Access expert insights, podcasts, blogs, and speaking events covering AWS, Azure, GCP, DevOps, and more."
      />
      
      <Hero />
      <CommunityStats />
      <FeaturedContent />
      <UpcomingEvents />
      <Newsletter />
    </>
  )
}
