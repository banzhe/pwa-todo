import {
  CalendarRange,
  Columns,
  Grid2x2,
  Grid3x3,
  List,
  Plus,
} from 'lucide-react'
import { AddEventDialog } from '@/calendar/components/dialogs/add-event-dialog'
import { DateNavigator } from '@/calendar/components/header/date-navigator'
import { TodayButton } from '@/calendar/components/header/today-button'
import { UserSelect } from '@/calendar/components/header/user-select'
import type { IEvent } from '@/calendar/interfaces'
import type { TCalendarView } from '@/calendar/types'
import { Button } from '@/components/ui/button'

interface IProps {
  view: TCalendarView
  events: IEvent[]
  onViewChange: (view: TCalendarView) => void
}

export function CalendarHeader({ view, events, onViewChange }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              aria-label="View by day"
              size="icon"
              variant={view === 'day' ? 'default' : 'outline'}
              className="rounded-r-none [&_svg]:size-5"
              onClick={() => onViewChange('day')}
            >
              <List strokeWidth={1.8} />
            </Button>

            <Button
              aria-label="View by week"
              size="icon"
              variant={view === 'week' ? 'default' : 'outline'}
              className="-ml-px rounded-none [&_svg]:size-5"
              onClick={() => onViewChange('week')}
            >
              <Columns strokeWidth={1.8} />
            </Button>

            <Button
              aria-label="View by month"
              size="icon"
              variant={view === 'month' ? 'default' : 'outline'}
              className="-ml-px rounded-none [&_svg]:size-5"
              onClick={() => onViewChange('month')}
            >
              <Grid2x2 strokeWidth={1.8} />
            </Button>

            <Button
              aria-label="View by year"
              size="icon"
              variant={view === 'year' ? 'default' : 'outline'}
              className="-ml-px rounded-none [&_svg]:size-5"
              onClick={() => onViewChange('year')}
            >
              <Grid3x3 strokeWidth={1.8} />
            </Button>

            <Button
              aria-label="View by agenda"
              size="icon"
              variant={view === 'agenda' ? 'default' : 'outline'}
              className="-ml-px rounded-l-none [&_svg]:size-5"
              onClick={() => onViewChange('agenda')}
            >
              <CalendarRange strokeWidth={1.8} />
            </Button>
          </div>

          <UserSelect />
        </div>

        <AddEventDialog>
          <Button className="w-full sm:w-auto">
            <Plus />
            Add Event
          </Button>
        </AddEventDialog>
      </div>
    </div>
  )
}
