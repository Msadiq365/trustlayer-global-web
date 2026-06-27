import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6">
              About <span className="text-primary">Trust Layer</span>
            </h1>
            <p className="text-lg text-navy-900/70 leading-relaxed">
              We build practical digital solutions designed around the needs of users, 
              businesses, and communities. Our focus is to deliver reliable, secure, 
              and easy-to-use platforms that create real value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Our Mission',
                description: 'To simplify how people and businesses interact with technology through secure and reliable digital solutions.',
                icon: '🎯',
              },
              {
                title: 'Our Vision',
                description: 'To become the most trusted technology partner for digital solutions across the globe.',
                icon: '👁️',
              },
              {
                title: 'Our Values',
                description: 'Reliability, Security, Simplicity, and Innovation guide everything we build.',
                icon: '💎',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-navy-900/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '99.9%', label: 'Uptime' },
              { number: '1M+', label: 'Transactions' },
              { number: '24/7', label: 'Support' },
              { number: '100+', label: 'Partners' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-navy-900">{stat.number}</div>
                <div className="text-sm text-navy-900/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}