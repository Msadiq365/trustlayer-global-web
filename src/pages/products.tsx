import Layout from '@/components/Layout'
import { products } from '@/data/products'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Products() {
  const visibleProducts = products.filter((p) => p.visibility)

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
              Our <span className="text-primary">Products</span>
            </h1>
            <p className="text-lg text-navy-900/70 leading-relaxed">
              Explore our current platforms built to deliver value and convenience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-premium transition-all"
              >
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
                      <li key={i} className="flex items-center text-sm text-navy-900/70">
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
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}