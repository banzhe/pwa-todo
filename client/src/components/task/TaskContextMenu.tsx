import { Trash2, X } from 'lucide-react'
import type { Task } from 'shared'
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
  children: React.ReactNode
}

export default function TaskContextMenu({
  task,
  onDelete,
  onAbandon,
  children,
}: TaskContextMenuProps) {
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
      </ContextMenuContent>
    </ContextMenu>
  )
}
