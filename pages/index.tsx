import * as React from 'react'
import useSWR from 'swr'
import {
  Card,
  NotificationLabel,
  RepoName,
  Loading,
  PageWrap,
  NotificationFilters,
} from '../components'
import { NOTIFICATION_VARIANT } from '../constants'
import { parseNotifications, getNotificationPath } from '../utils'

export default function Home() {
  const [activeFilters, setActiveFilters] = React.useState<
    NOTIFICATION_VARIANT[]
  >()

  const { data, error } = useSWR('/api/notifications')
  const notifications = parseNotifications(data, activeFilters)
  const onSelectFilter = (activeFilters: NOTIFICATION_VARIANT[]) =>
    setActiveFilters(activeFilters)

  return (
    <PageWrap>
      {!notifications ? (
        <Loading />
      ) : error ? (
        <div>Ups we had an issue loading your notifications...</div>
      ) : (
        <div
          className="mx-auto max-w-screen-ml"
          data-testid="NOTIFICATION_FEED"
        >
          {notifications.length ? (
            <>
              <NotificationFilters onSelect={onSelectFilter} />
              <ul>
                {notifications.map(
                  ({
                    id,
                    subject: { title, url, type },
                    repository: { name, owner },
                  }) => (
                    <li key={id}>
                      <Card
                        goTo={getNotificationPath(url, id)}
                        data-testid={`NOTIFICATION_CARD-${id}`}
                      >
                        <Card.Title
                          as="h4"
                          size="h6"
                          className="flex items-baseline"
                        >
                          <NotificationLabel>{type}</NotificationLabel>
                          <span className="ml-5 inline-block">{title}</span>
                        </Card.Title>
                        <Card.Content>
                          <RepoName owner={owner}>{`${name}`}</RepoName>
                        </Card.Content>
                      </Card>
                    </li>
                  )
                )}
              </ul>
            </>
          ) : (
            <p>You don&apos;t have any new notifications!</p>
          )}
        </div>
      )}
    </PageWrap>
  )
}
