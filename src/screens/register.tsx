'use client'

import { registerSchema } from '@/components/auth/schema'
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
import { RegisterInput } from '@/types/auth'
import { tokenManager } from '@/utils/tokenManager'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface RegisterPageProps {
  redirectTo: string
}

export const RegisterPage = ({ redirectTo }: RegisterPageProps) => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const utils = trpc.useUtils()

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

  const handleSubmit = async (values: RegisterInput) => {
    await registerMutation.mutateAsync(values)
  }

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Register</CardTitle>
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

              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>{form.formState.errors.root.message}.</AlertTitle>
                </Alert>
              )}

              <Button disabled={registerMutation.isPending}>
                {!registerMutation.isPending ? (
                  'Войти'
                ) : (
                  <Loader2Icon className="animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
