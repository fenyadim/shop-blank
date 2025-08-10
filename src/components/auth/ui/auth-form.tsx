'use client'

import { loginSchema, registerSchema } from '@/components/auth/schema'
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
import { LoginInput, RegisterInput } from '@/types/auth'
import { tokenManager } from '@/utils/tokenManager'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface AuthFormProps {
  type: 'login' | 'register'
  redirectTo: string
}

export const AuthForm = ({
  type,
  redirectTo = '/dashboard',
}: AuthFormProps) => {
  const router = useRouter()
  const isLogin = type === 'login'
  const schema = isLogin ? loginSchema : registerSchema

  const form = useForm<LoginInput & { confirmPassword?: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const utils = trpc.useUtils()

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      tokenManager.setAccessToken(data.token)
      utils.users.invalidate()
      router.replace(redirectTo)
    },
    onError: (err) => {
      form.setError('root', {
        message: err.message,
      })
    },
  })

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      tokenManager.setAccessToken(data.token)
      utils.users.invalidate()
      router.replace(redirectTo)
    },
    onError: (err) => {
      form.setError('root', {
        message: err.message,
      })
    },
  })

  const handleSubmit = async (values: LoginInput | RegisterInput) => {
    if (isLogin) {
      await loginMutation.mutateAsync(values as LoginInput)
    } else {
      await registerMutation.mutateAsync(values as RegisterInput)
    }
  }

  const isLoading = loginMutation.isPending || registerMutation.isPending

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{isLogin ? 'Вход' : 'Регистрация'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLogin && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Повторите пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{form.formState.errors.root.message}.</AlertTitle>
              </Alert>
            )}

            <div>
              <Button className="w-full" disabled={isLoading}>
                {!isLoading ? (
                  isLogin ? (
                    'Войти'
                  ) : (
                    'Зарегистрироваться'
                  )
                ) : (
                  <Loader2Icon className="animate-spin" />
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-2">
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                <Button variant="link" className="px-0" type="button" asChild>
                  <Link href={isLogin ? '/register' : '/login'}>
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
