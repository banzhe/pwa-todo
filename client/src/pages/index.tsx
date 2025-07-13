import { useRequest } from 'ahooks'
import { useState } from 'react'
import type { Task } from 'shared'
import FilterSideBar from '@/components/FilterSideBar'
import TaskDetail from '@/components/task/TaskDetail'
import TaskList from '@/components/task/TaskList'
import { SidebarProvider } from '@/components/ui/sidebar'
import { createTask, getAllTasks } from '../api/tasks'
import QuickCreateTaskInput from '../components/task/QuickCreateTaskInput'

export default function Home() {
  const { data: tasks, mutate: updateTasks } = useRequest(getAllTasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const { run: doCreateTask } = useRequest(createTask, {
    manual: true,
    onSuccess: (data) => {
      if (!data) return

      updateTasks((oldTaskList) => {
        if (oldTaskList) {
          return [data, ...oldTaskList]
        }
        return [data]
      })
    },
  })

  function handleCreateTask(title: string) {
    const sort = tasks?.length ?? 0
    doCreateTask({
      title,
      sort,
    })
  }

  function handleTaskDeleted(taskId: number) {
    updateTasks((oldTaskList) => {
      if (oldTaskList) {
        return oldTaskList.filter((task) => task.id !== taskId)
      }
      return oldTaskList
    })
  }

  function handleTaskSelected(taskId: number) {
    setSelectedTask(tasks?.find((task) => task.id === taskId) ?? null)
  }

  function handleTaskUpdated(task: Task) {
    updateTasks((oldTaskList) => {
      return oldTaskList?.map((t) => (t.id === task.id ? task : t))
    })

    if (selectedTask?.id === task.id) {
      setSelectedTask(task)
    }
  }

  return (
    <SidebarProvider>
      <FilterSideBar></FilterSideBar>
      <div className="flex justify-center h-full">
        <div className="flex flex-col gap-2 w-sm">
          <QuickCreateTaskInput onSubmit={handleCreateTask} />
          <TaskList
            tasks={tasks || []}
            selectedTaskId={selectedTask?.id}
            onTaskSelected={handleTaskSelected}
            onTaskDeleted={handleTaskDeleted}
            onTaskUpdated={handleTaskUpdated}
          />
        </div>

        {selectedTask && (
          <TaskDetail task={selectedTask} onTaskUpdated={handleTaskUpdated} />
        )}
      </div>
    </SidebarProvider>
  )
}
