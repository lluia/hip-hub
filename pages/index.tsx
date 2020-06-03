import * as React from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const GET_REPOS = gql`
  query($count: Int!) {
    viewer {
      name
      repositories(last: $count) {
        nodes {
          name
          url
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

  return (
    <main>
      {loading || !data ? (
        'loading repos....'
      ) : (
        <ul>
          {data.viewer.repositories.nodes.map(({ name, url }) => (
            <li key={name}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
