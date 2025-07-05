import { motion } from 'framer-motion'
import { FiMail, FiTrendingUp, FiUsers, FiExternalLink } from 'react-icons/fi'

export default function NewsletterHero() {
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
              <FiMail className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Everything About Cloud Tech
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 mb-4 max-w-3xl mx-auto">
              Weekly insights, expert commentary, and curated news on cloud computing, DevOps, AI/ML, and emerging technologies.
            </p>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Curated and written by <strong>Adit Modi</strong> and <strong>Ishan Modi</strong>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8"
          >
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiMail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Weekly Editions</h3>
              <p className="text-gray-200">Fresh insights every week</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiUsers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">10K+ Subscribers</h3>
              <p className="text-gray-200">Growing community of cloud professionals</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiTrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Curation</h3>
              <p className="text-gray-200">Handpicked content and insights</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a
              href="https://www.linkedin.com/newsletters/everything-about-cloud-tech-7079093941148540928/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-lg transition-all duration-200 backdrop-blur-sm text-lg font-semibold"
            >
              <span>Subscribe on LinkedIn</span>
              <FiExternalLink className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
