import { Todo } from "./TodoList"
import { useFetcher } from "@remix-run/react"

export function TodoItem({ todo }: { todo: Todo }) {
  const fetcher = useFetcher()

  const handleToggle = () => {
    fetcher.submit(
      { id: todo.$id, completed: (!todo.completed).toString() },
      { action: "/todos/toggle", method: "post" }
    )
  }

  const handleDelete = () => {
    fetcher.submit({ id: todo.$id }, { action: "/todos/delete", method: "post" })
  }

  const handleAddSubtask = () => {
    const title = prompt("Sub-task title")
    if (title) {
      fetcher.submit({ parentId: todo.$id, title }, { action: "/todos/add", method: "post" })
    }
  }

  return (
    <div style={{ marginLeft: 20, marginBottom: 5 }}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span style={{ marginLeft: 8 }}>{todo.title}</span>

      <button style={{ marginLeft: 10 }} onClick={handleAddSubtask}>
        Add Sub-task
      </button>
      <button style={{ marginLeft: 5 }} onClick={handleDelete}>
        Delete
      </button>

      {todo.children?.map(child => (
        <TodoItem key={child.$id} todo={child} />
      ))}
    </div>
  )
}
