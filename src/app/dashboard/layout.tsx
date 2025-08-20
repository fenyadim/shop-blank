import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { DashboardHeader, DashboardSidebar } from '@/components/dashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/auth-provider'

export const metadata: Metadata = {
  title: 'Dashboard | Shop blank',
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="p-2 not-first:flex-1 grid grid-rows-[auto_1fr] gap-3">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  )
}
