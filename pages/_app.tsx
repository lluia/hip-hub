import * as React from 'react'
import { AppProps } from 'next/app'
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
      getGithubToken().then(setGithubToken).catch(console.log)
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
    <>
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
    </>
  )
}
