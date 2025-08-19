import { PropsWithChildren } from 'react'

import { DashboardSidebar } from '@/components/dashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/auth-provider'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="p-2 not-first:flex-1 grid grid-rows-[auto_1fr] gap-3">
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  )
}
