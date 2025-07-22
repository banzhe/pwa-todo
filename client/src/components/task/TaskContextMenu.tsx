import { Trash2, X } from 'lucide-react'
import { useState } from 'react'
import type { Task } from 'shared'
import { SelectDateButtonSubMenu } from '../SeletDateButtonSubMenu'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'

interface TaskContextMenuProps {
  task: Task
  onDelete: (taskId: number) => void
  onAbandon: (taskId: number) => void
  onUpdate: (task: Task) => void
  children: React.ReactNode
}

export default function TaskContextMenu({
  task,
  onDelete,
  onAbandon,
  onUpdate,
  children,
}: TaskContextMenuProps) {
  const [taskState, setTaskState] = useState<Task>(task)
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => onDelete(task.id)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
          删除任务
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => onAbandon(task.id)}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4" />
          放弃任务
        </ContextMenuItem>
        <SelectDateButtonSubMenu
          label="开始时间"
          value={taskState.startDate}
          endThreshold={taskState.endDate}
          onChange={(date) => {
            const newTask = { ...taskState, startDate: date }
            setTaskState(newTask)
            onUpdate(newTask)
          }}
        />
        <SelectDateButtonSubMenu
          label="结束时间"
          value={taskState.endDate}
          startThreshold={taskState.startDate}
          onChange={(date) => {
            const newTask = { ...taskState, endDate: date }
            setTaskState(newTask)
            onUpdate(newTask)
          }}
        />
      </ContextMenuContent>
    </ContextMenu>
  )
}
