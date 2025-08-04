'use client'

import { useLocalStorage } from '@/shared/hooks'
import { trpc } from '@/utils/trpcClient'
import { FormEvent, useState } from 'react'

export const LoginPage = () => {
	const { set: setAccessToken } = useLocalStorage('accessToken', '')

	const utils = trpc.useUtils()

	const loginMutation = trpc.auth.login.useMutation({
		onSuccess: data => {
			setAccessToken(data.token)
			utils.users.invalidate()
		},
		onError: err => {
			console.log(err)
		},
	})

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		loginMutation.mutate({ email, password })
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-5 w-80 bg-gray-700 p-5'
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
				<button className='bg-gray-800'>Login</button>
			</form>
		</div>
	)
}
