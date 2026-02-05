import { useActionData, Form, useNavigation } from "@remix-run/react"
import { ActionFunctionArgs, redirect, json } from "@remix-run/node"
import { createAppwriteSession } from "../lib/appwrite-auth.server"

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log('Login attempt for:', email)

  try {
    const sessionCookies = await createAppwriteSession(email, password)
    
    console.log('Session cookies received:', sessionCookies)
    
    if (!sessionCookies || sessionCookies.length === 0) {
      console.error('No session cookies received')
      return json({ error: "Login failed - no session created" }, { status: 500 })
    }
    
    console.log('Redirecting to /todos with cookies')
    
    // Create headers with all cookies
    const headers = new Headers()
    sessionCookies.forEach(cookie => {
      headers.append("Set-Cookie", cookie)
    })
    
    return redirect("/todos", { headers })
  } catch (error: any) {
    console.error('Login error:', error)
    return json({ error: "Invalid email or password" }, { status: 401 })
  }
}

export default function IndexPage() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
      <h1>Recursive To-Do App</h1>
      <p>Log in to see your todos</p>
      <Form method="post">
        <input name="email" type="email" required />
        <input name="password" type="password" required />
        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </Form>
      <p>
        No account? <a href="/signup">Sign up</a>
      </p>
    </div>
  )
}