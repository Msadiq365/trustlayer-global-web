import Layout from '@/components/Layout'
import ContactForm from '@/components/ContactForm'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg text-navy-900/70 leading-relaxed mb-8">
                Have a project in mind? Let's talk about how we can help you build 
                trusted digital solutions.
              </p>

              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'contact@trustlayerglobal.com' },
                  { icon: '📍', label: 'Location', value: 'Lagos, Nigeria' },
                  { icon: '🕐', label: 'Hours', value: 'Mon-Fri, 9:00 AM - 6:00 PM' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-premium">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="font-medium text-navy-900">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-premium p-8"
            >
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Send us a message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  )
}