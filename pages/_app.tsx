import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as SessionProvider } from 'next-auth/client'
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
import { Navigation } from '../components'
import { getGithubToken } from '../utils'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps
  const [githubToken, setGithubToken] = React.useState()

  React.useEffect(() => {
    getGithubToken().then(setGithubToken).catch(console.error)
  }, [])

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `bearer ${githubToken}`,
    },
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
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </div>
  )
}
