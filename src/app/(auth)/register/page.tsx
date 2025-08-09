import { RegisterPage } from '@/screens/register'

export default async function Register({
	searchParams,
}: {
	searchParams: Promise<{ redirect: string }>
}) {
	const { redirect } = await searchParams

	return <RegisterPage redirectTo={redirect} />
}
