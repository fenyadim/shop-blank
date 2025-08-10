'use client'

import { AuthForm } from '@/components/auth'

interface RegisterPageProps {
  redirectTo: string
}

export const RegisterPage = ({ redirectTo }: RegisterPageProps) => {
  return <AuthForm type="register" redirectTo={redirectTo} />
}
