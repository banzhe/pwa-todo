import { Calendar1 } from 'lucide-react'
import { useCallback } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from './ui/context-menu'

interface SelectDateButtonProps {
  label: string
  value: Date | undefined
  endThreshold?: Date
  startThreshold?: Date
  onChange: (date: Date | undefined) => void
}

export function SelectDateButtonSubMenu({
  label,
  value,
  onChange,
  endThreshold,
  startThreshold,
}: SelectDateButtonProps) {
  function formatDate(date: Date) {
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
  }

  const disabledDays = useCallback(
    (date: Date) => {
      if (startThreshold && endThreshold) {
        return date < startThreshold || date > endThreshold
      }
      if (startThreshold) {
        return date < startThreshold
      }
      if (endThreshold) {
        return date > endThreshold
      }
      return false
    },
    [startThreshold, endThreshold],
  )

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Calendar1 className="h-4 w-4 mr-2" />
            {label}
          </div>
          {value && (
            <div className="text-muted-foreground justify-center flex items-center text-sm">
              {formatDate(value)}
            </div>
          )}
        </div>
      </ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabledDays}
        />
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}
