'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, ArrowLeft, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DashboardHeader } from '@/components/dashboard'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { routeConfig } from '@/config/route'
import { trpc } from '@/providers/trpc-provider'
import { createSchema } from '@/server/routers/products/create/input'

export const ProductsNewPage = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      price: 0.0,
    },
  })

  const utils = trpc.useUtils()

  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      utils.products.invalidate()
      router.replace(routeConfig.products())
    },
    onError: (err) => {
      form.setError('root', {
        message: err.message,
      })
    },
  })

  const handleSubmit = async (values: z.infer<typeof createSchema>) => {
    await createMutation.mutateAsync(values)
  }

  const handleBackClick = () => {
    router.replace(routeConfig.products())
  }

  const isLoading = createMutation.isPending

  return (
    <>
      <DashboardHeader title="Новый товар" />
      <div className="px-3">
        <Button className="mb-3" onClick={handleBackClick}>
          <ArrowLeft /> Назад
        </Button>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название продукта</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображение</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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

            <div>
              <Button className="w-full" disabled={isLoading}>
                {!isLoading ? (
                  'Создать'
                ) : (
                  <Loader2Icon className="animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
