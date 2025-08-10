import { prisma } from './db/client'

export const createContext = async (opts: { req: Request }) => {
  const resHeaders = new Headers()

  const authHeader = opts.req.headers.get('Authorization')
  const accessToken = authHeader?.split(' ')[1] ?? null

  return {
    req: opts.req,
    resHeaders,
    user: null,
    accessToken,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
