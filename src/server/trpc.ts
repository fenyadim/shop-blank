import { initTRPC } from '@trpc/server'
import { Context } from './context'
import { authMiddleware } from './middlewares/authMiddleware'

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(authMiddleware)
