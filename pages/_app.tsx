import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { Provider as SessionProvider } from 'next-auth/client'
import axios from 'axios'
import { Navigation } from '../components'
import { getGithubToken } from '../utils'
import { TokenContext } from '../context'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps
  const [githubToken, setGithubToken] = React.useState()

  React.useEffect(() => {
    getGithubToken().then(setGithubToken).catch(console.error)
  }, [])

  const client = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
    headers: { Authorization: `token ${githubToken}` },
  })

  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation />
      <SessionProvider session={session}>
        <TokenContext.Provider value={githubToken}>
          <SWRConfig
            value={{
              fetcher: client,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </TokenContext.Provider>
      </SessionProvider>
    </div>
  )
}
