import * as React from 'react'
import useSWR from 'swr'
import {
  Card,
  NotificationVariant,
  RepoName,
  Loading,
  PageWrap,
  NotificationFilters,
} from '../components'
import type { NotificationVariant as NotificationVariantType } from '../constants'
import * as dataTestIds from '../test/test-ids'
import { parseNotifications, getNotificationPath } from '../utils'

export default function Home() {
  const [activeFilters, setActiveFilters] = React.useState<
    NotificationVariantType[]
  >()

  const { data, error } = useSWR('/api/notifications')
  const notifications = parseNotifications(data, activeFilters)

  return (
    <PageWrap>
      {!notifications ? (
        <Loading />
      ) : error ? (
        <div>Ups we had an issue loading your notifications...</div>
      ) : (
        <div data-testid={dataTestIds.NOTIFICATION_FEED}>
          {notifications.length ? (
            <>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-dark">Filter by:</span>
                <NotificationFilters onSelect={setActiveFilters} />
              </div>
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
                        data-testid={`${dataTestIds.NOTIFICATION_CARD}-${id}`}
                      >
                        <Card.Title
                          as="h4"
                          size="h6"
                          className="flex items-baseline"
                        >
                          <NotificationVariant>{type}</NotificationVariant>
                          <span className="ml-5 inline-block">{title}</span>
                        </Card.Title>
                        <Card.Content>
                          <RepoName owner={owner}>
                            {`${owner.login} / ${name}`}
                          </RepoName>
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
