import Layout from '@/components/Layout'
import { motion } from 'framer-motion'

export default function TermsOfService() {
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
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-sm text-navy-900/60 mb-8">Last updated: March 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-premium p-8 md:p-12 space-y-6"
          >
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-navy-900/70 leading-relaxed">
                By using our website and services, you agree to these Terms of Service. 
                If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Our Services</h2>
              <p className="text-navy-900/70 leading-relaxed">
                Trust Layer Technologies provides digital solutions including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-navy-900/70">
                <li>VTU (Virtual Top-Up) services through DataFlow</li>
                <li>Digital payment solutions through Trust Pay</li>
                <li>Other digital platforms and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. User Responsibilities</h2>
              <p className="text-navy-900/70 leading-relaxed">
                You agree to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-navy-900/70">
                <li>Provide accurate and complete information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use our services in any way that could damage our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Intellectual Property</h2>
              <p className="text-navy-900/70 leading-relaxed">
                All content, trademarks, and intellectual property on our website are the 
                property of Trust Layer Technologies. You may not reproduce, distribute, 
                or create derivative works without our express permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-navy-900/70 leading-relaxed">
                Our services are provided "as is" without warranties of any kind. We are not 
                liable for any damages arising from the use of our services to the maximum 
                extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Termination</h2>
              <p className="text-navy-900/70 leading-relaxed">
                We reserve the right to terminate or suspend access to our services immediately, 
                without prior notice, for any reason, including without limitation if you 
                breach these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Changes to Terms</h2>
              <p className="text-navy-900/70 leading-relaxed">
                We reserve the right to update these Terms of Service at any time. We will 
                notify you of any changes by posting the new Terms on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Contact Us</h2>
              <p className="text-navy-900/70 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-navy-900 font-medium mt-2">contact@trustlayerglobal.com</p>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-sm text-navy-900/50">
                Trust Layer Technologies • Building trusted digital solutions
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}