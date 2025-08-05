import { LoginPage } from '@/screens/login'

export default async function Login({
	searchParams,
}: {
	searchParams: Promise<{ redirect: string }>
}) {
	const { redirect } = await searchParams

	return <LoginPage redirectTo={redirect} />
}
