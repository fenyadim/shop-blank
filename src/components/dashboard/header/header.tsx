import { SidebarTrigger } from '@/components/ui/sidebar'

interface DashboardHeaderProps {
  title: string
}

export const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <header className="flex gap-3 items-center">
      <SidebarTrigger />
      <h1>{title}</h1>
    </header>
  )
}
