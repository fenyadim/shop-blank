import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface DashboardHeaderProps {
  title: string
}

export const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <header className="flex gap-1.5 h-full items-center border-b-1 pb-1.5">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <h1 className="ml-2">{title}</h1>
    </header>
  )
}
