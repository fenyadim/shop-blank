import { NextRequest } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const authRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
	// // 2. Check if the current route is protected or public
	// const path = req.nextUrl.pathname
	// const isProtectedRoute = protectedRoutes.includes(path)
	// const isAuthRoute = authRoutes.includes(path)
	// const authHeader = req.headers.get('Authorization')
	// const accessToken = authHeader?.replace('Bearer', '')
	// let isAuthenticated = false
	// let userId: string | null = null
	// if (accessToken) {
	// 	try {
	// 		const { payload } = await jwtVerify(accessToken, secret)
	// 		if (payload.sub) {
	// 			isAuthenticated = true
	// 			userId = payload.sub
	// 		}
	// 	} catch (e) {
	// 		console.log('Invalid access token:', e)
	// 	}
	// }
	// if (isProtectedRoute && !isAuthenticated) {
	// 	const loginUrl = new URL('/login', req.url)
	// 	loginUrl.searchParams.set('redirect', path)
	// 	return NextResponse.redirect(loginUrl)
	// }
	// // Редирект для аутентифицированных пользователей на страницах входа
	// if (isAuthRoute && isAuthenticated) {
	// 	return NextResponse.redirect(new URL('/dashboard', req.url))
	// }
	// // Добавляем информацию о пользователе в заголовки для клиента
	// const response = NextResponse.next()
	// if (userId) {
	// 	response.headers.set('x-user-id', userId)
	// }
	// return response
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
