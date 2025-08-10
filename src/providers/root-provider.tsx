'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'
import { TrpcProvider } from './trpc-provider'

export const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TrpcProvider>{children}</TrpcProvider>
    </ThemeProvider>
  )
}
