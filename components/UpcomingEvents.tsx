import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi'

const upcomingEvents = [
  {
    id: '1',
    title: 'AWS re:Invent 2024',
    description: 'Presenting "Serverless at Scale: Lessons from Production"',
    date: '2024-12-02',
    location: 'Las Vegas, NV',
    type: 'conference',
    registrationUrl: 'https://reinvent.awsevents.com/'
  },
  {
    id: '2',
    title: 'KubeCon + CloudNativeCon',
    description: 'Workshop on "Kubernetes Security Best Practices"',
    date: '2024-11-15',
    location: 'Chicago, IL',
    type: 'workshop',
    registrationUrl: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/'
  },
  {
    id: '3',
    title: 'Cloud Tech Meetup - San Francisco',
    description: 'Monthly meetup discussing "Multi-Cloud Strategies"',
    date: '2024-10-25',
    location: 'San Francisco, CA',
    type: 'meetup',
    registrationUrl: 'https://www.meetup.com/cloud-tech-sf/'
  }
]

export default function UpcomingEvents() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us at conferences, workshops, and meetups around the world. Connect with the community and learn from industry experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                  event.type === 'conference' ? 'bg-primary-100 text-primary-800' :
                  event.type === 'workshop' ? 'bg-secondary-100 text-secondary-800' :
                  'bg-accent-100 text-accent-800'
                }`}>
                  {event.type}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <FiCalendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {event.description}
              </p>
              
              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
                <FiMapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-medium"
              >
                <span>Register Now</span>
                <FiExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/speaking"
            className="btn-outline"
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  )
}
