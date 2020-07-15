import * as React from 'react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { Navigation, Loading } from '../components'
import { useSession } from '../hooks'

import './styles.css'
import 'spinkit/spinkit.min.css'

export default function App({ Component, pageProps }: AppProps) {
  const client = axios.create({
    baseURL: '/api',
    timeout: 1000,
  })

  const session = useSession(client)

  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation user={session.user} />
      <SWRConfig
        value={{
          fetcher: client,
        }}
      >
        <div className="pt-8">
          {!session.verified ? <Loading root /> : <Component {...pageProps} />}
        </div>
      </SWRConfig>
    </div>
  )
}
