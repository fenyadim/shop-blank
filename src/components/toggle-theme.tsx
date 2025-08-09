'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ToggleTheme() {
	const { theme, setTheme } = useTheme()

	const handleClick = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<Button
			className='absolute bottom-2 right-2'
			variant='outline'
			size='icon'
			onClick={handleClick}
		>
			<Sun className='hidden dark:block' />
			<Moon className='dark:hidden' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
