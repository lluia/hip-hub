import * as React from 'react'
import axios from 'axios'
import { findParam } from '../utils/window'
import { GetStaticProps } from 'next'

interface RedeemProps {
  githubClientId: string
  githubClientSecret: string
}

function Redeem({ githubClientId, githubClientSecret }: RedeemProps) {
  React.useEffect(() => {
    const retrievedAuthState = findParam('state', window.location.search)
    const retrievedAuthCode = findParam('code', window.location.search)
    const currentState = window.sessionStorage.getItem('hip_hub_auth_state')

    if (retrievedAuthState !== currentState) return

    async function fetchToken() {
      const token = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: githubClientId,
          client_secret: githubClientSecret,
          code: retrievedAuthCode,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      console.log(token)
    }

    fetchToken()
  }, [githubClientId, githubClientSecret])

  return <h1>Redeeming</h1>
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  }
}

export default Redeem
