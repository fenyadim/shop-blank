import { publicProcedure } from '@/server/trpc'

import { findOneSchema } from './input'

export const findOneProcedure = publicProcedure.input(findOneSchema).query(
  async ({ input, ctx }) =>
    await ctx.prisma.product.findFirstOrThrow({
      where: {
        id: input.id,
      },
    }),
)
