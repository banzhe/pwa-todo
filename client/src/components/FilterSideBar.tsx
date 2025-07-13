import { Calendar, ListTodo } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

export default function FilterSideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg p-4 h-12 flex items-center gap-3">
                  <ListTodo className="w-5 h-5" />
                  全部
                </SidebarMenuButton>
                <SidebarMenuButton className="text-lg p-4 h-12 flex items-center gap-3">
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
