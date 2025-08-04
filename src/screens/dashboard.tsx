'use client'

import { useLocalStorage } from '@/shared/hooks'
import { trpc } from '@/utils/trpcClient'

export const DashboardPage = () => {
	const utils = trpc.useUtils()
	const { data, isLoading } = trpc.users.getMe.useQuery()
	const logoutMutation = trpc.auth.logout.useMutation()

	const { remove: removeAccessToken } = useLocalStorage('accessToken', '')

	if (isLoading) return <p>Loading...</p>

	const handleLogout = () => {
		logoutMutation.mutate()
		removeAccessToken()
		utils.users.invalidate()
	}

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button className='bg-amber-900' type='button' onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}
