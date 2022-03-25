import * as React from 'react'
import Link from 'next/link'
import { Logo, Button, Back } from '.'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

export const size = '64px'

export function Navbar() {
  const { data, status: sessionStatus } = useSession({ required: false })
  const { pathname } = useRouter()
  const isRootPath = pathname === '/'
  const { user } = data || {}

  // React.useEffect(() => {
  //   signOut()
  // }, [])

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
        {sessionStatus === 'loading' ? null : user ? (
          <>
            <div className="flex items-center mr-5">
              {user.image ? (
                <img
                  src={user.image}
                  alt="user avatar"
                  className="rounded-full w-6"
                />
              ) : null}
              <span className="inline-block ml-3 text-sm font-italic">
                <strong>{user.name}</strong>
              </span>
            </div>
            <Button
              size="s"
              onClick={() => {
                signOut()
              }}
            >
              Sign-out
            </Button>
          </>
        ) : (
          <Button onClick={() => signIn('github')}>Sign-in</Button>
        )}
      </div>
    </nav>
  )
}
