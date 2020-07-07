import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import axios from 'axios'
import { Navigation, Link } from '../components'
import { getGithubToken } from '../utils'
import './styles.css'

export default function App() {
  const [githubToken, setGithubToken] = React.useState()

  React.useEffect(() => {
    async function fetchToken() {
      try {
        const token = await getGithubToken()
        setGithubToken(token)
      } catch (e) {
        return undefined
      }
    }
    fetchToken()
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
      <Link href="/api/auth/sign-in">Sign-in through GithHub</Link>
      {/* <SessionProvider session={session}>
        <TokenContext.Provider value={githubToken}>
          <SWRConfig
            value={{
              fetcher: client,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </TokenContext.Provider>
      </SessionProvider> */}
    </div>
  )
}
