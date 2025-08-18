import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'

import { signAccessToken, signRefreshToken } from '@/server/utils/jwt'

import { publicProcedure } from '../../../trpc'
import { registerSchema } from './input'

export const registerProcedure = publicProcedure
  .input(registerSchema)
  .mutation(async ({ input, ctx }) => {
    const { email, password } = input

    const existingUser = await ctx.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Такой email занят',
      })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    const accessToken = await signAccessToken({ sub: user.id })
    const refreshToken = await signRefreshToken({ sub: user.id })

    const expiresTime =
      Number(process.env.JWT_REFRESH_EXPIRES) ?? 7 * 24 * 60 * 60

    ctx.resHeaders.append(
      'Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${expiresTime}; Path=/`,
    )

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token: accessToken,
    }
  })
