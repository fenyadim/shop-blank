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

						try {
							const response = await fetch(url, options)

							return response
						} catch (e) {
							console.log('Error', e)
							return Promise.reject('TEST')
						}

						// try {
						// 	const response = await fetch(url, options)
						// 	if (!response.ok) {
						// 		try {
						// 			const refreshResponse = await fetch(
						// 				'/api/trpc/auth.refresh',
						// 				{
						// 					credentials: 'include',
						// 				}
						// 			)

						// 			if (refreshResponse.ok) {
						// 				const data = await refreshResponse.json()

						// 				const accessToken = data.result.data.token

						// 				localStorage.setItem('accessToken', accessToken)

						// 				if (options) {
						// 					options.headers = {
						// 						...options.headers,
						// 						Authorization: `Bearer ${accessToken}`,
						// 					}
						// 				}
						// 			}
						// 		} catch (error) {
						// 			console.error('Failed to refresh token:', error)

						// 			throw new TRPCError({
						// 				code: 'UNAUTHORIZED',
						// 				message: 'Unauthorized',
						// 			})
						// 		}
						// 	}
						// } catch (error) {
						// 	throw new TRPCError({
						// 		code: 'BAD_GATEWAY',
						// 		message: 'Что-то пошло не так',
						// 	})
						// }
						// return await fetch(url, options)
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
