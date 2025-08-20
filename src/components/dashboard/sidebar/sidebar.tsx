'use client'

import { Store } from 'lucide-react'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { routeConfig } from '@/config/route'
import { useUser } from '@/providers/auth-provider'

import { UserBlock } from '../user-block/user-block'
import { SIDEBAR_ITEMS } from './sidebar.constants'

export const DashboardSidebar = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return <p>Loading...</p>

  if (!user) return null

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={routeConfig.home()}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Вернуться в магазин</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map(({ title, url, Icon, subItems }) => (
                <SidebarMenuItem key={title}>
                  {!subItems ? (
                    <SidebarMenuButton asChild>
                      <Link href={url ?? ''}>
                        {Icon && <Icon />}
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <>
                      <SidebarMenuButton>
                        {Icon && <Icon />}
                        <span>{title}</span>
                      </SidebarMenuButton>
                      {subItems.map(
                        ({
                          title: subItemTitle,
                          url: subItemUrl,
                          Icon: SubItemIcon,
                        }) => (
                          <SidebarMenuSub key={subItemTitle}>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItemUrl ?? ''}>
                                  {SubItemIcon && <SubItemIcon />}
                                  <span>{subItemTitle}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ),
                      )}
                    </>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserBlock user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
