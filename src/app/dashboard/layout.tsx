import { DashboardSidebar } from '@/components/dashboard'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/auth-provider'
import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="p-2 flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  )
}
