import { motion } from 'framer-motion'
import { FiUsers, FiHeadphones, FiBookOpen, FiGlobe } from 'react-icons/fi'

const stats = [
  {
    id: 1,
    name: 'Community Members',
    value: '25,000+',
    icon: FiUsers,
    description: 'Active cloud professionals'
  },
  {
    id: 2,
    name: 'Podcast Downloads',
    value: '500K+',
    icon: FiHeadphones,
    description: 'Monthly episode downloads'
  },
  {
    id: 3,
    name: 'Blog Articles',
    value: '200+',
    icon: FiBookOpen,
    description: 'In-depth technical articles'
  },
  {
    id: 4,
    name: 'Countries Reached',
    value: '50+',
    icon: FiGlobe,
    description: 'Global community presence'
  },
]

export default function CommunityStats() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cloud Tech has become the go-to resource for cloud professionals worldwide. 
            Here&apos;s what we&apos;ve achieved together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.name}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
