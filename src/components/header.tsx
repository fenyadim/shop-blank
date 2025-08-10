import Link from 'next/link'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <header className="flex justify-center my-2">
      <nav className="relative flex gap-3 p-2 rounded-full overflow-hidden before:bg-foreground/20 before:backdrop-blur-md before:absolute before:inset-0 before:-z-10 *:rounded-full">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/profile">Profile</Link>
        </Button>
      </nav>
    </header>
  )
}
