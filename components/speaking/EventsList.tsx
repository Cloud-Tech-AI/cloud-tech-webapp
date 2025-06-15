import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiExternalLink, FiDownload, FiPlay } from 'react-icons/fi'
import { SpeakingEvent } from '@/types'

interface EventsListProps {
  upcomingEvents: SpeakingEvent[]
  pastEvents: SpeakingEvent[]
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'conference':
      return 'bg-primary-100 text-primary-800'
    case 'workshop':
      return 'bg-secondary-100 text-secondary-800'
    case 'meetup':
      return 'bg-accent-100 text-accent-800'
    case 'keynote':
      return 'bg-purple-100 text-purple-800'
    case 'panel':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function EventsList({ upcomingEvents, pastEvents }: EventsListProps) {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upcoming Events */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us at these upcoming conferences, workshops, and meetups. Register now to secure your spot!
            </p>
          </motion.div>
          
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
                <div className="relative mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiCalendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiMapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Speaker:</strong> {event.speaker}
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topic:</strong> {event.topic}
                </div>
                
                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Register Now</span>
                    <FiExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Past Events */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Past Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our previous speaking engagements. Access slides and recordings from past presentations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiCalendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiMapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Speaker:</strong> {event.speaker}
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Topic:</strong> {event.topic}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  {event.slidesUrl && (
                    <a
                      href={event.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center justify-center space-x-2 text-sm"
                    >
                      <FiDownload className="h-4 w-4" />
                      <span>Slides</span>
                    </a>
                  )}
                  {event.videoUrl && (
                    <a
                      href={event.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center justify-center space-x-2 text-sm"
                    >
                      <FiPlay className="h-4 w-4" />
                      <span>Video</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
