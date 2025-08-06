import { jwtVerify } from 'jose'

interface TokenData {
	accessToken: string
}

interface RefreshResponse {
	token: string
	user: {
		id: string
		email: string
	}
}

class TokenManager {
	private static instance: TokenManager
	private refreshPromise: Promise<TokenData> | null = null

	private constructor() {}

	static getInstance(): TokenManager {
		if (!TokenManager.instance) {
			TokenManager.instance = new TokenManager()
		}
		return TokenManager.instance
	}

	// Получить access token из localStorage
	getAccessToken(): string | null {
		if (typeof window === 'undefined') return null
		return localStorage.getItem('accessToken')
	}

	// Сохранить access token в localStorage
	setAccessToken(accessToken: string): void {
		if (typeof window === 'undefined') return
		localStorage.setItem('accessToken', accessToken)
	}

	// Очистить токены
	clearToken(): void {
		if (typeof window === 'undefined') return
		localStorage.removeItem('accessToken')
	}

	// Проверить, истек ли access token
	async isAccessTokenExpired(accessToken: string): Promise<boolean> {
		try {
			const secret = new TextEncoder().encode(
				process.env.NEXT_PUBLIC_JWT_SECRET || ''
			)
			await jwtVerify(accessToken, secret)
			return false
		} catch {
			return true
		}
	}

	// Обновить токены через API (refreshToken берется из cookies)
	private async refreshToken(): Promise<string> {
		try {
			const response = await fetch('/api/trpc/auth.refresh', {
				credentials: 'include', // Важно для отправки cookies с refresh token
			})

			if (!response.ok) {
				throw new Error('Failed to refresh token')
			}

			const data = await response.json()
			const refreshData: RefreshResponse = data.result.data

			return refreshData.token
		} catch (error) {
			console.error('Error refreshing tokens:', error)
			this.clearToken()
			throw new Error('Token refresh failed')
		}
	}

	// Принудительно обновить токены
	async forceRefresh(): Promise<string | null> {
		try {
			const newToken = await this.refreshToken()
			this.setAccessToken(newToken)
			return newToken
		} catch {
			return null
		}
	}
}

export const tokenManager = TokenManager.getInstance()
