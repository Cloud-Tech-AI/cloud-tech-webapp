import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiTag, FiTrendingUp } from 'react-icons/fi'

interface BlogCategoriesProps {
  categories: string[]
}

const popularTags = [
  'AWS', 'Kubernetes', 'DevOps', 'Serverless', 'Docker', 'Terraform', 
  'Azure', 'GCP', 'Security', 'Monitoring', 'CI/CD', 'Microservices'
]

export default function BlogCategories({ categories }: BlogCategoriesProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FiTag className="h-5 w-5" />
          <span>Categories</span>
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="block text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {category}
            </a>
          ))}
        </div>
      </motion.div>
      
      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FiTrendingUp className="h-5 w-5" />
          <span>Popular Tags</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <a
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-800 text-sm rounded-full transition-colors duration-200"
            >
              {tag}
            </a>
          ))}
        </div>
      </motion.div>
      
      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Get the latest articles delivered to your inbox weekly.
        </p>
        <a
          href="#newsletter"
          className="btn-primary w-full text-center"
        >
          Subscribe Now
        </a>
      </motion.div>
      
      {/* Recent Articles */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Articles
        </h3>
        <div className="space-y-3">
          <Link
            href="/blog/1"
            className="block text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Getting Started with AWS Lambda: A Complete Guide
          </Link>
          <Link
            href="/blog/2"
            className="block text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Kubernetes Security: Protecting Your Cluster
          </Link>
          <Link
            href="/blog/3"
            className="block text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Multi-Cloud Architecture: Benefits and Challenges
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
