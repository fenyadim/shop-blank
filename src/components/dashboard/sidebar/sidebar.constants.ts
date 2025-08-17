import { routeConfig } from '@/config/route'
import { Settings, ShoppingBag, Users } from 'lucide-react'
import { TSidebarItem } from './sidebar.types'

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  { title: 'Товары', url: routeConfig.products(), Icon: ShoppingBag },
  { title: 'Пользователи', url: routeConfig.users(), Icon: Users },
  { title: 'Настройки', url: routeConfig.settings(), Icon: Settings },
] as const
