import { useRequest } from 'ahooks'
import { type Task, TaskStatus } from 'shared'
import { deleteTask, updateTask } from '@/api/tasks'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import TaskContextMenu from './TaskContextMenu'

interface TaskItemProps {
  task: Task
  isSelected: boolean
  onTaskSelected: (taskId: number) => void
  onTaskDeleted: (taskId: number) => void
  onTaskUpdated: (task: Task) => void
}

export default function TaskItem({
  task,
  isSelected,
  onTaskSelected,
  onTaskDeleted,
  onTaskUpdated,
}: TaskItemProps) {
  const isChecked = task.status === TaskStatus.COMPLETED

  const { run: doUpdateTask } = useRequest(updateTask, {
    manual: true,
  })

  const { run: doDeleteTask } = useRequest(deleteTask, {
    manual: true,
    onSuccess: () => {
      onTaskDeleted(task.id)
    },
  })

  function handleClick() {
    onTaskSelected(task.id)
  }

  async function handleCheckedChange(checked: boolean) {
    doUpdateTask({
      id: task.id,
      status: checked ? TaskStatus.COMPLETED : TaskStatus.IN_PROGRESS,
    })
    onTaskUpdated({
      ...task,
      status: checked ? TaskStatus.COMPLETED : TaskStatus.IN_PROGRESS,
    })
  }

  function handleDelete() {
    doDeleteTask(task.id)
  }

  function handleAbandon() {
    // 放弃任务：将状态设置为已取消
    doUpdateTask({
      id: task.id,
      status: TaskStatus.CANCELLED,
    })
    onTaskUpdated({
      ...task,
      status: TaskStatus.CANCELLED,
    })
  }

  function handleUpdate(task: Task) {
    doUpdateTask(task)
    onTaskUpdated(task)
  }

  return (
    <TaskContextMenu
      task={task}
      onDelete={handleDelete}
      onAbandon={handleAbandon}
      onUpdate={handleUpdate}
    >
      <div
        className={cn(
          'flex items-center gap-2 p-2 hover:bg-muted rounded-md',
          isSelected && 'bg-muted',
        )}
        onClick={handleClick}
      >
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
          onClick={(e) => e.stopPropagation()}
          className="size-5 cursor-pointer"
        ></Checkbox>
        <Label
          className={cn(
            'line-clamp-1',
            isChecked && 'line-through text-muted-foreground',
            'text-lg',
          )}
        >
          {task.title}
        </Label>
      </div>
    </TaskContextMenu>
  )
}
