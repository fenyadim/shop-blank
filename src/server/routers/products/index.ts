import { router } from '@/server/trpc'

import { createProcedure } from './create'
import { deleteProcedure } from './delete'
import { findAllProcedure } from './findAll'
import { findOneProcedure } from './findOne'

export const productsRouter = router({
  findAll: findAllProcedure,
  findOne: findOneProcedure,
  create: createProcedure,
  // update: updateProcedure,
  delete: deleteProcedure,
})
