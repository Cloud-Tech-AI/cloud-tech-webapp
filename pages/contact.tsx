import { NextSeo } from 'next-seo'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export default function ContactPage() {
  return (
    <>
      <NextSeo
        title="Contact Cloud Tech - Get in Touch"
        description="Have questions or want to collaborate? Get in touch with the Cloud Tech team. We'd love to hear from you!"
      />
      
      <ContactHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  )
}
