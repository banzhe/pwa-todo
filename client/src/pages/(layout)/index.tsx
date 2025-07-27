import FilterSideBar from '@/components/FilterSideBar'
import TaskDetail from '@/components/task/TaskDetail'
import TaskList from '@/components/task/TaskList'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useTaskContext } from '@/context/TaskContext'
import QuickCreateTaskInput from '../../components/task/QuickCreateTaskInput'

export default function Home() {
  const { selectedTask, createTask, setFilter } = useTaskContext()

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={12} maxSize={18}>
        <FilterSideBar onFilterChange={setFilter} />
      </ResizablePanel>
      <ResizableHandle></ResizableHandle>
      <ResizablePanel defaultSize={16} maxSize={20}>
        <div className="flex h-screen flex-1">
          <div className="flex flex-col gap-2 w-sm p-4">
            <QuickCreateTaskInput onSubmit={createTask} />
            <TaskList />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle></ResizableHandle>
      <ResizablePanel>
        {selectedTask ? (
          <TaskDetail />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">选择任务查看详情</p>
              <p className="text-sm">
                从左侧列表中选择一个任务来查看和编辑其详细信息
              </p>
            </div>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
