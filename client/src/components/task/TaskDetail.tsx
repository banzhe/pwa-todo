import { CalendarArrowDown, CalendarArrowUp } from 'lucide-react'
import { TaskStatus } from 'shared'
import { useTaskContext } from '@/context/TaskContext'
import { cn } from '@/lib/utils'
import DatePicker from '../DatePicker'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export default function TaskDetail() {
  const { updateTask, selectedTask } = useTaskContext()

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!selectedTask) return
    const newTaskItem = { ...selectedTask, title: e.target.value }
    updateTask(newTaskItem)
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!selectedTask) return
    const newTaskItem = { ...selectedTask, content: e.target.value }
    updateTask(newTaskItem)
  }

  function handleStatusChange(checked: boolean) {
    if (!selectedTask) return
    const newTaskItem = {
      ...selectedTask,
      status: checked ? TaskStatus.COMPLETED : TaskStatus.IN_PROGRESS,
    }
    updateTask(newTaskItem)
  }

  if (!selectedTask) return null

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex items-center">
        <Checkbox
          checked={selectedTask.status === TaskStatus.COMPLETED}
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
          value={selectedTask.title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex gap-2 mt-2 text-sm items-center">
        <div className="flex items-center gap-2">
          <DatePicker
            icon={<CalendarArrowUp className="w-4 h-4" />}
            date={selectedTask.startDate}
            setDate={(date) => {
              updateTask({ ...selectedTask, startDate: date })
            }}
            endThreshold={selectedTask.endDate}
          />
        </div>
        <div>-</div>
        <div className="flex items-center gap-2">
          <DatePicker
            icon={<CalendarArrowDown className="w-4 h-4" />}
            date={selectedTask.endDate}
            setDate={(date) => {
              updateTask({ ...selectedTask, endDate: date })
            }}
            startThreshold={selectedTask.startDate}
          />
        </div>
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
        value={selectedTask.content}
        onChange={handleContentChange}
      />
    </div>
  )
}
