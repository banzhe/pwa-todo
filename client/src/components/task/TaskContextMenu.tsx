import { Trash2, X } from 'lucide-react'
import { type Task, TaskStatus } from 'shared'
import { useTaskContext } from '@/context/TaskContext'
import { SelectDateButtonSubMenu } from '../SeletDateButtonSubMenu'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'

interface TaskContextMenuProps {
  task: Task
  children: React.ReactNode
}

export default function TaskContextMenu({
  task,
  children,
}: TaskContextMenuProps) {
  const { deleteTask, updateTask } = useTaskContext()

  function handleDelete() {
    deleteTask(task.id)
  }

  function handleAbandon() {
    // 放弃任务：将状态设置为已取消
    updateTask({ ...task, status: TaskStatus.CANCELLED })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={handleDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
          删除任务
        </ContextMenuItem>
        <ContextMenuItem
          onClick={handleAbandon}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4" />
          放弃任务
        </ContextMenuItem>
        <SelectDateButtonSubMenu
          label="开始时间"
          value={task.startDate}
          endThreshold={task.endDate}
          onChange={(date) => {
            updateTask({ ...task, startDate: date })
          }}
        />
        <SelectDateButtonSubMenu
          label="结束时间"
          value={task.endDate}
          startThreshold={task.startDate}
          onChange={(date) => {
            updateTask({ ...task, endDate: date })
          }}
        />
      </ContextMenuContent>
    </ContextMenu>
  )
}
