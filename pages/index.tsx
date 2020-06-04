import * as React from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/client'
import { Heading, Link } from '../components'

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
  const [getRepos, { loading: reposLoading, data }] = useLazyQuery(GET_REPOS)
  const [session, sessionLoading] = useSession()

  React.useEffect(() => {
    getRepos({
      variables: {
        count: 50,
      },
    })
  }, [getRepos])

  return sessionLoading ? (
    '...'
  ) : session ? (
    <main className="mt-10">
      {reposLoading || !data ? (
        'loading repos....'
      ) : (
        <ul>
          {data.viewer.repositories.nodes.map(({ name, url }) => (
            <li key={name}>
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  ) : (
    <>
      <img
        src="/hip-hub.png"
        className="max-w-xs w-full m-auto border-solid border-4 border-black"
        title="Main graphic a person programming"
        style={{ minHeight: 253 }}
      />
      <Heading className="text-center mt-6" as="h1">
        Welcome to Hip Hub
      </Heading>
      <p className="text-center text-lg">
        Sign-in to keep track of your Github notifications!.
      </p>
    </>
  )
}
