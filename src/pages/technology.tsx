import Layout from '@/components/Layout'
import { motion } from 'framer-motion'

export default function Technology() {
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
              Our <span className="text-primary">Technology</span>
            </h1>
            <p className="text-lg text-navy-900/70 leading-relaxed">
              Our platforms are built using modern engineering practices focused on 
              performance, scalability, and security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend',
                icon: '🎨',
                technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
              },
              {
                title: 'Backend',
                icon: '⚙️',
                technologies: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'REST APIs'],
              },
              {
                title: 'Infrastructure',
                icon: '☁️',
                technologies: ['Vercel', 'Railway', 'Docker', 'Cloud Computing', 'CI/CD'],
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-premium transition-all"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.technologies.map((tech) => (
                    <li key={tech} className="text-sm text-navy-900/70 flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            Our Engineering Principles
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Security First', description: 'Every line of code is written with security in mind.', icon: '🔒' },
              { title: 'Scalable Architecture', description: 'Built to grow with your needs.', icon: '📈' },
              { title: 'Performance Optimized', description: 'Fast, responsive, and reliable.', icon: '⚡' },
              { title: 'User-Centric Design', description: 'Technology that solves real problems.', icon: '👤' },
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-premium transition-all"
              >
                <div className="text-3xl mb-3">{principle.icon}</div>
                <h4 className="font-semibold text-navy-900 mb-2">{principle.title}</h4>
                <p className="text-sm text-navy-900/60">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}