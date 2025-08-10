import { publicProcedure } from '@/server/trpc'

export const logoutProcedure = publicProcedure.mutation(async ({ ctx }) => {
  ctx.resHeaders.append(
    'Set-Cookie',
    'refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
  )

  return { success: true }
})
