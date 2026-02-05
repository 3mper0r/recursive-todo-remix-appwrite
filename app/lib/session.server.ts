import { createCookie } from "@remix-run/node"

export async function setAppwriteSessionCookie(headers: Headers, sessionCookie: string) {
  // Extract the session cookie value from Appwrite's set-cookie header
  headers.append("Set-Cookie", sessionCookie)
}