import React from 'react'
import { useRouter } from 'next/router'

interface User {
  name: string
  avatar: string
}

interface Session {
  status: 'pending' | 'verified'
  user: User | null
}

export function useSession() {
  const router = useRouter()

  const [session, setSession] = React.useState<Session>({
    status: 'pending',
    user: null,
  })

  const signInRedirect =
    session.status === 'verified' &&
    !session.user &&
    router.pathname !== '/sign-in'

  const homeRedirect =
    session.status === 'verified' &&
    session.user &&
    router.pathname === '/sign-in'

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user')

        if (response.status !== 200) throw new Error('wrong')

        const parsedResponse = await response.json()
        const { avatar_url: avatar, name } = parsedResponse

        setSession({
          status: 'verified',
          user: {
            avatar,
            name,
          },
        })
      } catch (e) {
        setSession({
          status: 'verified',
          user: null,
        })
      }
    }

    fetchUser()
  }, [])

  React.useEffect(() => {
    if (signInRedirect) router.replace('/sign-in')
    if (homeRedirect) router.replace('/')
  }, [signInRedirect, homeRedirect])

  return {
    user: session.user,
    validating: session.status === 'pending',
    redirecting: signInRedirect || homeRedirect,
  }
}
