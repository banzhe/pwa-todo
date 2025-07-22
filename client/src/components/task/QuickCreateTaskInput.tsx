import { useState } from 'react'
import { Input } from '../ui/input'

interface QuickCreateTaskInputProps {
  onSubmit: (title: string) => void
}

export default function QuickCreateTaskInput({
  onSubmit,
}: QuickCreateTaskInputProps) {
  const [title, setTitle] = useState('')

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return

    if (title.trim()) {
      onSubmit(title)
      setTitle('')
    }
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
