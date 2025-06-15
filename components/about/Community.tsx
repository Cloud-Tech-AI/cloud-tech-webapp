import { motion } from 'framer-motion'
import { FiUsers, FiGlobe, FiTrendingUp, FiHeart, FiMessageCircle, FiBookOpen } from 'react-icons/fi'

const stats = [
  {
    icon: FiUsers,
    value: '25,000+',
    label: 'Community Members',
    description: 'Active professionals worldwide'
  },
  {
    icon: FiGlobe,
    value: '50+',
    label: 'Countries',
    description: 'Global reach and impact'
  },
  {
    icon: FiTrendingUp,
    value: '500K+',
    label: 'Monthly Listeners',
    description: 'Podcast downloads per month'
  },
  {
    icon: FiBookOpen,
    value: '200+',
    label: 'Articles Published',
    description: 'In-depth technical content'
  }
]

const communityFeatures = [
  {
    icon: FiMessageCircle,
    title: 'Active Discussions',
    description: 'Join conversations about the latest cloud technologies, best practices, and industry trends.'
  },
  {
    icon: FiUsers,
    title: 'Networking Opportunities',
    description: 'Connect with like-minded professionals, mentors, and potential collaborators.'
  },
  {
    icon: FiBookOpen,
    title: 'Knowledge Sharing',
    description: 'Share your experiences, learn from others, and contribute to the collective knowledge.'
  },
  {
    icon: FiHeart,
    title: 'Supportive Environment',
    description: 'Get help with challenges, celebrate successes, and grow together as a community.'
  }
]

export default function Community() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Global Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cloud Tech has grown into a vibrant global community of cloud professionals who support each other&apos;s growth and success.
          </p>
        </motion.div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="bg-secondary-100 rounded-lg p-3 flex-shrink-0">
                <feature.icon className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Join Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Join Our Community Today
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Connect with thousands of cloud professionals, access exclusive content, and accelerate your cloud journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/cloudtech"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Join Discord Community
            </a>
            <a
              href="https://linkedin.com/company/cloudtech"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Follow on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
