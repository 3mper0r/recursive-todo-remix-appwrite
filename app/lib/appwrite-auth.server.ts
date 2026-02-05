export async function createAppwriteSession(email: string, password: string) {
  console.log('=== Creating session for:', email)
  
  const response = await fetch('https://cloud.appwrite.io/v1/account/sessions/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': 'myappwriteprojectid'
    },
    body: JSON.stringify({ email, password })
  })

  console.log('Session response status:', response.status)
  
  if (!response.ok) {
    const error = await response.text()
    console.error('Session creation failed:', error)
    throw new Error('Invalid credentials')
  }

  // The easiest way is to use the x-fallback-cookies header
  // This contains the cookie value that Appwrite expects
  const fallbackCookiesHeader = response.headers.get('x-fallback-cookies')
  
  if (fallbackCookiesHeader) {
    console.log('Using x-fallback-cookies header')
    const fallbackCookies = JSON.parse(fallbackCookiesHeader)
    const sessionValue = fallbackCookies[`a_session_myappwriteprojectid`]
    
    if (sessionValue) {
      const cookieName = `a_session_myappwriteprojectid`
      const cookie = `${cookieName}=${sessionValue}; Path=/; HttpOnly; SameSite=Lax`
      
      console.log('Created cookie from fallback:', cookie.substring(0, 100) + '...')
      console.log('===')
      
      return [cookie]
    }
  }
  
  // Fallback: parse from set-cookie header
  const setCookieHeader = response.headers.get('set-cookie')
  if (setCookieHeader) {
    console.log('Parsing set-cookie header')
    
    // Extract the cookie value (everything between = and the first ;)
    const match = setCookieHeader.match(/a_session_myappwriteprojectid=([^;]+)/)
    if (match) {
      const cookieValue = match[1]
      const cookieName = `a_session_myappwriteprojectid`
      
      // Recreate cookie for localhost (without domain restriction)
      const cookie = `${cookieName}=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`
      
      console.log('Created cookie from set-cookie:', cookie.substring(0, 100) + '...')
      console.log('===')
      
      return [cookie]
    }
  }
  
  console.error('Could not extract session cookie from response')
  throw new Error('Session created but could not extract cookie')
}

export async function createAppwriteAccount(email: string, password: string, userId: string) {
  console.log('=== Creating account for:', email)
  
  const response = await fetch('https://cloud.appwrite.io/v1/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': 'myappwriteprojectid'
    },
    body: JSON.stringify({
      userId,
      email,
      password
    })
  })

  console.log('Account creation status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Account creation failed:', errorText)
    
    let errorMessage = 'Account creation failed'
    try {
      const errorJson = JSON.parse(errorText)
      errorMessage = errorJson.message || errorMessage
    } catch (e) {
      errorMessage = errorText || errorMessage
    }
    
    throw new Error(errorMessage)
  }

  const accountData = await response.json()
  console.log('Account created:', accountData.$id)
  console.log('===')
  
  return accountData
}