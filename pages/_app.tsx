import * as React from 'react'
import { AppProps } from 'next/app'
import { useSession } from 'next-auth/client'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { Navigation, Greeting } from '../components'
import { getGithubToken } from '../utils'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const [session, sessionLoading] = useSession()
  const [githubToken, setGithubToken] = React.useState()
  const withSession = session && !sessionLoading

  React.useEffect(() => {
    if (session) {
      getGithubToken().then(setGithubToken).catch(console.log)
    }
  }, [session])

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    fetchOptions: {
      headers: {
        // TODO: https://www.apollographql.com/docs/react/networking/authentication/
        Authorization: `bearer ${githubToken}`,
      },
    },
  })

  return (
    <>
      <Navigation />
      {sessionLoading ? (
        '...'
      ) : withSession && githubToken ? (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      ) : (
        <Greeting />
      )}
    </>
  )
}
