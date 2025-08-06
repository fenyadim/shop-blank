import { TRPCError } from '@trpc/server'
import { parse as parseCookie } from 'cookie'
import { t } from '../t'
import { signAccessToken, verifyJwt } from '../utils/jwt'

export const authMiddleware = t.middleware(async ({ ctx, next }) => {
	let user = null

	if (ctx.accessToken) {
		try {
			const payload = await verifyJwt(ctx.accessToken)
			user = await ctx.prisma.user.findUnique({
				where: { id: payload.sub },
				select: { id: true, email: true, role: true },
			})
		} catch {}
	}

	if (!user) {
		const cookieHeader = ctx.req.headers.get('cookie')
		const refreshToken = cookieHeader
			? parseCookie(cookieHeader).refreshToken
			: undefined

		if (!refreshToken)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Вы не аутентифицированы',
			})

		try {
			const refreshPayload = await verifyJwt(refreshToken)
			user = await ctx.prisma.user.findUnique({
				where: { id: refreshPayload.sub },
				select: { id: true, email: true },
			})
			if (!user) throw new Error()
			const newAccessToken = await signAccessToken({ sub: user.id })
			ctx.resHeaders.append(
				'Set-Cookie',
				`accessToken=${newAccessToken}; Path=/; HttpOnly; SameSite=Strict; Secure`
			)
		} catch {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Вы не аутентифицированы',
			})
		}
	}

	return next({
		ctx: {
			...ctx,
			user,
		},
	})
})
