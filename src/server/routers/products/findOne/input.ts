import { z } from 'zod'

export const findOneSchema = z.object({
  id: z.string(),
})
