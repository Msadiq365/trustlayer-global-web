import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

export default function Unsubscribe() {
  const router = useRouter()
  const { email } = router.query
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (email) {
      handleUnsubscribe(email as string)
    }
  }, [email])

  const handleUnsubscribe = async (email: string) => {
    setStatus('loading')
    try {
      // ✅ FIX: Use the full backend API URL
      const response = await fetch('https://trustlayers.com.ng/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setMessage('✅ You have been successfully unsubscribed.')
      } else {
        setStatus('error')
        setMessage(data.message || '❌ Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('❌ Network error. Please try again.')
    }
  }

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-20">
        <div className="bg-white p-8 rounded-2xl shadow-premium max-w-md w-full">
          <div className="text-center">
            {status === 'loading' && (
              <>
                <div className="text-4xl mb-4">⏳</div>
                <h2 className="text-2xl font-bold text-navy-900">Processing...</h2>
                <p className="text-gray-500 mt-2">Please wait while we process your request.</p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-navy-900">Unsubscribed</h2>
                <p className="text-gray-600 mt-2">{message}</p>
                <p className="text-gray-500 text-sm mt-4">
                  We're sorry to see you go. You can always subscribe again if you change your mind.
                </p>
                <a 
                  href="/"
                  className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Return to Home
                </a>
              </>
            )}
            
            {status === 'error' && (
              <>
                <div className="text-4xl mb-4">❌</div>
                <h2 className="text-2xl font-bold text-navy-900">Error</h2>
                <p className="text-gray-600 mt-2">{message}</p>
                <a 
                  href="/"
                  className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Return to Home
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}