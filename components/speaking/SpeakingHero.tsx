import { motion } from 'framer-motion'
import { FiMic, FiUsers, FiGlobe, FiCalendar } from 'react-icons/fi'

export default function SpeakingHero() {
  return (
    <div className="bg-gradient-to-br from-accent-600 via-primary-600 to-secondary-600 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white bg-opacity-20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FiMic className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Speaking Engagements
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Join our experts at conferences, workshops, and events worldwide. Learn from industry leaders and connect with the global cloud community.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiCalendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">50+ Events</h3>
              <p className="text-gray-200">Conferences and workshops</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiUsers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">10K+ Attendees</h3>
              <p className="text-gray-200">Professionals reached</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiGlobe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">25+ Countries</h3>
              <p className="text-gray-200">Global presence</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiMic className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Speakers</h3>
              <p className="text-gray-200">Industry thought leaders</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
