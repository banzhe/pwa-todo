import type { TaskStatus } from '@shared/enums'

export type ApiResponse<T = unknown> = {
  message: string
  data?: T
  success: boolean
}

export type Task = {
  id: number
  title: string
  content: string
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
  sort: number
  startDate?: Date
  endDate?: Date
}
