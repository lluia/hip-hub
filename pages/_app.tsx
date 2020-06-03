import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
import { Navigation, Greeting } from '../components'
import { getGithubToken } from '../utils'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const [session, verifyingSession] = useSession()
  const [githubToken, setGithubToken] = React.useState()
  const withSession = !verifyingSession && session
  const ready = withSession && githubToken

  React.useEffect(() => {
    if (session) {
      getGithubToken().then(setGithubToken).catch(console.error)
    }
  }, [session])

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `bearer ${githubToken}`,
    },
  })

  return (
    <div className="bg-brand-light min-h-screen">
      <Head>
        <title>Hip Hub!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation />
      {verifyingSession ? (
        '...'
      ) : ready ? (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      ) : (
        <Greeting />
      )}
    </div>
  )
}
