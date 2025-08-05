'use client'

import { trpc } from '@/providers/trpc-provider'
import { useLocalStorage, useUser } from '@/shared/hooks'

export const DashboardPage = () => {
	const utils = trpc.useUtils()
	const { user, isLoading } = useUser()

	const logoutMutation = trpc.auth.logout.useMutation()

	const { remove: removeAccessToken } = useLocalStorage('accessToken', '')

	if (isLoading) return <p>Loading...</p>

	const handleLogout = async () => {
		await logoutMutation.mutateAsync()
		removeAccessToken()
		utils.users.invalidate()
	}

	return (
		<div>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<button className='bg-amber-900' type='button' onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}
