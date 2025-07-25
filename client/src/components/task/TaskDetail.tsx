import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { type Task, TaskStatus } from 'shared'
import { updateTask } from '@/api/tasks'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface TaskDetailProps {
  task: Task
  onTaskUpdated: (task: Task) => void
}

export default function TaskDetail({ task, onTaskUpdated }: TaskDetailProps) {
  const [taskItem, setTaskItem] = useState(task)

  useEffect(() => {
    setTaskItem(task)
  }, [task])

  const { run: doUpdateTask } = useRequest(updateTask, {
    manual: true,
    debounceWait: 500,
  })

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTaskItem = { ...taskItem, title: e.target.value }
    setTaskItem(newTaskItem)
    doUpdateTask(newTaskItem)
    onTaskUpdated(newTaskItem)
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newTaskItem = { ...taskItem, content: e.target.value }
    setTaskItem(newTaskItem)
    doUpdateTask(newTaskItem)
    onTaskUpdated(newTaskItem)
  }

  function handleStatusChange(checked: boolean) {
    const newTaskItem = {
      ...taskItem,
      status: checked ? TaskStatus.COMPLETED : TaskStatus.IN_PROGRESS,
    }
    setTaskItem(newTaskItem)
    doUpdateTask(newTaskItem)
    onTaskUpdated(newTaskItem)
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center">
        <Checkbox
          checked={taskItem.status === TaskStatus.COMPLETED}
          onCheckedChange={handleStatusChange}
          className="size-5 cursor-pointer"
        />
        <Input
          className={cn(
            'border-none',
            'focus-visible:ring-0',
            'shadow-none',
            'focus-visible:ring-offset-0',
            'font-bold',
            'text-xl!',
          )}
          value={taskItem.title}
          onChange={handleTitleChange}
        />
      </div>

      <Textarea
        className={cn(
          'border-none',
          'focus-visible:ring-0',
          'shadow-none',
          'focus-visible:ring-offset-0',
          'resize-none',
          'flex-1',
          'p-0',
          'mt-2',
          'text-lg!',
        )}
        value={taskItem.content}
        onChange={handleContentChange}
      />
    </div>
  )
}
