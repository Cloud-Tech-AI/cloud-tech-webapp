// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for the Cloud Tech website
export const trackEvent = {
  // Content engagement
  blogPostView: (slug: string, title: string) => {
    event({
      action: 'blog_post_view',
      category: 'content',
      label: `${slug} - ${title}`,
    })
  },

  podcastPlay: (episodeNumber: number, title: string) => {
    event({
      action: 'podcast_play',
      category: 'content',
      label: `Episode ${episodeNumber} - ${title}`,
    })
  },

  podcastComplete: (episodeNumber: number, title: string) => {
    event({
      action: 'podcast_complete',
      category: 'content',
      label: `Episode ${episodeNumber} - ${title}`,
    })
  },

  // User interactions
  newsletterSignup: (source: string) => {
    event({
      action: 'newsletter_signup',
      category: 'engagement',
      label: source,
      value: 1,
    })
  },

  contactFormSubmit: (formType: string) => {
    event({
      action: 'contact_form_submit',
      category: 'engagement',
      label: formType,
      value: 1,
    })
  },

  socialShare: (platform: string, contentType: string, contentTitle: string) => {
    event({
      action: 'social_share',
      category: 'engagement',
      label: `${platform} - ${contentType} - ${contentTitle}`,
    })
  },

  // Speaking events
  eventRegistration: (eventTitle: string, eventDate: string) => {
    event({
      action: 'event_registration',
      category: 'conversion',
      label: `${eventTitle} - ${eventDate}`,
      value: 1,
    })
  },

  // Search and navigation
  searchQuery: (query: string, resultsCount: number) => {
    event({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
    })
  },

  externalLinkClick: (url: string, context: string) => {
    event({
      action: 'external_link_click',
      category: 'engagement',
      label: `${url} - ${context}`,
    })
  },

  // Performance tracking
  pageLoadTime: (loadTime: number, page: string) => {
    event({
      action: 'page_load_time',
      category: 'performance',
      label: page,
      value: Math.round(loadTime),
    })
  },

  // Error tracking
  jsError: (error: string, page: string) => {
    event({
      action: 'js_error',
      category: 'error',
      label: `${page} - ${error}`,
    })
  },
}

// Performance monitoring
export const performanceMonitoring = {
  // Core Web Vitals
  trackCLS: (metric: any) => {
    event({
      action: 'CLS',
      category: 'Web Vitals',
      value: Math.round(metric.value * 1000),
    })
  },

  trackFID: (metric: any) => {
    event({
      action: 'FID',
      category: 'Web Vitals',
      value: Math.round(metric.value),
    })
  },

  trackLCP: (metric: any) => {
    event({
      action: 'LCP',
      category: 'Web Vitals',
      value: Math.round(metric.value),
    })
  },

  trackFCP: (metric: any) => {
    event({
      action: 'FCP',
      category: 'Web Vitals',
      value: Math.round(metric.value),
    })
  },

  trackTTFB: (metric: any) => {
    event({
      action: 'TTFB',
      category: 'Web Vitals',
      value: Math.round(metric.value),
    })
  },
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return

  // Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(performanceMonitoring.trackCLS)
    getFID(performanceMonitoring.trackFID)
    getFCP(performanceMonitoring.trackFCP)
    getLCP(performanceMonitoring.trackLCP)
    getTTFB(performanceMonitoring.trackTTFB)
  })

  // Page load time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    trackEvent.pageLoadTime(loadTime, window.location.pathname)
  })

  // Error tracking
  window.addEventListener('error', (e) => {
    trackEvent.jsError(e.message, window.location.pathname)
  })

  window.addEventListener('unhandledrejection', (e) => {
    trackEvent.jsError(`Unhandled Promise Rejection: ${e.reason}`, window.location.pathname)
  })
}

// Hotjar integration
export const initHotjar = () => {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_HOTJAR_ID) return

  ;(function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
    h.hj = h.hj || function(...args: any[]) { (h.hj.q = h.hj.q || []).push(args) }
    h._hjSettings = { hjid: process.env.NEXT_PUBLIC_HOTJAR_ID, hjsv: 6 }
    a = o.getElementsByTagName('head')[0]
    r = o.createElement('script')
    r.async = 1
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
    a.appendChild(r)
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
}

// User session tracking
export const sessionTracking = {
  startSession: () => {
    if (typeof window === 'undefined') return
    
    const sessionStart = Date.now()
    sessionStorage.setItem('sessionStart', sessionStart.toString())
    
    event({
      action: 'session_start',
      category: 'engagement',
      label: window.location.pathname,
    })
  },

  endSession: () => {
    if (typeof window === 'undefined') return
    
    const sessionStart = sessionStorage.getItem('sessionStart')
    if (sessionStart) {
      const sessionDuration = Date.now() - parseInt(sessionStart)
      event({
        action: 'session_end',
        category: 'engagement',
        value: Math.round(sessionDuration / 1000), // in seconds
      })
    }
  },

  trackPageTime: (page: string) => {
    if (typeof window === 'undefined') return
    
    const pageStart = Date.now()
    
    return () => {
      const timeOnPage = Date.now() - pageStart
      event({
        action: 'time_on_page',
        category: 'engagement',
        label: page,
        value: Math.round(timeOnPage / 1000), // in seconds
      })
    }
  },
}

// A/B Testing utilities
export const abTesting = {
  getVariant: (testName: string, variants: string[]): string => {
    if (typeof window === 'undefined') return variants[0]
    
    const stored = localStorage.getItem(`ab_test_${testName}`)
    if (stored && variants.includes(stored)) {
      return stored
    }
    
    const variant = variants[Math.floor(Math.random() * variants.length)]
    localStorage.setItem(`ab_test_${testName}`, variant)
    
    event({
      action: 'ab_test_assignment',
      category: 'experiment',
      label: `${testName} - ${variant}`,
    })
    
    return variant
  },

  trackConversion: (testName: string, variant: string, conversionType: string) => {
    event({
      action: 'ab_test_conversion',
      category: 'experiment',
      label: `${testName} - ${variant} - ${conversionType}`,
      value: 1,
    })
  },
}
