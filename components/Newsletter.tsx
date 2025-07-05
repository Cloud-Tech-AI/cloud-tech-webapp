import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiCheck, FiExternalLink, FiTrendingUp, FiBookOpen, FiMic, FiShield } from 'react-icons/fi'

const recentTopics = [
  "AWS re:Invent 2024 Key Announcements",
  "Multi-Cloud Security Best Practices",
  "Kubernetes Cost Optimization Strategies",
  "AI/ML on Cloud: Production Ready Solutions"
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
    setName('')
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FiMail className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything About Cloud Tech
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Join thousands of cloud professionals who trust us for the latest insights and expert commentary on cloud computing.
            </p>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <FiTrendingUp className="h-8 w-8 text-white mb-2" />
              <p className="text-sm text-gray-100">Weekly insights on cloud computing trends, AWS, Azure, and GCP updates</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FiBookOpen className="h-8 w-8 text-white mb-2" />
              <p className="text-sm text-gray-100">Practical tips, how-tos, and deep dives into DevOps, AI/ML, and cloud security</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FiMic className="h-8 w-8 text-white mb-2" />
              <p className="text-sm text-gray-100">Early access to our blogs, podcasts, and virtual event announcements</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FiShield className="h-8 w-8 text-white mb-2" />
              <p className="text-sm text-gray-100">Curated news and expert commentary on the latest in cloud technology</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto mb-8"
          >
            {isSubmitted ? (
              <div className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-center space-x-2">
                <FiCheck className="h-5 w-5" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </button>
              </form>
            )}
            
            <p className="text-sm text-gray-200 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>

          {/* LinkedIn Newsletter Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a
              href="https://www.linkedin.com/newsletters/everything-about-cloud-tech-7079093941148540928/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <span>Read our LinkedIn Newsletter</span>
              <FiExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Recent Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Recent Newsletter Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentTopics.map((topic, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-gray-100">{topic}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
