import { inferRouterOutputs } from '@trpc/server'

import { AppRouter } from '@/server'

type RouterOutput = inferRouterOutputs<AppRouter>

export type User = RouterOutput['users']['getMe']
