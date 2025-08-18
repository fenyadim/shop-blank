import { inferRouterInputs } from '@trpc/server'

import { AppRouter } from '@/server'

type RouterInput = inferRouterInputs<AppRouter>

export type LoginInput = RouterInput['auth']['login']
export type RegisterInput = RouterInput['auth']['register']
