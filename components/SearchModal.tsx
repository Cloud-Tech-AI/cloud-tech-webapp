import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX, FiFileText, FiMic, FiCalendar } from 'react-icons/fi'
import { searchContent } from '../lib/contentful'
import Link from 'next/link'
import { format } from 'date-fns'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResults {
  blogPosts: any[]
  podcastEpisodes: any[]
  speakingEvents: any[]
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults>({
    blogPosts: [],
    podcastEpisodes: [],
    speakingEvents: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleSearch = async () => {
      if (query.length < 2) {
        setResults({ blogPosts: [], podcastEpisodes: [], speakingEvents: [] })
        return
      }

      setIsLoading(true)
      try {
        const searchResults = await searchContent(query)
        setResults(searchResults)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalResults = results.blogPosts.length + results.podcastEpisodes.length + results.speakingEvents.length

    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % totalResults)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + totalResults) % totalResults)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      // Handle selection
    }
  }

  const totalResults = results.blogPosts.length + results.podcastEpisodes.length + results.speakingEvents.length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <FiSearch className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles, podcasts, events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {!isLoading && query.length >= 2 && totalResults === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No results found for &quot;{query}&quot;
                </div>
              )}

              {!isLoading && totalResults > 0 && (
                <div className="py-2">
                  {/* Blog Posts */}
                  {results.blogPosts.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Articles ({results.blogPosts.length})
                      </h3>
                      {results.blogPosts.map((post, index) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                          <a
                            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={onClose}
                          >
                            <FiFileText className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-white truncate">
                                {post.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {post.excerpt}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 ml-2">
                              {format(new Date(post.publishedDate), 'MMM d')}
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Podcast Episodes */}
                  {results.podcastEpisodes.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Podcast Episodes ({results.podcastEpisodes.length})
                      </h3>
                      {results.podcastEpisodes.map((episode, index) => (
                        <Link key={episode.slug} href={`/podcast/${episode.slug}`}>
                          <a
                            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={onClose}
                          >
                            <FiMic className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-white truncate">
                                Episode {episode.episodeNumber}: {episode.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {episode.description}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 ml-2">
                              {episode.duration}
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Speaking Events */}
                  {results.speakingEvents.length > 0 && (
                    <div>
                      <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Events ({results.speakingEvents.length})
                      </h3>
                      {results.speakingEvents.map((event, index) => (
                        <Link key={event.slug} href={`/speaking/${event.slug}`}>
                          <a
                            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={onClose}
                          >
                            <FiCalendar className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-white truncate">
                                {event.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {event.location} • {event.venue}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 ml-2">
                              {format(new Date(event.eventDate), 'MMM d')}
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {query.length < 2 && (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <FiSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Start typing to search articles, podcasts, and events</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                {totalResults > 0 && (
                  <span>{totalResults} result{totalResults !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
