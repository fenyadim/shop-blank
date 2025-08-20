import { publicProcedure } from '@/server/trpc'

import { createSchema } from './input'

export const createProcedure = publicProcedure
  .input(createSchema)
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.product.create({
      data: {
        ...input,
        price: Number(input.price),
      },
    })
  })
