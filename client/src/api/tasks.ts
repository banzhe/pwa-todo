import type { Task } from 'shared'
import fetcher from '../utils/fetcher'

export async function getAllTasks() {
  return fetcher<Task[]>('/tasks/get_tasks', {
    method: 'GET',
  })
}

export async function updateTask(task: Partial<Task> & { id: number }) {
  return fetcher<Task>('/tasks/update_task', {
    method: 'POST',
    body: task,
  })
}

export async function createTask(task: Partial<Task>) {
  return fetcher<Task>('/tasks/create_task', {
    method: 'POST',
    body: task,
  })
}

export async function deleteTask(id: number) {
  return fetcher<void>('/tasks/delete_task', {
    method: 'POST',
    body: { id },
  })
}
