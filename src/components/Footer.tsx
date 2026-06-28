import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import NewsletterSignup from './NewsletterSignup'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">TRUST</span>
              <span className="text-xl font-bold text-primary-light">LAYER</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Building trusted digital solutions that simplify how people and businesses
              interact with technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Trust Data</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Trust Pay</Link></li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>

            {/* Newsletter Signup */}
            <NewsletterSignup />
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center">
          © 2026 Trust Layer Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  )
}