import { Settings, ShoppingBag, Users } from 'lucide-react'
import { TSidebarItem } from './sidebar.types'

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  { title: 'Товары', url: '/products', Icon: ShoppingBag },
  { title: 'Пользователи', url: '/users', Icon: Users },
  { title: 'Настройки', url: '/settings', Icon: Settings },
] as const
