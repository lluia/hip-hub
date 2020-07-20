import type {
  GithubNotificationSubject,
  GithubNotifications,
  GithubNotificationRepository,
} from '../types/github'

interface ParsedNotification {
  subject: GithubNotificationSubject
  repository: GithubNotificationRepository
}

function parseNotifications(notifications: GithubNotifications | null) {
  if (!notifications) return null

  return Object.keys(notifications).reduce<ParsedNotification[]>((acc, key) => {
    const { subject, repository } = notifications[key]
    return [...acc, { subject, repository }]
  }, [])
}

export { parseNotifications }
