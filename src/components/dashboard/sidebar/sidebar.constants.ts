import { Settings, ShoppingBag, Users } from 'lucide-react'

import { routeConfig } from '@/config/route'

import { TSidebarItem } from './sidebar.types'

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  {
    title: 'Товары',
    Icon: ShoppingBag,
    subItems: [
      { title: 'Все товары', url: routeConfig.products() },
      { title: 'Категории', url: routeConfig.categorires() },
      { title: 'Параметры товаров', url: routeConfig.parameters() },
    ],
  },
  { title: 'Пользователи', url: routeConfig.users(), Icon: Users },
  { title: 'Настройки', url: routeConfig.settings(), Icon: Settings },
] as const
