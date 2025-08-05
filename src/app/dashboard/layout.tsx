import { AuthProvider } from '@/providers/auth-provider'
import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
	return <AuthProvider>{children}</AuthProvider>
}
