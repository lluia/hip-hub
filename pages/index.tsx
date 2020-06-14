import * as React from 'react'
import { useSession } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Heading, Card, Label } from '../components'
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
          {notifications.map(({ subject, repository }) => (
            <li key={subject.title}>
              <Card goTo={subject.url}>
                <Card.Title
                  as="h4"
                  size="h6"
                  className="flex items-center justify-between tracking-wide"
                >
                  {subject.title}
                  <Label variant={subject.type} />
                </Card.Title>
                <Card.Content>
                  <div className="text-xs">
                    <FontAwesomeIcon
                      icon={faCube}
                      size="lg"
                      className="mr-2 inline-block"
                    />
                    <span className="text-blue-grey tracking-wider">
                      {repository.full_name}
                    </span>
                  </div>
                </Card.Content>
              </Card>
            </li>
          ))}
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
        Sign-in to keep track of your Github notifications!.
      </p>
    </>
  )
}
