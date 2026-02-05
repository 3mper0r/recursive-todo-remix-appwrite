import { RawTodoDocument } from "../types/todo"

export type Todo = {
  $id: string
  title: string
  completed: boolean
  parentId: string | null
  children?: Todo[]
}

export function buildTree(todos: Todo[]) {
  const map = new Map<string, Todo>()
  const roots: Todo[] = []

  todos.forEach(todo =>
    map.set(todo.$id, { ...todo, children: [] })
  )

  map.forEach(todo => {
    if (todo.parentId) {
      map.get(todo.parentId)?.children?.push(todo)
    } else {
      roots.push(todo)
    }
  })

  return roots
}


export function mapDocumentsToTodos(documents: RawTodoDocument[]): Todo[] {
  return documents.map(doc => ({
    $id: doc.$id,
    title: doc.title,
    completed: doc.completed,
    parentId: doc.parentId || null,
    children: [],
  }))
}
