import React from 'react'
import { useRouter } from 'next/router'
import { fetchUser } from '../../services/api-client/user'

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
    async function fetchSessionStatus() {
      try {
        const response = await fetchUser()
        const { avatar_url: avatar, name } = response

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

    fetchSessionStatus()
  }, [])

  React.useEffect(() => {
    if (signInRedirect) router.replace('/sign-in')
    if (homeRedirect) router.replace('/')
  }, [signInRedirect, homeRedirect, router])

  return {
    user: session.user,
    validating: session.status === 'pending',
    redirecting: signInRedirect || homeRedirect,
  }
}
