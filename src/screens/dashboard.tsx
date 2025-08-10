'use client'

import { useUser } from '@/providers/auth-provider'
import { trpc } from '@/providers/trpc-provider'
import { tokenManager } from '@/utils/tokenManager'

export const DashboardPage = () => {
  const utils = trpc.useUtils()
  const { user, isLoading } = useUser()

  const logoutMutation = trpc.auth.logout.useMutation()

  if (isLoading) return <p>Loading...</p>

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    tokenManager.clearToken()
    utils.users.getMe.setData(undefined, null)
  }

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button className="bg-amber-900" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
