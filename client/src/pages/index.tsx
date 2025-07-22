import { useRequest } from 'ahooks'
import { useState } from 'react'
import type { Task } from 'shared'
import FilterSideBar from '@/components/FilterSideBar'
import TaskDetail from '@/components/task/TaskDetail'
import TaskList from '@/components/task/TaskList'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createTask, getAllTasks } from '../api/tasks'
import QuickCreateTaskInput from '../components/task/QuickCreateTaskInput'

export default function Home() {
  const {
    data: tasks,
    mutate: updateTasks,
    run: refetchTasks,
  } = useRequest(getAllTasks)
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

  function handleFilterChange(filter: 'all' | 'today') {
    refetchTasks({
      filterDate: filter === 'today' ? new Date() : undefined,
    })
  }

  return (
    <SidebarProvider>
      <FilterSideBar onFilterChange={handleFilterChange} />
      <SidebarInset>
        <div className="flex h-screen">
          <div className="flex flex-col gap-2 w-sm p-4 border-r">
            <QuickCreateTaskInput onSubmit={handleCreateTask} />
            <TaskList
              tasks={tasks || []}
              selectedTaskId={selectedTask?.id}
              onTaskSelected={handleTaskSelected}
              onTaskDeleted={handleTaskDeleted}
              onTaskUpdated={handleTaskUpdated}
            />
          </div>

          {selectedTask ? (
            <TaskDetail task={selectedTask} onTaskUpdated={handleTaskUpdated} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium">选择任务查看详情</p>
                <p className="text-sm">
                  从左侧列表中选择一个任务来查看和编辑其详细信息
                </p>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
