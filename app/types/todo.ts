import { Models } from "appwrite"

export type RawTodoDocument = Models.Document & {
  title: string
  completed: boolean
  parentId: string | null
}
