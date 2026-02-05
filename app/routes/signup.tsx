import { useActionData, Form, useNavigation } from "@remix-run/react"
import { ActionFunctionArgs, redirect, json } from "@remix-run/node"
import { ID } from "appwrite"
import { createAppwriteAccount, createAppwriteSession } from "../lib/appwrite-auth.server"

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('!!! SIGNUP ACTION CALLED !!!')
  
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log('Form data:', { email, password: '***' })

    if (!email || !password) {
      return json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log('Step 1: Creating account...')
    
    try {
      // Create account
      await createAppwriteAccount(email, password, ID.unique())
      console.log('Step 2: Account created successfully')
    } catch (accountError: any) {
      console.error('Account creation error:', accountError)
      return json({ error: accountError.message || "Failed to create account" }, { status: 400 })
    }
    
    console.log('Step 3: Creating session...')
    
    let sessionCookies: string[]
    try {
      // Create session
      sessionCookies = await createAppwriteSession(email, password)
      console.log('Step 4: Session created, cookies:', sessionCookies)
    } catch (sessionError: any) {
      console.error('Session creation error:', sessionError)
      return json({ error: sessionError.message || "Account created but login failed" }, { status: 500 })
    }
    
    if (!sessionCookies || sessionCookies.length === 0) {
      console.error('No session cookies received')
      return json({ error: "Login failed - no session" }, { status: 500 })
    }
    
    console.log('Step 5: Redirecting to /todos')
    
    // Create headers with all cookies
    const headers = new Headers()
    sessionCookies.forEach(cookie => {
      headers.append("Set-Cookie", cookie)
    })
    
    return redirect("/todos", { headers })
  } catch (error: any) {
    console.error('Unexpected error in signup action:', error)
    console.error('Error stack:', error.stack)
    return json({ 
      error: error.message || "An unexpected error occurred" 
    }, { status: 500 })
  }
}

export default function SignupPage() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
      <h1>Create account</h1>
      <Form method="post">
        <input name="email" type="email" required placeholder="Email" />
        <br />
        <input name="password" type="password" required placeholder="Password" />
        <br />
        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </Form>
      <p>
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
  )
}