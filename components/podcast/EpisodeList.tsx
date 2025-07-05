import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiPlay, FiClock, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi'
import { Episode } from '@/types'

interface EpisodeListProps {
  episodes: Episode[]
  showAll?: boolean
  maxEpisodes?: number
}

export default function EpisodeList({ episodes, showAll = true, maxEpisodes = 4 }: EpisodeListProps) {
  const displayEpisodes = showAll ? episodes : episodes.slice(0, maxEpisodes)
  const hasMoreEpisodes = !showAll && episodes.length > maxEpisodes

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Episodes
            </h2>
            {!showAll && hasMoreEpisodes && (
              <Link
                href="/podcast"
                className="text-primary-600 hover:text-primary-800 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of podcast episodes featuring industry experts discussing the latest trends in cloud computing.
          </p>
        </div>
        
        <div className="space-y-8">
          {displayEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="relative bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-8 text-white">
                    <div className="text-center">
                      <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FiPlay className="h-8 w-8" />
                      </div>
                      <div className="text-sm font-semibold mb-2">Episode {episode.id}</div>
                      <div className="flex items-center justify-center space-x-1 text-sm">
                        <FiClock className="h-4 w-4" />
                        <span>{episode.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="h-4 w-4" />
                      <span>{new Date(episode.publishedAt).toLocaleDateString()}</span>
                    </div>
                    {episode.guests.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <FiUser className="h-4 w-4" />
                        <span>with {episode.guests.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {episode.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {episode.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {episode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/podcast/${episode.id}`}
                      className="btn-primary flex items-center justify-center space-x-2"
                    >
                      <FiPlay className="h-4 w-4" />
                      <span>Listen Now</span>
                    </Link>
                    <Link
                      href={`/podcast/${episode.id}#show-notes`}
                      className="btn-outline flex items-center justify-center space-x-2"
                    >
                      <span>Show Notes</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && hasMoreEpisodes && (
          <div className="text-center pt-12">
            <Link
              href="/podcast"
              className="btn-primary"
            >
              View All Episodes ({episodes.length} total)
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
