import Link from 'next/link'
import { Button } from './ui/button'

export const Header = () => {
	return (
		<header className='flex justify-center'>
			<nav className='flex gap-3'>
				<Button asChild>
					<Link href='/'>Home</Link>
				</Button>
				<Button asChild>
					<Link href='/login'>Login</Link>
				</Button>
				<Button asChild>
					<Link href='/dashboard'>Dashboard</Link>
				</Button>
				<Button asChild>
					<Link href='/dashboard/profile'>Profile</Link>
				</Button>
			</nav>
		</header>
	)
}
