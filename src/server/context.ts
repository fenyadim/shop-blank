import { prisma } from './db/client'
import { verifyJwt } from './utils/jwt'

export const createContext = async (opts: { req: Request }) => {
	const resHeaders = new Headers()

	const authHeader = opts.req.headers.get('Authorization')
	const token = authHeader?.split(' ')[1]

	let user = null

	if (token) {
		try {
			const payload = await verifyJwt(token)
			user = await prisma.user.findUnique({ where: { id: payload.sub } })
		} catch (error) {
			console.error('Invalid token', error)
		}
	}

	return {
		req: opts.req,
		resHeaders,
		user,
		prisma,
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>
