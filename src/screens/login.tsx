'use client'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { trpc } from '@/providers/trpc-provider'
import { loginSchema } from '@/server/routers/auth/login/input'
import { LoginInput } from '@/types/auth'
import { tokenManager } from '@/utils/tokenManager'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface LoginPageProps {
	redirectTo: string
}

export const LoginPage = ({ redirectTo }: LoginPageProps) => {
	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const utils = trpc.useUtils()

	const loginMutation = trpc.auth.login.useMutation({
		onSuccess: data => {
			tokenManager.setAccessToken(data.token)
			utils.users.invalidate()
			router.replace(redirectTo)
		},
		onError: err => {
			form.setError('root', {
				message: err.message,
			})
		},
	})

	const handleSubmit = async (values: LoginInput) => {
		await loginMutation.mutateAsync(values)
	}

	return (
		<div className='h-full flex justify-center items-center'>
			<Card className='w-80'>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className='flex flex-col gap-6'
						>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='johndoe@example.com'
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Пароль</FormLabel>
										<FormControl>
											<Input
												placeholder='**********'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={loginMutation.isPending}>
								{!loginMutation.isPending ? (
									'Войти'
								) : (
									<Loader2Icon className='animate-spin' />
								)}
							</Button>
							{form.formState.errors.root && (
								<Alert variant='destructive'>
									<AlertCircleIcon />
									<AlertTitle>{form.formState.errors.root.message}.</AlertTitle>
								</Alert>
							)}
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
