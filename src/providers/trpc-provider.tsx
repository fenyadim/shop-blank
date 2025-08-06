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
					headers: async () => {
						const accessToken = tokenManager.getAccessToken()

						return {
							authorization: accessToken ? `Bearer ${accessToken}` : '',
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
