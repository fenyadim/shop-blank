const PUBLIC_ROUTES = ['home'] as const
const DASHBOARD_ROUTES = [
  'dashboard',
  'products',
  'newProduct',
  'settings',
  'profile',
  'users',
  'categorires',
  'parameters',
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
  categorires: '/dashboard/products/categorires',
  parameters: '/dashboard/products/parameters',
  settings: '/dashboard/settings',
  profile: '/dashboard/profile',
  users: '/dashboard/users',
} as const

const dashboardRouteValues = Object.values(DASHBOARD_ROUTES_NAME)

export const routeConfig = {
  home: () => '/',
  dashboard: () => DASHBOARD_ROUTES_NAME.dashboard,
  products: () => DASHBOARD_ROUTES_NAME.products,
  categorires: () => DASHBOARD_ROUTES_NAME.categorires,
  parameters: () => DASHBOARD_ROUTES_NAME.parameters,
  newProduct: () => DASHBOARD_ROUTES_NAME.newProduct,
  settings: () => DASHBOARD_ROUTES_NAME.settings,
  profile: () => DASHBOARD_ROUTES_NAME.profile,
  users: () => DASHBOARD_ROUTES_NAME.users,
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
  [DASHBOARD_ROUTES_NAME.categorires]: 'Категории',
  [DASHBOARD_ROUTES_NAME.parameters]: 'Параметры товаров',
}

type RouteParams = {
  [K in keyof typeof routeConfig]: InferRouteParams<(typeof routeConfig)[K]>
}
