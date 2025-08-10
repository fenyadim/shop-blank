import { appRouter } from '@/server'
import { createContext } from '@/server/context'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = async (req: Request) => {
  const ctx = await createContext({ req })

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ctx,
  })

  const headers = new Headers(response.headers)
  for (const [key, value] of ctx.resHeaders.entries()) {
    headers.append(key, value)
  }

  return new Response(response.body, {
    status: response.status,
    headers,
  })
}

export { handler as GET, handler as POST }
