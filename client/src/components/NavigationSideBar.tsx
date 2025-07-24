import { Calendar, ListTodo } from 'lucide-react'
import { useLocation } from 'react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from '@/router'

export default function NavigationSideBar() {
  const location = useLocation()
  return (
    <Sidebar collapsible="none" className="w-14 h-screen">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="h-14">
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/'}
              tooltip="任务"
              className="h-full w-full"
            >
              <Link to="/" className="flex justify-center items-center">
                <ListTodo className="!w-6 !h-6" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="h-14">
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/calendar'}
              tooltip="日历"
              className="h-full w-full"
            >
              <Link to="/calendar" className="flex justify-center items-center">
                <Calendar className="!w-6 !h-6" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
