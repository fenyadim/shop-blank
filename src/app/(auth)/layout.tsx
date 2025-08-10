import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  )
}
