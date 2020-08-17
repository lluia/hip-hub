import * as React from 'react'
import useSWR from 'swr'
import {
  Card,
  NotificationVariant,
  RepoName,
  Loading,
  PageWrap,
} from '../components'
import { parseNotifications, getNotificationPath } from '../utils'

export default function Home() {
  const { data, error } = useSWR('/api/notifications')
  const notifications = parseNotifications(data)

  return (
    <PageWrap>
      {!notifications ? (
        <Loading />
      ) : error ? (
        <div>Ups we had an issue loading your notifications...</div>
      ) : notifications.length ? (
        <ul>
          {notifications.map(
            ({
              id,
              subject: { title, url, type },
              repository: { name, owner },
            }) => (
              <li key={title}>
                <Card goTo={getNotificationPath(url, id)}>
                  <Card.Title as="h4" size="h6" className="flex items-baseline">
                    <NotificationVariant>{type}</NotificationVariant>
                    <span className="ml-5 inline-block">{title}</span>
                  </Card.Title>
                  <Card.Content>
                    <RepoName owner={owner}>{name}</RepoName>
                  </Card.Content>
                </Card>
              </li>
            )
          )}
        </ul>
      ) : (
        <p>You don&apos;t have any new notifications!</p>
      )}
    </PageWrap>
  )
}
