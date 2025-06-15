import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause, FiClock, FiCalendar, FiUser, FiShare2 } from 'react-icons/fi'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share'
import { Episode } from '@/types'

interface EpisodeDetailProps {
  episode: Episode
}

export default function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you would control the audio player here
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="bg-white bg-opacity-20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FiPlay className="h-12 w-12" />
            </div>
            <div className="text-sm font-semibold mb-2 opacity-90">
              Episode {episode.id}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {episode.title}
            </h1>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {episode.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm opacity-90 mb-8">
              <div className="flex items-center space-x-1">
                <FiClock className="h-4 w-4" />
                <span>{episode.duration}</span>
              </div>
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
            
            <button
              onClick={togglePlay}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              {isPlaying ? <FiPause className="h-5 w-5" /> : <FiPlay className="h-5 w-5" />}
              <span>{isPlaying ? 'Pause' : 'Play Episode'}</span>
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Audio Player Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-100 rounded-lg p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    {isPlaying ? <FiPause className="h-6 w-6" /> : <FiPlay className="h-6 w-6" />}
                  </button>
                  <div>
                    <div className="font-semibold text-gray-900">{episode.title}</div>
                    <div className="text-sm text-gray-600">{episode.duration}</div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-gray-300 rounded-full h-2 mb-4">
                <div className="bg-primary-600 h-2 rounded-full w-1/3"></div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>15:30</span>
                <span>{episode.duration}</span>
              </div>
            </motion.div>
            
            {/* Show Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              id="show-notes"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Show Notes</h2>
              <div className="prose-custom">
                <div dangerouslySetInnerHTML={{ __html: episode.showNotes.replace(/\n/g, '<br>') }} />
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Episode Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Episode Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Duration</div>
                  <div className="text-gray-600">{episode.duration}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Published</div>
                  <div className="text-gray-600">{new Date(episode.publishedAt).toLocaleDateString()}</div>
                </div>
                {episode.guests.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700">Guests</div>
                    <div className="text-gray-600">{episode.guests.join(', ')}</div>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {episode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Share */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FiShare2 className="h-5 w-5" />
                <span>Share Episode</span>
              </h3>
              <div className="flex space-x-3">
                <TwitterShareButton
                  url={shareUrl}
                  title={`Just listened to "${episode.title}" on the Cloud Tech Podcast!`}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors duration-200"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </TwitterShareButton>
                
                <LinkedinShareButton
                  url={shareUrl}
                  title={episode.title}
                  summary={episode.description}
                  className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded transition-colors duration-200"
                >
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </LinkedinShareButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
