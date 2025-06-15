import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiClock, FiCalendar, FiUser, FiShare2, FiArrowLeft } from 'react-icons/fi'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share'
import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogPostDetailProps {
  post: BlogPost
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-white hover:text-gray-300 mb-4"
              >
                <FiArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>
              
              <div className="mb-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm opacity-90">
                <div className="flex items-center space-x-1">
                  <FiUser className="h-4 w-4" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiCalendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiClock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose-custom"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </motion.div>
            
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-primary-100 hover:bg-primary-200 text-primary-800 text-sm rounded-full transition-colors duration-200"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Article Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card mb-8 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Author</div>
                  <div className="text-gray-600">{post.author}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Published</div>
                  <div className="text-gray-600">{new Date(post.publishedAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Reading Time</div>
                  <div className="text-gray-600">{post.readTime} minutes</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Category</div>
                  <div className="text-gray-600">{post.category}</div>
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <FiShare2 className="h-4 w-4" />
                  <span>Share Article</span>
                </h4>
                <div className="flex space-x-3">
                  <TwitterShareButton
                    url={shareUrl}
                    title={`Just read "${post.title}" on the Cloud Tech Blog!`}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors duration-200"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </TwitterShareButton>
                  
                  <LinkedinShareButton
                    url={shareUrl}
                    title={post.title}
                    summary={post.excerpt}
                    className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded transition-colors duration-200"
                  >
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </LinkedinShareButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
