import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'

const team = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Founder & Lead Cloud Architect',
    bio: 'John has over 15 years of experience in cloud computing and has helped hundreds of organizations migrate to the cloud. He\'s a certified AWS Solutions Architect and frequent speaker at cloud conferences.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/johnsmith',
      linkedin: 'https://linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Security Expert & Podcast Host',
    bio: 'Sarah specializes in cloud security and compliance. She has worked with Fortune 500 companies to implement secure cloud architectures and is passionate about making security accessible to all.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    }
  },
  {
    id: '3',
    name: 'Mike Chen',
    role: 'Multi-Cloud Strategy Consultant',
    bio: 'Mike helps organizations navigate multi-cloud strategies and has extensive experience with AWS, Azure, and GCP. He\'s the author of several cloud architecture whitepapers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/mikechen',
      linkedin: 'https://linkedin.com/in/mikechen',
      github: 'https://github.com/mikechen'
    }
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    role: 'DevOps Engineer & Content Creator',
    bio: 'Emily is passionate about DevOps practices and automation. She creates content about CI/CD, Infrastructure as Code, and modern development practices.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/emilyrodriguez',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      github: 'https://github.com/emilyrodriguez'
    }
  }
]

export default function Team() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team consists of experienced cloud professionals, thought leaders, and passionate educators who are dedicated to sharing knowledge and building community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-primary-600 font-medium mb-4">
                {member.role}
              </p>
              
              <p className="text-gray-600 text-sm mb-6">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-4">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    <FiTwitter className="h-5 w-5" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700 transition-colors duration-200"
                  >
                    <FiLinkedin className="h-5 w-5" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    <FiGithub className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
