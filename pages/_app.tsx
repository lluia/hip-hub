import * as React from 'react'
import Head from 'next/head'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/dist/client/router'
import { Loading, Navbar } from '../components'
import type { AppProps } from 'next/app'

import './styles.css'
import 'spinkit/spinkit.min.css'

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json())

export default function App({ Component, pageProps }: AppProps) {
  const { data, isValidating, error } = useSWR('/api/user', fetcher)
  const router = useRouter()
  const user = error ? null : data
  const isLoading = (!data && !error) || isValidating

  React.useEffect(() => {
    if (error) router.push('/sign-in')
  }, [error])

  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar user={user} loading={isLoading} />
      <div className="pt-8">
        {isLoading ? (
          <Loading root />
        ) : (
          <SWRConfig value={{ fetcher }}>
            {isValidating ? <Loading root /> : <Component {...pageProps} />}
          </SWRConfig>
        )}
      </div>
    </div>
  )
}
