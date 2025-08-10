import { routeConfig } from '@/config/route'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export const Header = () => {
  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2">
      <Card className="p-2 rounded-full">
        <CardContent className="p-0">
          <nav className="flex gap-2 *:rounded-full">
            <Button asChild>
              <Link href={routeConfig.home()}>
                <Home /> Home
              </Link>
            </Button>
            <Button asChild>
              <Link href={routeConfig.login()}>Login</Link>
            </Button>
            <Button asChild>
              <Link href={routeConfig.dashboard()}>Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href={routeConfig.profile()}>Profile</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </header>
  )
}
