import { TRPCError } from '@trpc/server'
import { parse } from 'cookie'

import { publicProcedure } from '@/server/trpc'
import { signAccessToken, verifyJwt } from '@/server/utils/jwt'

export const refreshProcedure = publicProcedure.query(async ({ ctx }) => {
  const cookieHeader = ctx.req.headers.get('cookie')

  if (!cookieHeader)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Отсутствуют куки',
    })

  const parsed = parse(cookieHeader)
  const refreshToken = parsed.refreshToken

  if (!refreshToken)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Отсутствует refresh токен',
    })

  try {
    const payload = await verifyJwt(refreshToken)
    if (!payload.sub || typeof payload.sub !== 'string') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Недействительный refresh токен',
      })
    }

    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: { id: payload.sub },
      select: { id: true, email: true },
    })

    const newAccessToken = await signAccessToken({ sub: user.id })

    return {
      token: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    }
  } catch (error) {
    if (error instanceof TRPCError) {
      throw error
    }

    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Недействительный refresh токен',
    })
  }
})
