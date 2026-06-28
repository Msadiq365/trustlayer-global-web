import { motion } from 'framer-motion'
import Link from 'next/link'
import ContactForm from './ContactForm'
import NewsletterSignup from './NewsletterSignup'

export default function PartnershipCTA() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary/5 to-primary-light/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Partner With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-2 mb-4">
            Let's build something great together
          </h2>
          <p className="text-lg text-navy-900/70 max-w-2xl mx-auto">
            We work with businesses, institutions, and developers to create solutions
            that make a real impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-premium p-8 md:p-10"
          >
            <h3 className="text-xl font-semibold text-navy-900 mb-6 flex items-center gap-2">
              <span>📩</span> Send us a message
            </h3>
            <ContactForm />
          </motion.div>

          {/* Newsletter & Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Newsletter Card */}
            <div className="bg-navy-900 rounded-2xl shadow-premium p-8 md:p-10 text-white">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span>📬</span> Stay Updated
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Subscribe to our newsletter for the latest updates, insights, and product announcements.
              </p>
              <NewsletterSignup />
            </div>

            {/* Quick Contact Info */}
            <div className="bg-white rounded-2xl shadow-premium p-8 md:p-10">
              <h3 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <span>📞</span> Quick Contact
              </h3>
              <div className="space-y-3">
                {[
                  { icon: '📧', label: 'Email', value: 'info@trustlayerglobal.com' },
                  { icon: '📍', label: 'Location', value: 'Lagos, Nigeria' },
                  { icon: '🕐', label: 'Hours', value: 'Mon-Fri, 9:00 AM - 6:00 PM' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                      <div className="text-sm font-medium text-navy-900">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Visit Contact Page →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}