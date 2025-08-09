import { AppRouter } from '@/server'
import { inferRouterInputs } from '@trpc/server'

type RouterInput = inferRouterInputs<AppRouter>

export type LoginInput = RouterInput['auth']['login']
export type RegisterInput = RouterInput['auth']['register']
