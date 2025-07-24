'use client'

import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  icon?: React.ReactNode
  endThreshold?: Date
  startThreshold?: Date
}

export default function DatePicker({
  date,
  setDate,
  icon,
  endThreshold,
  startThreshold,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-48 justify-between font-normal"
        >
          {icon}
          {date ? date.toLocaleDateString() : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          disabled={disabledDays}
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
