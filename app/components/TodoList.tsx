import React from "react"
import { TodoItem } from "../components/TodoItem"

export type Todo = {
  $id: string
  title: string
  completed: boolean
  parentId: string | null
  children?: Todo[]
}

type Props = {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {todos.map(todo => (
        <li key={todo.$id} style={{ marginBottom: "8px" }}>
          <TodoItem todo={todo} />
          {todo.children && todo.children.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              <TodoList todos={todo.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
