import { NextSeo } from 'next-seo'
import AboutHero from '@/components/about/AboutHero'
import Mission from '@/components/about/Mission'
import Team from '@/components/about/Team'
import Community from '@/components/about/Community'

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About Cloud Tech - Our Mission and Community"
        description="Learn about Cloud Tech's mission to democratize cloud computing knowledge. Meet our team and discover how we're building a global community of cloud professionals."
      />
      
      <AboutHero />
      <Mission />
      <Team />
      <Community />
    </>
  )
}
