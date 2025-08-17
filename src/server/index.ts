import { authRouter } from './routers/auth'
import { productsRouter } from './routers/products'
import { usersRouter } from './routers/users'
import { router } from './trpc'

export const appRouter = router({
  users: usersRouter,
  auth: authRouter,
  products: productsRouter,
})

export type AppRouter = typeof appRouter
