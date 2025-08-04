// utils/trpcClient.ts
'use client'

import { AppRouter } from '@/server'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()

export const createTrpcClient = () =>
	trpc.createClient({
		links: [
			httpBatchLink({
				url: '/api/trpc',
				async headers() {
					const token = localStorage.getItem('accessToken')
					return token ? { Authorization: `Bearer ${token}` } : {}
				},
			}),
		],
	})
