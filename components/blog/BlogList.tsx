import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiClock, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi'
import { BlogPost } from '@/types'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
      
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
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
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <FiUser className="h-4 w-4" />
                  <span>{post.author}</span>
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
              
              <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors duration-200">
                <Link href={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-medium"
              >
                <span>Read More</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
