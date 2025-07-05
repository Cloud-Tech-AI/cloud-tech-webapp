import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'

const team = [
  {
    id: '1',
    name: 'Adit Modi',
    role: 'Co-Founder & Lead Cloud Architect',
    bio: 'Adit has over 5 years of experience in cloud computing and has helped hundreds of organizations migrate to the cloud. He\'s a certified AWS Solutions Architect and frequent speaker at cloud conferences. Co-creator of all blogs, podcasts, and educational content.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGVqQe3byPFAQ/profile-displayphoto-shrink_400_400/B4DZcAvkRnG8Ak-/0/1748064159646?e=1756339200&v=beta&t=h3NwYRcZFBKIjL-nk-QpRuSDkpAZrrKIPuEgrR7PqSk',
    social: {
      twitter: 'https://x.com/adi_12_modi',
      linkedin: 'https://www.linkedin.com/in/adit-n-modi/',
      github: 'https://github.com/AditModi'
    }
  },
  {
    id: '2',
    name: 'Ishan Modi',
    role: 'Co-Founder & ML Engineer',
    bio: 'Ishan is a Machine Learning Engineer specializing in document intelligence, with expertise in AI, MLOps, and cloud platforms like AWS and GCP. Co-creator of all blogs, podcasts, and educational content.',
    image: '',
    social: {
      twitter: 'https://x.com/ishan_modi24',
      linkedin: 'https://www.linkedin.com/in/ishan-modi-5765521a1/'
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
            Our team consists of experienced cloud professionals, thought leaders, and passionate educators who are dedicated to sharing knowledge and building community. All our blogs, podcasts, and content are a joint effort by both founders.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
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

        {/* Joint Effort Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 bg-white rounded-lg p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Collaborative Content Creation
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            All our blogs, podcasts, and educational content are created through the collaborative efforts of both Adit and Ishan Modi. 
            This joint approach ensures comprehensive coverage of cloud technologies, combining deep technical expertise in cloud architecture 
            with cutting-edge insights in AI/ML and document intelligence.
          </p>
          <div className="flex justify-center space-x-8 mt-6">
            <a
              href="https://www.linkedin.com/in/adit-n-modi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Connect with Adit
            </a>
            <a
              href="https://www.linkedin.com/in/ishan-modi-5765521a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Connect with Ishan
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
