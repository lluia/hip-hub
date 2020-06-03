import * as React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { Button } from './Button'

export function Navigation() {
  const [session, loading] = useSession()

  return (
    <nav className="p-4">
      {/*
       * The approach used here demonstrates how to avoid a flash of incorrect
       * content on the initial load of pages, while working on pages that
       * support server side rendering for clients without JavaScript.
       */}
      <noscript>
        <style>{`.js-hidden { opacity: 1 !important; }`}</style>
      </noscript>
      <div className={!session && loading ? 'js-hidden' : ''}>
        {session && (
          <>
            <img
              src={session.user.image}
              style={{ width: 30, height: 30, borderRadius: '50%' }}
            />
            <span>
              Hi <strong>{session.user.name}</strong>!
            </span>
            <a href={`/api/auth/signout`}>
              <button>Sign out</button>
            </a>
          </>
        )}
        {!session && (
          <a href={`/api/auth/signin`}>
            <Button>Sign-in</Button>
          </a>
        )}
      </div>
      <ul>
        <li>
          <Link href="/">
            <a className="text-link">Home</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
