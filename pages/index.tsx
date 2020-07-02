import * as React from 'react'
import { useSession } from 'next-auth/client'
import { Heading } from '../components/Heading'
import { Card } from '../components/Card'
import { Variant } from '../components/Variant'
import { Badge } from '../components/Badge'
import { RepoName } from '../components/RepoName'
import { useRequest } from '../hooks'
import { parseNotifications } from '../utils'

export default function Home() {
  const [session, sessionLoading] = useSession()
  const { data } = useRequest('/notifications')
  const notifications = parseNotifications(data)
  const isLoading = sessionLoading || (session && !data)

  return isLoading ? (
    <i className="lni lni-spiner-solid" />
  ) : notifications ? (
    !notifications.length ? (
      <p>You don&apos;t have any new notifications!</p>
    ) : (
      <main className="mt-10">
        <ul>
          {notifications.map(
            ({
              subject: { title, url, type },
              repository: { name, owner },
            }) => (
              <li key={title}>
                <Card goTo={url}>
                  <Card.Title
                    as="h4"
                    size="h6"
                    className="flex items-baseline tracking-wide"
                  >
                    {type === 'Release' ? (
                      <Badge variant="warning">{title}</Badge>
                    ) : (
                      title
                    )}
                    <Variant className="ml-2">{type}</Variant>
                  </Card.Title>
                  <Card.Content>
                    <RepoName owner={owner}>{name}</RepoName>
                  </Card.Content>
                </Card>
              </li>
            )
          )}
        </ul>
      </main>
    )
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
        Sign-in to keep track of your Github notifications!
      </p>
    </>
  )
}
