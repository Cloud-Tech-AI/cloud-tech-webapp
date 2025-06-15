import { motion } from 'framer-motion'
import { FiPlay, FiHeadphones, FiMic } from 'react-icons/fi'

export default function PodcastHero() {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
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
              Cloud Tech Podcast
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Weekly conversations with cloud computing experts, industry leaders, and innovators shaping the future of technology.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiPlay className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">50+ Episodes</h3>
              <p className="text-gray-200">Deep dives into cloud technologies</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiHeadphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">500K+ Downloads</h3>
              <p className="text-gray-200">Monthly listeners worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiMic className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Guests</h3>
              <p className="text-gray-200">Industry leaders and innovators</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
