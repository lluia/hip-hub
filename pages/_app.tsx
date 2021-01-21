import * as React from 'react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Loading, Navbar } from '../components'
import { useSession } from '../hooks'
import { fetcher } from '../utils'
import hljs from 'highlight.js/lib/core'
import 'reset-css/reset.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'
import './styles.css'

/**
 * @note Tell Font Awesome to skip adding the CSS automatically since it's being imported above
 */
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  const session = useSession()

  React.useEffect(() => {
    hljs.initHighlightingOnLoad()
  }, [])

  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Roboto+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar user={session.user} loading={session.validating} />
      {session.validating || session.redirecting ? (
        <Loading />
      ) : (
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      )}
    </div>
  )
}
