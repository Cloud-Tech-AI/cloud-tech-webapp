import Link from 'next/link'
import { FiTwitter, FiLinkedin, FiGithub, FiYoutube, FiRss } from 'react-icons/fi'
import { HiCloud } from 'react-icons/hi'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Blog', href: '/blog' },
    { name: 'Speaking', href: '/speaking' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/cloudtech',
      icon: FiTwitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/cloudtech',
      icon: FiLinkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/cloud-tech-ai',
      icon: FiGithub,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/cloudtech',
      icon: FiYoutube,
    },
    {
      name: 'RSS',
      href: '/rss.xml',
      icon: FiRss,
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <HiCloud className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">Cloud Tech</span>
            </div>
            <p className="text-gray-400 text-base">
              Empowering cloud professionals with knowledge, community, and resources to excel in the ever-evolving world of cloud computing.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  More
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.slice(3).map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="https://cloudtechforall.store/newsletter"
                      className="text-base text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a
                      href="/rss.xml"
                      className="text-base text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      RSS Feed
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="text-base text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-base text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Cloud Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
