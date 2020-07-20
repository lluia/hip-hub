import * as React from 'react'
import Head from 'next/head'
import useSWR, { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import { Loading, Navbar } from '../components'

import './styles.css'
import 'spinkit/spinkit.min.css'

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json())

export default function App({ Component, pageProps }: AppProps) {
  const { data, isValidating } = useSWR('/api/user', fetcher)
  console.log(data)
  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar user={data} />
      <div className="pt-8">
        <SWRConfig value={{ fetcher }}>
          {isValidating ? <Loading root /> : <Component {...pageProps} />}
        </SWRConfig>
      </div>
    </div>
  )
}
