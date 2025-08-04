import { publicProcedure, router } from '../../trpc'

export const usersRouter = router({
	getAll: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),
	getMe: publicProcedure.query(({ ctx }) => {
		if (!ctx.user) return null
		const { password, ...otherData } = ctx.user
		return otherData
	}),
})
