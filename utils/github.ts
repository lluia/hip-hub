import { NotificationVariant } from '../constants'
import type {
  GithubNotificationSubject,
  GithubNotifications,
  GithubNotificationRepository,
} from '../types/github'

interface ParsedNotification {
  subject: GithubNotificationSubject
  repository: GithubNotificationRepository
  id: string
}

function parseNotifications(
  notifications: GithubNotifications | null,
  filters?: NotificationVariant[]
) {
  if (!notifications) return null

  return Object.keys(notifications)
    .reduce<ParsedNotification[]>((acc, key) => {
      const { subject, repository, id } = notifications[key]
      return [...acc, { subject, repository, id }]
    }, [])
    .filter(({ subject: { type } }) =>
      filters && filters.length ? filters.includes(type) : true
    )
}

function getNotificationPath(url: string | null, param?: string) {
  if (!url) return null
  return {
    url: url.includes('release') ? `/release/${param}` : url,
    as: url.includes('release') ? `/release/[id]` : undefined,
  }
}

export { parseNotifications, getNotificationPath }
