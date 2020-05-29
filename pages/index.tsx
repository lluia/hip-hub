import * as React from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useLazyQuery } from '@apollo/react-hooks'
import { Greeting } from '../components'
import { gql } from 'apollo-boost'

const GET_REPOS = gql`
  query($count: Int!) {
    viewer {
      name
      repositories(last: $count) {
        nodes {
          name
        }
      }
    }
  }
`

export default function Home() {
  const [getRepos, { loading, data }] = useLazyQuery(GET_REPOS)

  React.useEffect(() => {
    getRepos({
      variables: {
        count: 50,
      },
    })
  }, [getRepos])

  console.log(data)

  return <main>{loading ? 'loading repos....' : 'loaded!'}</main>
}
