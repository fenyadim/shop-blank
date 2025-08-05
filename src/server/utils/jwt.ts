import 'server-only'

import { jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function signAccessToken(payload: { sub: string }) {
	const expiresTime = Number(process.env.JWT_ACCESS_EXPIRES) ?? 15 * 60

	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime(`${expiresTime}s`)
		.sign(secret)
}

export async function signRefreshToken(payload: { sub: string }) {
	const expiresTime =
		Number(process.env.JWT_REFRESH_EXPIRES) ?? 7 * 24 * 60 * 60

	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime(`${expiresTime}s`)
		.sign(secret)
}

export async function verifyJwt(token: string) {
	const { payload } = await jwtVerify(token, secret)
	return payload
}
