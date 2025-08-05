'use client'

import { User } from '@/types/user'
import { trpc } from '@/utils/trpcClient'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, PropsWithChildren, useEffect } from 'react'

interface AuthProviderProps extends PropsWithChildren {
	roles?: []
}

interface UserContext {
	user: User
	isLoading: boolean
}

export const UserContext = createContext<UserContext>({
	user: null,
	isLoading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { data: user, isLoading, error } = trpc.users.getMe.useQuery()
	const pathname = usePathname()

	const router = useRouter()

	useEffect(() => {
		if (!isLoading && error) {
			console.log(pathname)
			router.replace(`/login?redirect=/dashboard`)
		}
	}, [error, isLoading, router, pathname])

	if (isLoading || !user) return <p>Loading...</p>

	return (
		<UserContext.Provider value={{ user, isLoading }}>
			{children}
		</UserContext.Provider>
	)
}
