import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import SectionTitle from './SectionTitle'

export default function BlogSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Latest Insights" subtitle="Blog">
          Stay updated with our latest news and insights.
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-navy-900/70 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">By {post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border-2 border-navy-900 text-navy-900 rounded-full font-medium hover:bg-navy-900 hover:text-white transition-all"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}