import { publicProcedure } from '../../../trpc'

export const findAllProcedure = publicProcedure.query(
  async ({ ctx }) => await ctx.prisma.product.findMany(),
)
