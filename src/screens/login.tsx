'use client'

import { useLocalStorage } from '@/shared/hooks'
import { trpc } from '@/utils/trpcClient'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface LoginPageProps {
	redirectTo: string
}

export const LoginPage = ({ redirectTo }: LoginPageProps) => {
	const { set: setAccessToken } = useLocalStorage('accessToken', '')
	const router = useRouter()

	const utils = trpc.useUtils()

	const loginMutation = trpc.auth.login.useMutation({
		onSuccess: data => {
			setAccessToken(data.token)
			utils.users.invalidate()
			router.replace(redirectTo)
		},
		onError: err => {
			console.log(err)
		},
	})

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await loginMutation.mutateAsync({ email, password })
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-5 w-80 bg-gray-600 p-5'
			>
				<input
					type='text'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button
					className='bg-gray-700 cursor-pointer disabled:bg-gray-950 disabled:cursor-not-allowed'
					disabled={loginMutation.isPending}
				>
					Login
				</button>
				<p className='text-red-800'>{loginMutation.error?.message}</p>
			</form>
		</div>
	)
}
