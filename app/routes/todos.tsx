import { useLoaderData, useFetcher, Form } from "@remix-run/react"
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, json } from "@remix-run/node"
import { Query, ID } from "appwrite"
import { createAppwriteServerClient } from "../lib/appwrite.server"
import { buildTree, mapDocumentsToTodos } from "../utils/totdoTree"
import { TodoList, Todo } from "../components/TodoList"
import { useState } from "react"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { account, databases } = createAppwriteServerClient(request)
  
  try {
    const user = await account.get()
    
    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TODOS_COLLECTION_ID!,
      [Query.equal("userId", user.$id)]
    )
    
    const todos = buildTree(
      mapDocumentsToTodos(result.documents as any)
    )
    
    return json({ todos, user })
  } catch (error) {
    console.error('Todos loader - auth failed:', error)
    return redirect("/")
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { account, databases } = createAppwriteServerClient(request)
  
  try {
    const user = await account.get()
    const formData = await request.formData()
    const intent = formData.get("intent")
    
    if (intent === "create") {
      const title = formData.get("title") as string
      const parentId = formData.get("parentId") as string | null
      
      if (!title) {
        return json({ error: "Title is required" }, { status: 400 })
      }
      
      await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_TODOS_COLLECTION_ID!,
        ID.unique(),
        {
          userId: user.$id,
          title,
          completed: false,
          parentId: parentId || null,
        }
      )
      
      return json({ success: true })
    }
    
    if (intent === "toggle") {
      const todoId = formData.get("todoId") as string
      const completed = formData.get("completed") === "true"
      
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_TODOS_COLLECTION_ID!,
        todoId,
        {
          completed: !completed,
        }
      )
      
      return json({ success: true })
    }
    
    if (intent === "delete") {
      const todoId = formData.get("todoId") as string
      
      await databases.deleteDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_TODOS_COLLECTION_ID!,
        todoId
      )
      
      return json({ success: true })
    }
    
    return json({ error: "Invalid intent" }, { status: 400 })
  } catch (error) {
    console.error('Action error:', error)
    return json({ error: "Action failed" }, { status: 500 })
  }
}

export default function TodosPage() {
  const { todos, user } = useLoaderData<typeof loader>()
  
  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>Recursive Todos 🔄</h1>
        <div style={{ fontSize: 14, color: "#666" }}>
          {user.email}
          {" · "}
          <a href="/logout" style={{ color: "#666" }}>Logout</a>
        </div>
      </div>
      
      {/* Create Top-Level Todo Form */}
      <Form method="post" style={{ marginBottom: 30 }}>
        <input type="hidden" name="intent" value="create" />
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            name="title"
            placeholder="Add a new task..."
            required
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: 16,
              border: "2px solid #e0e0e0",
              borderRadius: 8,
              outline: "none",
            }}
            onFocus={(e) => e.target.style.borderColor = "#4CAF50"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              fontSize: 16,
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Add Task
          </button>
        </div>
      </Form>
      
      {/* Todo List */}
      {todos.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: 60, 
          color: "#999",
          fontSize: 18 
        }}>
          No tasks yet. Create your first one above! 🎯
          <div style={{ fontSize: 14, marginTop: 10, color: "#bbb" }}>
            Tip: You can add sub-tasks to any task!
          </div>
        </div>
      ) : (
        <TodoListComponent todos={todos} />
      )}
    </div>
  )
}

function TodoListComponent({ todos }: { todos: Todo[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.$id} todo={todo} />
      ))}
    </div>
  )
}

function TodoItem({ todo, level = 0 }: { todo: Todo; level?: number }) {
  const fetcher = useFetcher()
  const [showAddSubtask, setShowAddSubtask] = useState(false)
  const [showChildren, setShowChildren] = useState(true)
  
  const isDeleting = fetcher.formData?.get("todoId") === todo.$id && fetcher.formData?.get("intent") === "delete"
  const isToggling = fetcher.formData?.get("todoId") === todo.$id && fetcher.formData?.get("intent") === "toggle"
  
  if (isDeleting) {
    return null
  }
  
  const completed = isToggling ? !todo.completed : todo.completed
  const hasChildren = todo.children && todo.children.length > 0
  
  return (
    <div style={{ marginLeft: level * 30 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          backgroundColor: completed ? "#f5f5f5" : "white",
          border: "2px solid #e0e0e0",
          borderRadius: 8,
          transition: "all 0.2s",
        }}
      >
        {/* Expand/Collapse button (only if has children) */}
        {hasChildren && (
          <button
            onClick={() => setShowChildren(!showChildren)}
            style={{
              width: 20,
              height: 20,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              padding: 0,
              color: "#666",
            }}
          >
            {showChildren ? "▼" : "▶"}
          </button>
        )}
        
        {/* Spacer if no children */}
        {!hasChildren && <div style={{ width: 20 }} />}
        
        {/* Checkbox */}
        <fetcher.Form method="post" style={{ margin: 0 }}>
          <input type="hidden" name="intent" value="toggle" />
          <input type="hidden" name="todoId" value={todo.$id} />
          <input type="hidden" name="completed" value={String(todo.completed)} />
          <button
            type="submit"
            style={{
              width: 24,
              height: 24,
              border: "2px solid #4CAF50",
              borderRadius: 6,
              backgroundColor: completed ? "#4CAF50" : "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              transition: "all 0.2s",
            }}
          >
            {completed && (
              <span style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>✓</span>
            )}
          </button>
        </fetcher.Form>
        
        {/* Todo Title */}
        <span
          style={{
            flex: 1,
            fontSize: 16,
            textDecoration: completed ? "line-through" : "none",
            color: completed ? "#999" : "#333",
            transition: "all 0.2s",
          }}
        >
          {todo.title}
        </span>
        
        {/* Add Sub-task Button */}
        <button
          onClick={() => setShowAddSubtask(!showAddSubtask)}
          style={{
            padding: "6px 12px",
            fontSize: 14,
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1976D2"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2196F3"}
        >
          + Sub-task
        </button>
        
        {/* Delete Button */}
        <fetcher.Form method="post" style={{ margin: 0 }}>
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="todoId" value={todo.$id} />
          <button
            type="submit"
            style={{
              padding: "6px 12px",
              fontSize: 14,
              backgroundColor: "#ff5252",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ff1744"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff5252"}
          >
            Delete
          </button>
        </fetcher.Form>
      </div>
      
      {/* Add Sub-task Form */}
      {showAddSubtask && (
        <Form 
          method="post" 
          style={{ marginTop: 8, marginLeft: 50 }}
          onSubmit={() => setShowAddSubtask(false)}
        >
          <input type="hidden" name="intent" value="create" />
          <input type="hidden" name="parentId" value={todo.$id} />
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              name="title"
              placeholder="Add a sub-task..."
              required
              autoFocus
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: 14,
                border: "2px solid #2196F3",
                borderRadius: 6,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                fontSize: 14,
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddSubtask(false)}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                backgroundColor: "#999",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
      
      {/* Render child todos recursively */}
      {showChildren && hasChildren && (
        <div style={{ marginTop: 8 }}>
          {todo.children!.map((childTodo) => (
            <TodoItem key={childTodo.$id} todo={childTodo} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}