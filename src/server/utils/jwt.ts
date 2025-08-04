import 'server-only'

import { jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function signAccessToken(payload: { sub: string }) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('10s')
		.sign(secret)
}

export async function signRefreshToken(payload: { sub: string }) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('7d')
		.sign(secret)
}

export async function verifyJwt(token: string) {
	const { payload } = await jwtVerify(token, secret)
	return payload
}
