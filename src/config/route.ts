const PUBLIC_ROUTES = ['home'] as const
const DASHBOARD_ROUTES = [
  'dashboard',
  'products',
  'newProduct',
  'settings',
  'profile',
  'users',
] as const
const AUTH_ROUTES = ['login', 'register'] as const

const ALL_ROUTES = [
  ...PUBLIC_ROUTES,
  ...DASHBOARD_ROUTES,
  ...AUTH_ROUTES,
] as const

type InferRouteParams<T> = T extends (...args: infer P) => string ? P : never

type TRouteConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in (typeof ALL_ROUTES)[number]]: (...args: any[]) => string
}

export const DASHBOARD_ROUTES_NAME = {
  dashboard: '/dashboard',
  products: '/dashboard/products',
  newProduct: '/dashboard/products/new',
  settings: '/dashboard/settings',
  profile: '/dashboard/profile',
  users: '/dashboard/users',
} as const

const dashboardRouteValues = Object.values(DASHBOARD_ROUTES_NAME)

export const routeConfig = {
  home: () => '/',
  dashboard: () => '/dashboard',
  products: () => '/dashboard/products',
  newProduct: () => '/dashboard/products/new',
  settings: () => '/dashboard/settings',
  profile: () => '/dashboard/profile',
  users: () => '/dashboard/users',
  login: (redirectTo?: string) =>
    redirectTo ? `/login?redirect=${redirectTo}` : '/login',
  register: (redirectTo?: string) =>
    redirectTo ? `/register?redirect=${redirectTo}` : '/register',
} satisfies TRouteConfig

export type TDashboardRoute = (typeof dashboardRouteValues)[number]

type DashboardTitles = {
  [key in TDashboardRoute]: string
}

export const dashboardTitles: DashboardTitles = {
  [DASHBOARD_ROUTES_NAME.dashboard]: 'Панель управления',
  [DASHBOARD_ROUTES_NAME.products]: 'Товары',
  [DASHBOARD_ROUTES_NAME.newProduct]: 'Новый товар',
  [DASHBOARD_ROUTES_NAME.settings]: 'Настройки',
  [DASHBOARD_ROUTES_NAME.profile]: 'Профиль',
  [DASHBOARD_ROUTES_NAME.users]: 'Пользователи',
}

type RouteParams = {
  [K in keyof typeof routeConfig]: InferRouteParams<(typeof routeConfig)[K]>
}
