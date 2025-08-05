import { protectedProcedure, publicProcedure, router } from '../../trpc'

export const usersRouter = router({
	getAll: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),
	getMe: protectedProcedure.query(({ ctx }) => {
		if (!ctx.user) return null
		const { password, ...otherData } = ctx.user
		return otherData
	}),
})
