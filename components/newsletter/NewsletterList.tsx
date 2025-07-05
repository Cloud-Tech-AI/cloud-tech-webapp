import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiClock, FiCalendar, FiExternalLink, FiArrowRight, FiUsers } from 'react-icons/fi'
import { Newsletter } from '@/types'

interface NewsletterListProps {
  newsletters: Newsletter[]
  showAll?: boolean
  maxNewsletters?: number
}

export default function NewsletterList({ newsletters, showAll = true, maxNewsletters = 4 }: NewsletterListProps) {
  const displayNewsletters = showAll ? newsletters : newsletters.slice(0, maxNewsletters)
  const hasMoreNewsletters = !showAll && newsletters.length > maxNewsletters

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Latest Newsletter Editions</h2>
        {!showAll && hasMoreNewsletters && (
          <Link
            href="/newsletter"
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      {displayNewsletters.map((newsletter, index) => (
        <motion.article
          key={newsletter.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="card hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div className="relative">
                <Image
                  src={newsletter.image}
                  alt={newsletter.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                    {newsletter.category}
                  </span>
                </div>
                {newsletter.subscribers && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <FiUsers className="h-3 w-3" />
                    <span>{newsletter.subscribers.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <FiCalendar className="h-4 w-4" />
                  <span>{new Date(newsletter.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiClock className="h-4 w-4" />
                  <span>{newsletter.readTime} min read</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors duration-200">
                <Link href={`/newsletter/${newsletter.id}`}>
                  {newsletter.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {newsletter.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {newsletter.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {newsletter.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{newsletter.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Link
                  href={`/newsletter/${newsletter.id}`}
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-medium"
                >
                  <span>Read Full Edition</span>
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                
                {newsletter.linkedinUrl && (
                  <a
                    href={newsletter.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>View on LinkedIn</span>
                    <FiExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.article>
      ))}

      {!showAll && hasMoreNewsletters && (
        <div className="text-center pt-8">
          <Link
            href="/newsletter"
            className="btn-primary"
          >
            View All Newsletters ({newsletters.length} total)
          </Link>
        </div>
      )}
    </div>
  )
}
