import { motion } from 'framer-motion'
import { FiHeadphones, FiExternalLink } from 'react-icons/fi'
import { SiApple, SiSpotify, SiGooglepodcasts } from 'react-icons/si'

const platforms = [
  {
    name: 'Apple Podcasts',
    icon: SiApple,
    url: 'https://podcasts.apple.com/podcast/cloud-tech',
    color: 'text-gray-900'
  },
  {
    name: 'Spotify',
    icon: SiSpotify,
    url: 'https://open.spotify.com/show/cloud-tech',
    color: 'text-green-500'
  },
  {
    name: 'Google Podcasts',
    icon: SiGooglepodcasts,
    url: 'https://podcasts.google.com/feed/cloud-tech',
    color: 'text-blue-500'
  }
]

export default function PodcastSubscribe() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <FiHeadphones className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Subscribe & Listen
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Never miss an episode! Subscribe to the Cloud Tech Podcast on your favorite platform and get notified when new episodes are released.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors duration-200 min-w-[200px]"
              >
                <platform.icon className={`h-6 w-6 ${platform.color}`} />
                <span className="font-medium text-gray-900">{platform.name}</span>
                <FiExternalLink className="h-4 w-4 text-gray-500" />
              </motion.a>
            ))}
          </div>
          
          <div className="mt-8">
            <a
              href="/rss.xml"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-medium"
            >
              <span>RSS Feed</span>
              <FiExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
