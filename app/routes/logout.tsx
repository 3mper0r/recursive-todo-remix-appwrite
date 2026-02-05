import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { createAppwriteServerClient } from "../lib/appwrite.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { account } = createAppwriteServerClient(request)
  
  try {
    // Delete the current session
    await account.deleteSession("current")
  } catch (error) {
    // If there's an error (e.g., no session), just continue
    console.error('Logout error:', error)
  }
  
  // Redirect to home and clear the cookie
  return redirect("/", {
    headers: {
      "Set-Cookie": "a_session_myappwriteprojectid=; Path=/; HttpOnly; Max-Age=0"
    }
  })
}