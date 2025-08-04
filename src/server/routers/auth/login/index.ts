import { signAccessToken, signRefreshToken } from '@/server/utils/jwt'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import { publicProcedure } from '../../../trpc'
import { loginSchema } from './input'

export const loginProcedure = publicProcedure
	.input(loginSchema)
	.mutation(async ({ input, ctx }) => {
		const { email, password } = input

		const user = await ctx.prisma.user.findUniqueOrThrow({
			where: { email },
		})

		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Неверный email или пароль',
			})
		}

		const accessToken = await signAccessToken({ sub: user.id })
		const refreshToken = await signRefreshToken({ sub: user.id })

		ctx.resHeaders.set(
			'Set-Cookie',
			`refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${
				7 * 24 * 60 * 60
			}; Path=/`
		)

		return {
			user: {
				id: user.id,
				email: user.email,
			},
			token: accessToken,
		}
	})
