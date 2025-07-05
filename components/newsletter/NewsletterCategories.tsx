import { motion } from 'framer-motion'
import { FiTag } from 'react-icons/fi'

interface NewsletterCategoriesProps {
  categories: string[]
}

export default function NewsletterCategories({ categories }: NewsletterCategoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card sticky top-8"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FiTag className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
      </div>
      
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            {category}
          </motion.button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Subscribe to Newsletter</h4>
        <p className="text-sm text-gray-600 mb-3">
          Get weekly insights delivered to your inbox
        </p>
        <a
          href="https://www.linkedin.com/newsletters/everything-about-cloud-tech-7079093941148540928/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm w-full text-center"
        >
          Subscribe on LinkedIn
        </a>
      </div>
    </motion.div>
  )
}
