import { useRequest } from 'ahooks'
import { useState } from 'react'
import type { Task } from 'shared'
import { createTask, deleteTask, getAllTasks, updateTask } from '@/api/tasks'
import { TaskContext, type TaskContextType } from './TaskContext'

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<{
    period: 'all' | 'today'
  }>({
    period: 'all',
  })

  const {
    data: tasks = [],
    mutate: mutateTasks,
    loading,
    run: refetchTasks,
  } = useRequest(getAllTasks)

  const { run: doCreateTask } = useRequest(createTask, {
    manual: true,
    onSuccess: (result) => {
      if (!result) return

      mutateTasks((prev) => {
        return [...(prev || []), result]
      })
    },
  })

  const { run: doDeleteTask } = useRequest(deleteTask, {
    manual: true,
    onSuccess: () => {},
  })

  // TODO: debounce need to be improved
  const { run: doUpdateTask } = useRequest(updateTask, {
    manual: true,
    onSuccess: () => {},
    debounceWait: 500,
  })

  function createTaskHandler(title: string) {
    const sort = tasks.length + 1
    doCreateTask({
      title,
      sort,
    })
  }

  function updateTaskHandler(task: Task) {
    if (task.id === selectedTask?.id) {
      setSelectedTask(task)
    }
    doUpdateTask(task)
    mutateTasks((prev) => {
      return prev?.map((t) => (t.id === task.id ? task : t))
    })
  }

  function deleteTaskHandler(id: number) {
    doDeleteTask(id)
    mutateTasks((prev) => {
      return prev?.filter((t) => t.id !== id)
    })
  }

  function selectTaskHandler(id: number) {
    setSelectedTask(tasks.find((t) => t.id === id) || null)
  }

  function setFilterHandler(filter: { period: 'all' | 'today' }) {
    setFilter(filter)
    refetchTasks({
      filterDate: filter.period === 'today' ? new Date() : undefined,
    })
    setSelectedTask(null)
  }

  const value: TaskContextType = {
    tasks,
    loading,
    filter,
    createTask: createTaskHandler,
    updateTask: updateTaskHandler,
    deleteTask: deleteTaskHandler,
    selectedTask,
    selectTask: selectTaskHandler,
    setFilter: setFilterHandler,
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
