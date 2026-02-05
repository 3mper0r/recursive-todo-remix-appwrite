import { Form, useActionData } from "@remix-run/react"
import React, { useState } from "react"

export const SignupForm: React.FC = () => {
  const actionData = useActionData<{ error?: string }>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [clientError, setClientError] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setClientError("")
    if (password !== confirmPassword) {
      e.preventDefault()
      setClientError("Passwords do not match")
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Create Account</h2>
      <Form method="post" onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: 6 }}
          />
        </div>

        {clientError && (
          <p style={{ color: "red", marginBottom: 10 }}>{clientError}</p>
        )}
        {actionData?.error && (
          <p style={{ color: "red", marginBottom: 10 }}>{actionData.error}</p>
        )}

        <button type="submit" style={{ padding: "8px 16px" }}>
          Sign Up
        </button>
      </Form>
    </div>
  )
}
