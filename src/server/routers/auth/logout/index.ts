import { protectedProcedure } from '@/server/trpc'

export const logoutProcedure = protectedProcedure.mutation(async ({ ctx }) => {
	ctx.resHeaders.set(
		'Set-Cookie',
		'refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
	)

	return { success: true }
})
