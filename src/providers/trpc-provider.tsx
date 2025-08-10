'use client'

import { AppRouter } from '@/server'
import { tokenManager } from '@/utils/tokenManager'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { useState } from 'react'

export const trpc = createTRPCReact<AppRouter>()

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',

          fetch: async (url, options) => {
            try {
              const accessToken = tokenManager.getAccessToken()
              const fetchOptions: RequestInit = {
                method: options?.method,
                body: options?.body as BodyInit,
                headers: {
                  ...options?.headers,
                  ...(accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
                },
              }
              const res = await fetch(url, fetchOptions)

              if (res.status === 401) {
                const newToken = await tokenManager.forceRefresh()
                if (newToken) {
                  fetchOptions.headers = {
                    ...fetchOptions.headers,
                    Authorization: `Bearer ${newToken}`,
                  }
                }
                return await fetch(url, fetchOptions)
              }

              return res
            } catch (e) {
              return Promise.reject(e)
            }
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
