import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-primary-light/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-primary">Trusted Technology</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-[1.1] mb-6"
            >
              Building trusted digital solutions for a{' '}
              <span className="text-primary">connected world</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-navy-900/70 max-w-lg mb-8 leading-relaxed"
            >
              Trust Layer Technologies develops secure and scalable digital platforms that
              simplify how people and businesses interact with technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#solutions"
                className="px-8 py-4 bg-navy-900 text-white rounded-full font-medium hover:bg-navy-900/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Solutions
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-navy-900 text-navy-900 rounded-full font-medium hover:bg-navy-900 hover:text-white transition-all"
              >
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl border border-primary/10 p-8 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-8xl mb-4"
                >
                  🔒
                </motion.div>
                <h3 className="text-xl font-semibold text-navy-900">Trust Layer</h3>
                <p className="text-navy-900/60">Secure • Reliable • Scalable</p>
                
                {/* Abstract network visualization - WITH ICONS */}
                <div className="mt-8 grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                  {['🔗', '🌐', '🔒', '⚡', '🛡️', '📱', '💳', '🔐', '📊'].map((icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                      className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center text-lg hover:bg-primary/20 transition-colors"
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}