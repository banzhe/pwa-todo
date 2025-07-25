import type { Task } from 'shared'
import { TaskStatus } from 'shared'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { ScrollArea } from '../ui/scroll-area'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  selectedTaskId?: number
  onTaskSelected: (taskId: number) => void
  onTaskDeleted: (taskId: number) => void
  onTaskUpdated: (task: Task) => void
}

export default function TaskList({
  tasks,
  selectedTaskId,
  onTaskSelected,
  onTaskDeleted,
  onTaskUpdated,
}: TaskListProps) {
  // 根据状态分组任务
  const inProgressTasks = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS,
  )
  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.COMPLETED,
  )
  const cancelledTasks = tasks.filter(
    (task) => task.status === TaskStatus.CANCELLED,
  )

  const renderTaskGroup = (taskList: Task[], title: string, count: number) => (
    <AccordionItem value={title.toLowerCase()}>
      <AccordionTrigger className="text-sm font-bold hover:no-underline cursor-pointer">
        {title} ({count})
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2 ">
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTaskId === task.id}
              onTaskSelected={onTaskSelected}
              onTaskDeleted={onTaskDeleted}
              onTaskUpdated={onTaskUpdated}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )

  return (
    <ScrollArea
      onContextMenu={(e) => {
        e.preventDefault()
      }}
      className="h-[calc(100%-45px)] pr-[12px] mr-[-12px]"
    >
      <Accordion
        type="multiple"
        className="flex-1 overflow-auto overflow-x-hidden"
      >
        {renderTaskGroup(inProgressTasks, '进行中', inProgressTasks.length)}
        {renderTaskGroup(completedTasks, '已完成', completedTasks.length)}
        {renderTaskGroup(cancelledTasks, '已取消', cancelledTasks.length)}
      </Accordion>
    </ScrollArea>
  )
}
