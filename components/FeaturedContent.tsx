import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiPlay, FiBookOpen, FiMail, FiClock, FiArrowRight } from 'react-icons/fi'

const featuredPodcast = {
  id: '1',
  title: 'The Future of Serverless Computing',
  description: 'Join us as we explore the latest trends in serverless architecture with Adit and Ishan.',
  duration: '45:30',
  publishedAt: '2024-01-15',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
}

const featuredBlog = {
  id: '1',
  title: 'Getting Started with AWS Lambda: A Complete Guide',
  excerpt: 'Learn how to build and deploy serverless functions with AWS Lambda. This comprehensive guide covers everything from basic concepts to advanced patterns.',
  author: 'Adit Modi',
  publishedAt: '2024-01-15',
  readTime: 8,
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
}

const featuredNewsletter = {
  id: '1',
  title: 'AWS re:Invent 2024 Key Announcements & What They Mean for You',
  excerpt: 'A comprehensive breakdown of the most important announcements from AWS re:Invent 2024, including new AI/ML services and serverless updates.',
  publishedAt: '2024-12-05',
  readTime: 8,
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
}

export default function FeaturedContent() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Content
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest newsletter editions, podcast episodes, and blog articles covering the most important topics in cloud computing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FiMail className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                Latest Newsletter
              </span>
            </div>
            
            <div className="relative mb-4">
              <Image
                src={featuredNewsletter.image}
                alt={featuredNewsletter.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {featuredNewsletter.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {featuredNewsletter.excerpt}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{new Date(featuredNewsletter.publishedAt).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <FiClock className="h-4 w-4" />
                  <span>{featuredNewsletter.readTime} min read</span>
                </div>
              </div>
            </div>
            
            <Link
              href={`/newsletter/${featuredNewsletter.id}`}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-medium"
            >
              <span>Read Edition</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Featured Podcast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FiPlay className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-semibold text-secondary-600 uppercase tracking-wide">
                Latest Podcast
              </span>
            </div>
            
            <div className="relative mb-4">
              <Image
                src={featuredPodcast.image}
                alt={featuredPodcast.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-4">
                  <FiPlay className="h-8 w-8 text-secondary-600" />
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {featuredPodcast.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {featuredPodcast.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FiClock className="h-4 w-4" />
                  <span>{featuredPodcast.duration}</span>
                </div>
                <span>{new Date(featuredPodcast.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Link
              href={`/podcast/${featuredPodcast.id}`}
              className="inline-flex items-center space-x-2 text-secondary-600 hover:text-secondary-800 font-medium"
            >
              <span>Listen Now</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          
          {/* Featured Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FiBookOpen className="h-5 w-5 text-accent-600" />
              <span className="text-sm font-semibold text-accent-600 uppercase tracking-wide">
                Latest Article
              </span>
            </div>
            
            <div className="relative mb-4">
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {featuredBlog.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {featuredBlog.excerpt}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {featuredBlog.author}</span>
                <div className="flex items-center space-x-1">
                  <FiClock className="h-4 w-4" />
                  <span>{featuredBlog.readTime} min read</span>
                </div>
              </div>
            </div>
            
            <Link
              href={`/blog/${featuredBlog.id}`}
              className="inline-flex items-center space-x-2 text-accent-600 hover:text-accent-800 font-medium"
            >
              <span>Read More</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/newsletter"
              className="btn-primary"
            >
              View All Newsletters
            </Link>
            <Link
              href="/podcast"
              className="btn-secondary"
            >
              Browse All Episodes
            </Link>
            <Link
              href="/blog"
              className="btn-outline"
            >
              Read All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
