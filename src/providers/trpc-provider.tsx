'use client'

import { AppRouter } from '@/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { useState } from 'react'

export const trpc = createTRPCReact<AppRouter>()

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: '/api/trpc',
					fetch: async (url, options) => {
						const accessToken = localStorage.getItem('accessToken')

						if (accessToken && options) {
							options.headers = {
								...options.headers,
								Authorization: `Bearer ${accessToken}`,
							}
						}

						const response = await fetch(url, options)

						// Если получили 401, пытаемся обновить токен
						if (response.status === 401) {
							try {
								const refreshResponse = await fetch('/api/trpc/auth.refresh', {
									method: 'POST',
									credentials: 'include',
								})

								if (refreshResponse.ok) {
									const data = await refreshResponse.json()
									localStorage.setItem(
										'accessToken',
										data.result.data.accessToken
									)

									// Повторяем оригинальный запрос
									if (accessToken && options) {
										options.headers = {
											...options.headers,
											Authorization: `Bearer ${data.result.data.accessToken}`,
										}
									}
									return fetch(url, options)
								}
							} catch (error) {
								console.error('Failed to refresh token:', error)
							}
						}

						return response
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
