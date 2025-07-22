import { Calendar, ListTodo } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex flex-col gap-2">
                <SidebarMenuButton
                  className={cn(
                    'text-lg p-4 h-12 flex items-center gap-3 cursor-pointer',
                    filter === 'all' && 'bg-muted',
                  )}
                  onClick={() => handleFilterChange('all')}
                >
                  <ListTodo className="w-5 h-5" />
                  全部
                </SidebarMenuButton>
                <SidebarMenuButton
                  className={cn(
                    'text-lg p-4 h-12 flex items-center gap-3 cursor-pointer',
                    filter === 'today' && 'bg-muted',
                  )}
                  onClick={() => handleFilterChange('today')}
                >
                  <Calendar className="w-5 h-5" />
                  今天
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
