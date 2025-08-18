import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <main className="pt-18">
      <Header />
      {children}
    </main>
  )
}
