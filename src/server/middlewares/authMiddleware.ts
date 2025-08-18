import { TRPCError } from '@trpc/server'

import { t } from '../t'
import { verifyJwt } from '../utils/jwt'

export const authMiddleware = t.middleware(async ({ ctx, next }) => {
  let user = null

  if (ctx.accessToken) {
    try {
      const payload = await verifyJwt(ctx.accessToken)
      user = await ctx.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, role: true, avatar: true },
      })
    } catch {}
  }

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Вы не аутентифицированы',
    })
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  })
})
