import { Client, Account } from "appwrite"

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('myappwriteprojectid')

export const account = new Account(client)
