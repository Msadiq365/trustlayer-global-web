import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              About Trust Layer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-2 mb-4">
              Technology built around real needs
            </h2>
            <p className="text-lg text-navy-900/70 leading-relaxed mb-6">
              Trust Layer focuses on developing practical digital solutions that improve
              accessibility, reliability, and efficiency. We build technology that
              solves real problems for people and businesses.
            </p>
            <Link
  href="/about"
  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
>
  Learn more about us
  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { number: '99.9%', label: 'Uptime' },
              { number: '1M+', label: 'Transactions' },
              { number: '24/7', label: 'Support' },
              { number: '100+', label: 'Partners' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100"
              >
                <div className="text-2xl font-bold text-navy-900">{stat.number}</div>
                <div className="text-sm text-navy-900/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}