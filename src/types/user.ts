import { AppRouter } from '@/server'
import { inferRouterOutputs } from '@trpc/server'

type RouterOutput = inferRouterOutputs<AppRouter>

export type User = RouterOutput['users']['getMe']
