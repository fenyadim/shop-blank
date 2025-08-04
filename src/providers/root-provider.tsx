import { PropsWithChildren } from 'react'
import { TrpcProvider } from './trpc-provider'

export const RootProvider = ({ children }: PropsWithChildren) => {
	return <TrpcProvider>{children}</TrpcProvider>
}
