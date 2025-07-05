import { motion } from 'framer-motion'
import { FiMail, FiTwitter, FiLinkedin, FiGithub, FiMessageCircle, FiClock } from 'react-icons/fi'

const contactMethods = [
  {
    icon: FiMail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    contact: 'cloudtechforall@gmail.com',
    link: 'mailto:cloudtechforall@gmail.com'
  },
  {
    icon: FiMessageCircle,
    title: 'Join Our Discord',
    description: 'Get instant help from our community',
    contact: 'Discord Community',
    link: 'https://discord.gg/bQpH4Y9Q'
  },
  {
    icon: FiTwitter,
    title: 'Follow on Twitter',
    description: 'Stay updated with our latest news and updates',
    contact: '@cloudtech',
    link: 'https://x.com/AboutCloudTech'
  }
]

const socialLinks = [
  {
    name: 'Twitter',
    icon: FiTwitter,
    url: 'https://x.com/AboutCloudTech',
    color: 'hover:text-blue-500'
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    url: 'https://www.linkedin.com/company/cloud-techs/',
    color: 'hover:text-blue-700'
  },
  {
    name: 'GitHub',
    icon: FiGithub,
    url: 'https://github.com/Cloud-Tech-AI',
    color: 'hover:text-gray-900'
  }
]

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Contact Methods */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Other Ways to Reach Us
        </h2>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary-100 rounded-lg p-3 flex-shrink-0">
                <method.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {method.description}
                </p>
                <a
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  {method.contact}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="card bg-primary-50 border-primary-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <FiClock className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Response Time
          </h3>
        </div>
        <p className="text-gray-700">
          We typically respond to all inquiries within 24 hours during business days. 
          For urgent matters, please reach out via our Discord community for faster assistance.
        </p>
      </motion.div>
      
      {/* Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Connect With Us
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Follow us on social media for the latest updates, tips, and community highlights.
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 ${social.color} transition-colors duration-200`}
            >
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </motion.div>
      
      {/* FAQ Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="card bg-secondary-50 border-secondary-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Before reaching out, you might find your answer in our FAQ section.
        </p>
        <a
          href="/faq"
          className="text-secondary-600 hover:text-secondary-800 font-medium"
        >
          View FAQ →
        </a>
      </motion.div>
    </motion.div>
  )
}
