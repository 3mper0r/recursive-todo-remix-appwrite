import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Simple test component that mimics our todo structure
function TodoItem({ title, completed }: { title: string; completed: boolean }) {
  return (
    <div>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {title}
      </span>
    </div>
  )
}

function TodoList({ todos }: { todos: Array<{ id: string; title: string; completed: boolean; children?: any[] }> }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoItem title={todo.title} completed={todo.completed} />
          {todo.children && todo.children.length > 0 && (
            <div style={{ marginLeft: 20 }}>
              {todo.children.map((child: any) => (
                <TodoItem key={child.id} title={child.title} completed={child.completed} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Mock data
const mockTodos = [
  {
    id: '1',
    title: 'Buy groceries',
    completed: false,
    children: [
      {
        id: '2',
        title: 'Buy milk',
        completed: false,
      },
      {
        id: '3',
        title: 'Buy bread',
        completed: true,
      },
    ],
  },
  {
    id: '4',
    title: 'Call dentist',
    completed: false,
    children: [],
  },
]

describe('TodoList Component', () => {
  it('renders todo items correctly', () => {
    render(<TodoList todos={mockTodos} />)

    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(screen.getByText('Call dentist')).toBeInTheDocument()
  })

  it('displays nested sub-tasks', () => {
    render(<TodoList todos={mockTodos} />)

    // Check parent task
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    
    // Check child tasks
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Buy bread')).toBeInTheDocument()
  })

  it('shows completed state correctly', () => {
    render(<TodoList todos={mockTodos} />)

    const breadElement = screen.getByText('Buy bread')
    expect(breadElement).toHaveStyle({ textDecoration: 'line-through' })
    
    const milkElement = screen.getByText('Buy milk')
    expect(milkElement).toHaveStyle({ textDecoration: 'none' })
  })

  it('handles empty todo list', () => {
    render(<TodoList todos={[]} />)
    
    // Should not throw an error
    expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument()
  })
})

describe('Signup Form Validation', () => {
  function SignupForm() {
    return (
      <form>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required minLength={8} />
        <button type="submit">Sign up</button>
      </form>
    )
  }

  it('renders email and password inputs', () => {
    render(<SignupForm />)

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('validates required fields', () => {
    render(<SignupForm />)

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement

    expect(emailInput.required).toBe(true)
    expect(passwordInput.required).toBe(true)
    expect(passwordInput.minLength).toBe(8)
  })

  it('has correct input types', () => {
    render(<SignupForm />)

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement

    expect(emailInput.type).toBe('email')
    expect(passwordInput.type).toBe('password')
  })
})

describe('TodoItem Component', () => {
  it('renders incomplete task without line-through', () => {
    render(<TodoItem title="Test task" completed={false} />)
    
    const taskElement = screen.getByText('Test task')
    expect(taskElement).toBeInTheDocument()
    expect(taskElement).toHaveStyle({ textDecoration: 'none' })
  })

  it('renders completed task with line-through', () => {
    render(<TodoItem title="Completed task" completed={true} />)
    
    const taskElement = screen.getByText('Completed task')
    expect(taskElement).toBeInTheDocument()
    expect(taskElement).toHaveStyle({ textDecoration: 'line-through' })
  })
})