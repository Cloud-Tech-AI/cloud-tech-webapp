import { motion } from 'framer-motion'
import { FiBookOpen, FiEdit, FiTrendingUp, FiUsers } from 'react-icons/fi'

export default function BlogHero() {
  return (
    <div className="bg-gradient-to-br from-secondary-600 via-primary-600 to-accent-600 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white bg-opacity-20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FiBookOpen className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Cloud Tech Blog
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 mb-4 max-w-3xl mx-auto">
              In-depth articles, tutorials, and insights from cloud computing experts. Stay ahead with the latest trends and best practices.
            </p>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              All content is collaboratively created by <strong>Adit Modi</strong> and <strong>Ishan Modi</strong>
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
                <FiEdit className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">200+ Articles</h3>
              <p className="text-gray-200">Comprehensive guides and tutorials</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiTrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Weekly Updates</h3>
              <p className="text-gray-200">Fresh content every week</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiUsers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Joint Authorship</h3>
              <p className="text-gray-200">Collaborative expertise from both founders</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiBookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Insights</h3>
              <p className="text-gray-200">Industry professionals and thought leaders</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
