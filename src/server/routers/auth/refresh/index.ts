import { publicProcedure } from '@/server/trpc'
import {
	signAccessToken,
	signRefreshToken,
	verifyJwt,
} from '@/server/utils/jwt'
import { TRPCError } from '@trpc/server'
import { parse } from 'cookie'

export const refreshProcedure = publicProcedure.mutation(async ({ ctx }) => {
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
		const newRefreshToken = await signRefreshToken({ sub: user.id })

		ctx.resHeaders.set(
			'Set-Cookie',
			`refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${
				7 * 24 * 60 * 60
			}; Path=/`
		)

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
