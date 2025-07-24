import { Calendar, ListTodo } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface FilterSideBarProps {
  onFilterChange: (filter: 'all' | 'today') => void
}

export default function FilterSideBar({ onFilterChange }: FilterSideBarProps) {
  const [filter, setFilter] = useState<'all' | 'today'>('all')

  function handleFilterChange(filter: 'all' | 'today') {
    setFilter(filter)
    onFilterChange(filter)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <Button
        variant={filter === 'all' ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start text-lg h-12',
          filter === 'all' && 'bg-muted',
          'overflow-hidden',
        )}
        onClick={() => handleFilterChange('all')}
      >
        <ListTodo className="w-5 h-5" />
        全部
      </Button>
      <Button
        variant={filter === 'today' ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start text-lg h-12',
          filter === 'today' && 'bg-muted',
          'overflow-hidden',
        )}
        onClick={() => handleFilterChange('today')}
      >
        <Calendar className="w-5 h-5" />
        今天
      </Button>
    </div>
  )
}
