import * as React from 'react'
import useSWR from 'swr'
import { Card, Variant, Badge, RepoName, Loading } from '../components'
import { parseNotifications } from '../utils'

export default function Home() {
  const { data, error } = useSWR('/api/notifications')
  const notifications = parseNotifications(data)
  console.log(notifications)
  return !notifications ? (
    <Loading />
  ) : error ? (
    <div>Ups we had an issue loading your notifications...</div>
  ) : notifications.length ? (
    <main className="mt-10 pt-8">
      <ul>
        {notifications.map(
          ({ subject: { title, url, type }, repository: { name, owner } }) => (
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
  ) : (
    <p>You don&apos;t have any new notifications!</p>
  )
}
