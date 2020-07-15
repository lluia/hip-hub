import React from 'react'
import Router from 'next/router'
import type { AxiosInstance } from 'axios'

interface User {
  name: string
  avatar: string
}

export function useSession(client: AxiosInstance) {
  const [user, setUser] = React.useState<User | null>(null)
  const [verified, setVerified] = React.useState<boolean>(false)

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { avatar_url: avatar, name },
        } = await client.get('/user')

        setUser({
          avatar,
          name,
        })
      } catch (e) {
        Router.replace('/sign-in')
      }
      setVerified(true)
    }

    fetchUser()
  }, [])

  return {
    user,
    verified,
  }
}
