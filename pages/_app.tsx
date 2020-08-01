import * as React from 'react'
import Head from 'next/head'
import useSWR, { SWRConfig } from 'swr'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/dist/client/router'
import { Loading, Navbar } from '../components'
import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles.css'

/**
 * @note Tell Font Awesome to skip adding the CSS automatically since it's being imported above
 */
config.autoAddCss = false

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
      {isLoading ? (
        <Loading />
      ) : (
        <SWRConfig value={{ fetcher }}>
          {isValidating ? <Loading /> : <Component {...pageProps} />}
        </SWRConfig>
      )}
    </div>
  )
}
