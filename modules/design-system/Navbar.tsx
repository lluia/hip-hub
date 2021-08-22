import * as React from 'react'
import Link from 'next/link'
import { Logo, Button, Back } from '.'
import { useRouter } from 'next/router'

interface NavbarUser {
  avatar: string
  name: string
}

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: NavbarUser | null
  loading: boolean
}

export const size = '64px'

export function Navbar({ user, loading }: NavbarProps) {
  const { pathname } = useRouter()
  const isRootPath = pathname === '/'

  return (
    <nav
      className={`flex ${
        isRootPath || !user ? 'justify-end' : 'justify-between'
      } items-center py-3 mt-10`}
    >
      {!isRootPath && user ? <Back /> : null}
      <div className="pin-center">
        <Link href="/">
          <Logo className="w-12" />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        {loading ? null : user ? (
          <>
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt="user avatar"
                className="rounded-full w-6"
              />
              <span className="inline-block ml-3 text-sm font-italic">
                <strong>{user.name}</strong>
              </span>
            </div>
            <Link href="/api/sign-out">
              <Button>Sign-out</Button>
            </Link>
          </>
        ) : (
          <Link href="/api/sign-in">
            <Button>Sign-in</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
