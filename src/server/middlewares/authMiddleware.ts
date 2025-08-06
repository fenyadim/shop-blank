import { TRPCError } from '@trpc/server'
import { t } from '../trpc'

export const authMiddleware = t.middleware(async ({ ctx, next }) => {
	if (!ctx.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Вы не аутентифицированы',
		})
	}

	return next({
		ctx: {
			...ctx,
			user: ctx.user,
		},
	})
})
