import { useState } from 'react'
import { ClientContainer } from '@/calendar/components/client-container'
import { CalendarProvider } from '@/calendar/contexts/calendar-context'
import type { TCalendarView } from '@/calendar/types'

export default function Calendar() {
  const [view, setView] = useState<TCalendarView>('month')
  return (
    <div>
      <CalendarProvider users={[]} events={[]}>
        <ClientContainer view={view} onViewChange={setView}></ClientContainer>
      </CalendarProvider>
    </div>
  )
}
