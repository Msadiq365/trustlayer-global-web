import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    contacts: 0,
    emailsSent: 0,
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-8">Email Analytics</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-premium">
              <div className="text-3xl font-bold text-navy-900">{stats.totalSubscribers}</div>
              <div className="text-gray-500 text-sm">Newsletter Subscribers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-premium">
              <div className="text-3xl font-bold text-navy-900">{stats.contacts}</div>
              <div className="text-gray-500 text-sm">Contact Form Submissions</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-premium">
              <div className="text-3xl font-bold text-navy-900">{stats.emailsSent}</div>
              <div className="text-gray-500 text-sm">Total Emails Sent</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-premium mt-8">
            <h3 className="font-semibold text-navy-900 mb-4">Recent Activity</h3>
            <p className="text-gray-500 text-sm">Check Resend Dashboard for detailed analytics</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}