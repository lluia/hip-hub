import * as React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { Button, Logo } from '.'
import { useRouter } from 'next/dist/client/router'

export function Navigation() {
  const [session, loading] = useSession()
  const { push } = useRouter()
  const initialLoad = !session && loading
  const sessionCallback = React.useCallback(() => {
    push(`/api/auth/${session ? 'signout' : 'signin'}`)
  }, [push, session])

  return (
    <nav
      className={`${
        initialLoad ? 'hidden' : ''
      } flex justify-between align-center py-3`}
    >
      <Link href="/">
        <Logo className="w-10" />
      </Link>
      <div className="flex justify-between items-center">
        {session ? (
          <>
            <div className="flex items-center mr-8">
              <img src={session.user.image} className="rounded-full w-6" />
              <span className="inline-block ml-3">
                Hi <strong>{session.user.name}</strong>
              </span>
            </div>
            <Button onClick={sessionCallback}>Sign out</Button>
          </>
        ) : (
          <Button onClick={sessionCallback}>Sign-in</Button>
        )}
      </div>
    </nav>
  )
}
