import * as React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App as AppScene } from '../scenes/App/App'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles.css'
import { SessionProvider } from 'next-auth/react'

/**
 * @note Tell Font Awesome to skip adding the CSS automatically since it's being imported above
 */
config.autoAddCss = false

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Meow</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Roboto+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <AppScene>
            <Component {...pageProps} />
          </AppScene>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
