import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <div className="flex gap-3 *:bg-gray-500">
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/profile">Profile</Link>
      </div>
    </div>
  )
}
