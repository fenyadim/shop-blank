'use client'

import { routeConfig } from '@/config/route'
import { User } from '@/types/user'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { trpc } from './trpc-provider'

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
      router.replace(routeConfig.login(pathname))
      return
    }
  }, [error, isLoading, router, pathname])

  if (isLoading || !user) return <p>Loading...</p>

  console.log(user)

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  return context
}
