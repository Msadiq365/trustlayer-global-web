import { useState } from 'react'
import { subscribeNewsletter } from '@/utils/api'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    // Make sure email is valid before sending
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('❌ Please enter a valid email address')
      setStatus('idle')
      return
    }

    console.log('📧 Subscribing email:', email) // Debug log
    
    const result = await subscribeNewsletter(email)
    console.log('📥 Result:', result) // Debug log
    
    if (result.success) {
      setStatus('success')
      setMessage('✅ Subscribed successfully!')
      setEmail('')
    } else if (result.data?.status === 'exists') {
      setStatus('error')
      setMessage('📧 This email is already subscribed.')
    } else {
      setStatus('error')
      setMessage(`❌ ${result.error || 'Something went wrong. Please try again.'}`)
    }
  }

  return (
    <div className="mt-6">
      <h4 className="text-white font-semibold mb-3">Subscribe to our newsletter</h4>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-light"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  )
}