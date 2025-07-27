import { type Task, TaskStatus } from 'shared'
import { useTaskContext } from '@/context/TaskContext'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import TaskContextMenu from './TaskContextMenu'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { selectedTask, selectTask, updateTask } = useTaskContext()
  const isChecked = task.status === TaskStatus.COMPLETED

  function handleClick() {
    selectTask(task.id)
  }

  async function handleCheckedChange(checked: boolean) {
    updateTask({
      ...task,
      status: checked ? TaskStatus.COMPLETED : TaskStatus.IN_PROGRESS,
    })
  }

  return (
    <TaskContextMenu task={task}>
      <div
        className={cn(
          'flex items-center gap-2 p-2 hover:bg-muted rounded-md',
          selectedTask?.id === task.id && 'bg-muted',
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
