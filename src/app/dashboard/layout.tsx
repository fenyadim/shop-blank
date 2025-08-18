import { PropsWithChildren } from 'react'

import { DashboardSidebar } from '@/components/dashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/auth-provider'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="p-2 flex-1">{children}</main>
      </SidebarProvider>
    </AuthProvider>
  )
}
