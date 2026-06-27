import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Careers() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-navy-900/70">
              Help us build trusted digital solutions that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Currently Not Available Message */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🚀</div>
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Currently Not Available
            </h2>
            <p className="text-lg text-navy-900/70 max-w-2xl mx-auto mb-8">
              We don't have any open positions at the moment, but we're always looking for 
              talented people to join our team. Check back later for opportunities!
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/"
                className="px-8 py-3 bg-navy-900 text-white rounded-full font-medium hover:bg-navy-900/90 transition"
              >
                Return to Home
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-navy-900 text-navy-900 rounded-full font-medium hover:bg-navy-900 hover:text-white transition"
              >
                Contact Us
              </Link>
            </div>

            {/* Optional: Stay Updated Section */}
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                👋 Stay in the Loop
              </h3>
              <p className="text-sm text-navy-900/70">
                Subscribe to our newsletter to get notified when we're hiring.
              </p>
              <Link
                href="/#contact"
                className="inline-block mt-4 text-primary font-medium hover:underline"
              >
                Subscribe Now →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}