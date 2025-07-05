import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowLeft, FiExternalLink, FiUsers, FiShare2 } from 'react-icons/fi'
import { Newsletter } from '@/types'

interface NewsletterDetailProps {
  newsletter: Newsletter
}

export default function NewsletterDetail({ newsletter }: NewsletterDetailProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsletter.title,
        text: newsletter.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('URL copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/newsletter"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 mb-4"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Back to Newsletter</span>
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <FiCalendar className="h-4 w-4" />
              <span>{new Date(newsletter.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock className="h-4 w-4" />
              <span>{newsletter.readTime} min read</span>
            </div>
            {newsletter.subscribers && (
              <div className="flex items-center space-x-1">
                <FiUsers className="h-4 w-4" />
                <span>{newsletter.subscribers.toLocaleString()} subscribers</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {newsletter.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {newsletter.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-semibold rounded-full">
                {newsletter.category}
              </span>
              {newsletter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <FiShare2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              
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
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden"
        >
          <Image
            src={newsletter.image}
            alt={newsletter.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: newsletter.content.replace(/\n/g, '<br />').replace(/#{1,6}\s/g, match => {
                const level = match.trim().length
                return `<h${level} class="text-${4-level}xl font-bold text-gray-900 mt-8 mb-4">`
              }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }}
          />
          
          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CT</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Cloud Tech Team</h4>
                <p className="text-gray-600">
                  Curated by <strong>Adit Modi</strong> and <strong>Ishan Modi</strong>
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <a
                    href="https://www.linkedin.com/in/adit-n-modi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Adit&apos;s LinkedIn
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ishan-modi-5765521a1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Ishan&apos;s LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter Subscription CTA */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Subscribe to Everything About Cloud Tech
            </h3>
            <p className="text-gray-600 mb-4">
              Get weekly insights on cloud computing, DevOps, AI/ML, and emerging technologies delivered to your inbox.
            </p>
            <a
              href="https://www.linkedin.com/newsletters/everything-about-cloud-tech-7079093941148540928/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Subscribe on LinkedIn</span>
              <FiExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
