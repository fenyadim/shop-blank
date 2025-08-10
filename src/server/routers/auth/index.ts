import { router } from '@/server/trpc'
import { loginProcedure } from './login'
import { logoutProcedure } from './logout'
import { refreshProcedure } from './refresh'
import { registerProcedure } from './register'

export const authRouter = router({
  register: registerProcedure,
  login: loginProcedure,
  logout: logoutProcedure,
  refresh: refreshProcedure,
})
