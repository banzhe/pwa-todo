import { createContext, useContext } from 'react'
import type { Task } from 'shared'

export interface TaskContextType {
  tasks: Task[]
  selectedTask: Task | null
  loading: boolean
  filter: {
    period: 'all' | 'today'
  }
  createTask: (title: string) => void
  updateTask: (task: Task) => void
  deleteTask: (id: number) => void
  selectTask: (id: number) => void
  setFilter: (filter: { period: 'all' | 'today' }) => void
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  selectedTask: null,
  loading: false,
  filter: {
    period: 'all',
  },
  createTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  selectTask: () => {},
  setFilter: () => {},
})

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
