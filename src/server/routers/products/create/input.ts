import { z } from 'zod'

export const createSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
  description: z.string().min(3, 'Минимум 3 символа'),
  image: z.string(),
  price: z.string().min(1, 'Минимум 3 символа'),
})
