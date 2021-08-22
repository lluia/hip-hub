import * as React from 'react'
import {
  Card,
  NotificationLabel,
  RepoName,
  Loading,
  PageWrap,
  NotificationFilters,
} from '../modules/design-system'
import { NOTIFICATION_VARIANT } from '../modules/notification'
import { useListNotifications } from '../queries/useListNotifications'
import { parseNotifications, getNotificationPath } from '../utils'

export default function Home() {
  const [activeFilters, setActiveFilters] = React.useState<
    NOTIFICATION_VARIANT[]
  >()

  const { data, error } = useListNotifications()
  const notifications = parseNotifications(data, activeFilters)

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
              <NotificationFilters onSelect={setActiveFilters} />
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
