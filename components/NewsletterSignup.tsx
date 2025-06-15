import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiCheck, FiX, FiLoader } from 'react-icons/fi'

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'sidebar'
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

interface FormData {
  email: string
  firstName?: string
  interests?: string[]
}

export default function NewsletterSignup({
  variant = 'inline',
  title = 'Stay Updated',
  description = 'Get the latest cloud tech insights delivered to your inbox.',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  className = '',
}: NewsletterSignupProps) {
  const [formData, setFormData] = useState<FormData>({ email: '', firstName: '', interests: [] })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const interests = [
    'Cloud Architecture',
    'DevOps',
    'Kubernetes',
    'Serverless',
    'AI/ML',
    'Security',
    'Cost Optimization',
    'Monitoring',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Submit to multiple services
      const promises = []

      // ConvertKit
      if (process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY) {
        promises.push(
          fetch(`https://api.convertkit.com/v3/forms/${process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
              email: formData.email,
              first_name: formData.firstName,
              tags: formData.interests,
            }),
          })
        )
      }

      // Mailchimp
      if (process.env.NEXT_PUBLIC_MAILCHIMP_URL) {
        promises.push(
          fetch(process.env.NEXT_PUBLIC_MAILCHIMP_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email_address: formData.email,
              status: 'subscribed',
              merge_fields: {
                FNAME: formData.firstName,
                INTERESTS: formData.interests?.join(', '),
              },
            }),
          })
        )
      }

      // Custom API endpoint
      promises.push(
        fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
      )

      await Promise.allSettled(promises)

      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: variant,
          value: 1,
        })
      }

      setStatus('success')
      setFormData({ email: '', firstName: '', interests: [] })
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest]
    }))
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'modal':
        return 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-auto'
      case 'sidebar':
        return 'bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${getVariantClasses()} ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-2">
          <FiMail className="w-6 h-6 mr-2" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className={`text-sm ${variant === 'inline' ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
          {description}
        </p>
      </div>

      {/* Success State */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <FiCheck className="w-12 h-12 mx-auto mb-2 text-green-500" />
          <h4 className="font-semibold mb-1">Welcome aboard! 🎉</h4>
          <p className="text-sm opacity-80">
            Check your email for a confirmation link.
          </p>
        </motion.div>
      )}

      {/* Form */}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder={placeholder}
              required
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                variant === 'inline'
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/70'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
              }`}
            />
          </div>

          {/* Advanced Options Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm underline opacity-80 hover:opacity-100 transition-opacity"
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced options
          </button>

          {/* Advanced Options */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* First Name */}
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="First name (optional)"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  variant === 'inline'
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/70'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                }`}
              />

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Interests (select all that apply):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests?.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-500 text-sm"
            >
              <FiX className="w-4 h-4" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50 ${
              variant === 'inline'
                ? 'bg-white text-blue-600 hover:bg-gray-100'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {status === 'loading' ? (
              <div className="flex items-center justify-center space-x-2">
                <FiLoader className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </div>
            ) : (
              buttonText
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs opacity-70 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </motion.div>
  )
}
