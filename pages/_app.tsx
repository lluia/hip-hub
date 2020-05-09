import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import Nav from '../components/navigation'
import './styles.css'

// Using the NextAuth Provider in _app.js is  optional, but improves performance
// and reduces network calls by using a shared context for useSession()
export default function App({ Component, pageProps }: AppProps) {
  // Passing 'session' as a prop to the Provider allows pages that support
  // server side rendering to work in browsers without JavaScript if they
  // export 'session' as prop (i.e. from getServerSideProps or getInitialProps)
  const { session } = pageProps
  return (
    <Provider session={session}>
      <Nav />
      <Component {...pageProps} />
    </Provider>
  )
}
