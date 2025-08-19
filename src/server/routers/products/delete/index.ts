import { publicProcedure } from '@/server/trpc'

import { deleteSchema } from './input'

export const deleteProcedure = publicProcedure
  .input(deleteSchema)
  .mutation(async ({ input, ctx }) => {
    const product = await ctx.prisma.product.findFirstOrThrow({
      where: {
        id: input.id,
      },
    })

    return await ctx.prisma.product.delete({
      where: {
        id: product.id,
      },
    })
  })
