import { router } from '@/server/trpc'

import { findAllProcedure } from './findAll'
import { findOneProcedure } from './findOne'

export const productsRouter = router({
  findAll: findAllProcedure,
  findOne: findOneProcedure,
})
