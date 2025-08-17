const PUBLIC_ROUTES = ['home'] as const
const ADMIN_ROUTES = [
  'dashboard',
  'products',
  'settings',
  'profile',
  'users',
] as const
const AUTH_ROUTES = ['login', 'register'] as const

const ALL_ROUTES = [...PUBLIC_ROUTES, ...ADMIN_ROUTES, ...AUTH_ROUTES] as const

type InferRouteParams<T> = T extends (...args: infer P) => string ? P : never

type TRouteConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in (typeof ALL_ROUTES)[number]]: (...args: any[]) => string
}

export const routeConfig = {
  home: () => '/',
  dashboard: () => '/dashboard',
  products: () => '/dashboard/products',
  settings: () => '/dashboard/settings',
  profile: () => '/dashboard/profile',
  users: () => '/dashboard/users',
  login: (redirectTo?: string) =>
    redirectTo ? `/login?redirect=${redirectTo}` : '/login',
  register: (redirectTo?: string) =>
    redirectTo ? `/register?redirect=${redirectTo}` : '/register',
} satisfies TRouteConfig

type RouteParams = {
  [K in keyof typeof routeConfig]: InferRouteParams<(typeof routeConfig)[K]>
}
