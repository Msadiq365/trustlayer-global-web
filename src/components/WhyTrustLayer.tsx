import { motion } from 'framer-motion'
import { values } from '@/data/values'
import SectionTitle from './SectionTitle'

export default function WhyTrustLayer() {
  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Built on values that matter" subtitle="Why Trust Layer">
          Our principles guide everything we build.
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-premium transition-all"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h4 className="text-xl font-semibold text-navy-900 mb-2">{value.title}</h4>
              <p className="text-navy-900/70 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}