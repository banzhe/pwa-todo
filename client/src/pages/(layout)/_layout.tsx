import { Outlet } from 'react-router'
import NavigationSideBar from '@/components/NavigationSideBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TaskProvider } from '@/context/TaskProvider'

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <NavigationSideBar />
        <SidebarInset>
          <TaskProvider>
            <Outlet />
          </TaskProvider>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
