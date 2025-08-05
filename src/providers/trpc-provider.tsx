'use client'

import { AppRouter } from '@/server'
import { tokenManager } from '@/utils/tokenManager'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { TRPCError } from '@trpc/server'
import { useState } from 'react'

export const trpc = createTRPCReact<AppRouter>()

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: false,
					},
					mutations: {
						retry: false,
					},
				},
			})
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
								body: options?.body as BodyInit | null | undefined,
								headers: {
									...options?.headers,
								},
							}

							if (accessToken) {
								fetchOptions.headers = {
									...fetchOptions.headers,
									Authorization: `Bearer ${accessToken}`,
								}
							}

							const response = await fetch(url, fetchOptions)

							if (response.status === 401) {
								const newTokens = await tokenManager.forceRefresh()

								if (!newTokens) {
									return Promise.reject()
								}

								const retryOptions: RequestInit = {
									...fetchOptions,
									headers: {
										...fetchOptions.headers,
										Authorization: `Bearer ${newTokens.accessToken}`,
									},
								}
								return await fetch(url, retryOptions)
							}

							return response
						} catch (error) {
							console.error('TRPC_PROVIDER', error)

							if (error instanceof TRPCError && error.code === 'UNAUTHORIZED') {
							}

							return Promise.reject(error)
						}
					},
				}),
			],
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	)
}
