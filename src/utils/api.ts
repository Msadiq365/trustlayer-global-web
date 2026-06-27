const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export async function submitContact(data: ContactFormData) {
  try {
    const url = `${API_URL}/api/contact`
    console.log('📤 Sending to:', url)
    console.log('📦 Data:', data)

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })

    console.log('📥 Response status:', response.status)
    
    let result
    const text = await response.text()
    console.log('📄 Raw response:', text)
    
    try {
      result = JSON.parse(text)
    } catch (e) {
      result = { message: text || 'Unknown response' }
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: result.message || result.detail || `Server error: ${response.status}` 
      }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('❌ Error submitting contact:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Network error' 
    }
  }
}

// Fixed newsletter subscription
export async function subscribeNewsletter(email: string) {
  try {
    const url = `${API_URL}/api/newsletter`
    console.log('📤 Sending newsletter to:', url)
    console.log('📦 Email:', email)

    // Send as an object with email property
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email }), // <-- This is correct
    })

    console.log('📥 Response status:', response.status)
    
    let result
    const text = await response.text()
    console.log('📄 Raw response:', text)
    
    try {
      result = JSON.parse(text)
    } catch (e) {
      result = { message: text || 'Unknown response' }
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: result.message || result.detail || `Server error: ${response.status}` 
      }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('❌ Error subscribing:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Network error' 
    }
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
      mode: 'cors',
    })
    return response.ok
  } catch {
    return false
  }
}