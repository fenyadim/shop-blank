import { UserContext } from '@/providers/auth-provider'
import { useContext } from 'react'

export const useUser = () => {
	const context = useContext(UserContext)

	return context
}
