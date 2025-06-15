import { motion } from 'framer-motion'
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi'

export default function Mission() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Story & Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cloud Tech was founded with a simple belief: cloud computing knowledge should be accessible to everyone. 
            We started as a small group of passionate cloud professionals and have grown into a global community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-primary-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FiTarget className="h-10 w-10 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To democratize cloud computing knowledge by providing high-quality, accessible content and fostering a supportive community where professionals can learn, share, and grow together.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-secondary-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FiEye className="h-10 w-10 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the world&apos;s leading platform for cloud computing education and community, empowering millions of professionals to excel in their cloud journey and drive innovation in the industry.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-accent-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FiHeart className="h-10 w-10 text-accent-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              We believe in knowledge sharing, continuous learning, community collaboration, innovation, and making cloud technology accessible to professionals at all levels of their career journey.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Cloud Tech Matters
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              The cloud computing landscape is evolving rapidly, and staying current can be challenging. 
              We bridge the gap between complex cloud concepts and practical, real-world applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What We Provide:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Expert-led podcast episodes</li>
                  <li>• In-depth technical articles</li>
                  <li>• Speaking engagements worldwide</li>
                  <li>• Community networking opportunities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Who We Serve:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Cloud architects and engineers</li>
                  <li>• DevOps professionals</li>
                  <li>• IT leaders and decision makers</li>
                  <li>• Students and career changers</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
