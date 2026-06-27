import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'

export default function TechnologySection() {
  return (
    <section id="technology" className="py-24 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-light font-semibold text-sm tracking-wider uppercase">
              Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">
              Built for performance, scalability, and security
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Our platforms are built using modern engineering practices focused on
              delivering reliable, secure, and high-performance digital experiences.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {['⚡ Performance', '🔒 Security', '📈 Scalable'].map((item) => (
                <div key={item} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <span className="block text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
              <div className="space-y-4">
                {[
                  { label: 'API Gateway', status: 'Operational' },
                  { label: 'Database Cluster', status: 'Healthy' },
                  { label: 'CDN Network', status: 'Active' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                  >
                    <span className="text-white/80 text-sm">{item.label}</span>
                    <span className="flex items-center text-sm text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}