import { motion } from 'framer-motion'
import Link from 'next/link'
import { products } from '@/data/products'
import SectionTitle from './SectionTitle'

export default function Solutions() {
  const visibleProducts = products.filter((p) => p.visibility)

  return (
    <section id="solutions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Solutions you can rely on" subtitle="Our Solutions">
          Explore our current platforms built to deliver value and convenience.
        </SectionTitle>

        <div className="grid md:grid-cols-2 gap-8">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {product.category}
                    </span>

                    <h3 className="text-2xl font-bold text-navy-900 mt-3">
                      {product.name}
                    </h3>
                  </div>

                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-2xl">
                    {product.icon}
                  </div>
                </div>

                <p className="text-navy-900/70 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {product.features && (
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-navy-900/70"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={product.ctaLink}
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  {product.ctaText}

                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}