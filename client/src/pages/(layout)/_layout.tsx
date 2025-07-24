import { Outlet } from 'react-router'
import NavigationSideBar from '@/components/NavigationSideBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <NavigationSideBar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
