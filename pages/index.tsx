import * as React from 'react'
import { GetServerSideProps } from 'next'
import crypto from 'crypto'

interface HomeProps {
  githubClientId?: string
  authState: string
}

function Home({ githubClientId, authState }: HomeProps) {
  const onLogin = React.useCallback(() => {
    if (!githubClientId)
      throw new Error(
        'Trying to authorize Github User without a valid Github Client ID'
      )

    window.sessionStorage.setItem('hip_hub_auth_state', authState)
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&state=${authState}`
  }, [githubClientId, authState])

  return (
    <>
      <h1>Welcome to HipHub</h1>
      <p>Login to be able to interact with your Github account</p>
      <button onClick={onLogin}>Login</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
      authState: crypto.randomBytes(8).toString('hex'),
    },
  }
}

export default Home
