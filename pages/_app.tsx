import * as React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { Navigation } from '../components'
import './styles.css'

interface User {
  name: string
  avatar: string
}

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<User | null>(null)
  const client = axios.create({
    baseURL: '/api',
    timeout: 1000,
  })

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { avatar_url: avatar, name },
        } = await axios.get('/api/user')
        setUser({
          avatar,
          name,
        })
      } catch (e) {
        Router.push('/sign-in')
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation user={user} />
      <SWRConfig
        value={{
          fetcher: client,
        }}
      >
        {user ? <Component {...pageProps} /> : 'loading app...'}
      </SWRConfig>
    </div>
  )
}
