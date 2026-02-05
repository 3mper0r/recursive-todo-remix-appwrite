import { Client, Account, Databases } from "appwrite"

export function createAppwriteServerClient(request: Request) {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('myappwriteprojectid')
  
  const cookie = request.headers.get("cookie") || ""
  
  console.log('=== Server client - Incoming cookies:', cookie)
  
  if (cookie) {
    client.headers["cookie"] = cookie
  }
  
  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
  }
}