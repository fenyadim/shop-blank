'use client'

import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { TDashboardRoute, dashboardTitles } from '@/config/route'

export const DashboardHeader = () => {
  const pathname = usePathname() as TDashboardRoute

  return (
    <header className="flex gap-2 h-full items-center border-b-1 pb-2">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <h1 className="ml-2">{dashboardTitles[pathname]}</h1>
    </header>
  )
}
