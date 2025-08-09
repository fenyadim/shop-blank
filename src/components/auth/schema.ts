import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
})

export const registerSchema = loginSchema
	.extend({
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Пароли должны совпадать',
	})
