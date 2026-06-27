import Layout from '@/components/Layout'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-sm text-navy-900/60 mb-8">Last updated: March 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-navy max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-premium p-8 md:p-12 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Information We Collect</h2>
                <p className="text-navy-900/70 leading-relaxed">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-navy-900/70">
                  <li>Contact us through our forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Apply for a position</li>
                  <li>Use our products and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-navy-900/70 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-navy-900/70">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you</li>
                  <li>Send you updates and newsletters</li>
                  <li>Process your requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Data Security</h2>
                <p className="text-navy-900/70 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect 
                  your personal information against unauthorized access, alteration, disclosure, 
                  or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Data Retention</h2>
                <p className="text-navy-900/70 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill 
                  the purposes for which it was collected, including for the purposes of 
                  satisfying any legal, accounting, or reporting requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Your Rights</h2>
                <p className="text-navy-900/70 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-navy-900/70">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Contact Us</h2>
                <p className="text-navy-900/70 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-navy-900 font-medium mt-2">contact@trustlayerglobal.com</p>
              </section>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-sm text-navy-900/50">
                  Trust Layer Technologies • Building trusted digital solutions
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}