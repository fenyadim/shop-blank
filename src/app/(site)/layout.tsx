import { Header } from '@/components/header'
import { PropsWithChildren } from 'react'

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <main className="pt-18">
      <Header />
      {children}
    </main>
  )
}
