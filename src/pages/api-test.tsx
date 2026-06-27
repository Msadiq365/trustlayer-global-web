import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { checkHealth } from '@/utils/api'

export default function APITest() {
  const [status, setStatus] = useState<'testing' | 'online' | 'offline'>('testing')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const testAPI = async () => {
      try {
        const isHealthy = await checkHealth()
        if (isHealthy) {
          setStatus('online')
          setMessage('✅ API is online!')
        } else {
          setStatus('offline')
          setMessage('❌ API is offline - Make sure to run: python main_sqlite.py')
        }
      } catch (error) {
        setStatus('offline')
        setMessage('❌ Cannot connect to API - Make sure it\'s running on port 8000')
      }
    }
    
    testAPI()
  }, [])

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="bg-white p-8 rounded-2xl shadow-premium max-w-md w-full">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">API Connection Test</h1>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              status === 'testing' ? 'bg-yellow-50 text-yellow-700' :
              status === 'online' ? 'bg-green-50 text-green-700' :
              'bg-red-50 text-red-700'
            }`}>
              <p className="font-medium">
                {status === 'testing' ? '⏳ Testing connection...' : message}
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>API URL: http://localhost:8000</p>
              <p className="mt-1">Status: {status}</p>
            </div>
            
            {status === 'offline' && (
              <div className="bg-gray-50 p-4 rounded-xl text-sm">
                <p className="font-medium text-navy-900">To fix this:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-600">
                  <li>Open a new terminal</li>
                  <li>Run: <code className="bg-gray-200 px-2 py-0.5 rounded">cd api</code></li>
                  <li>Run: <code className="bg-gray-200 px-2 py-0.5 rounded">python main_sqlite.py</code></li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}