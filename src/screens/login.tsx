import { AuthForm } from '@/components/auth'

interface LoginPageProps {
  redirectTo: string
}

export const LoginPage = ({ redirectTo }: LoginPageProps) => {
  return <AuthForm type="login" redirectTo={redirectTo} />
}
